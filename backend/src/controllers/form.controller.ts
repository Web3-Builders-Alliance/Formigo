import { Request, Response } from "express";
import { IUserRequest } from "../middleware/auth";
import * as anchor from "@coral-xyz/anchor";
import { Formigo, IDL } from "../artifacts/formigo";
import { FORMIGO_PROGRAM, RPC, WALLET } from "../utils/secrets";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import uid from "short-uuid";
import { sleep } from "../utils/sleep";
import { Form } from "../models/form.model";
import { FormChunk } from "../models/formChunk.model";
import { User } from "../models/user.model";
import { Respondent } from "../models/responses.model";
import { getSharedKey, serverSignature } from "../utils/serverDecrypt";
import { decrypt } from "../utils/crypto";
import { serializeObject } from "../utils/serializedObj";

type CreateForm = {
  encryptedForm: string;
  iv: string;
  ecPubkey: string;
  formName: string;
};

type Form = {
  creator: string;
  formId: string;
  totalChunk: number;
  views: number;
  name: string;
  status: "active" | "draft" | "archive" | "disable";
  iv: string;
};

const keypair = Keypair.fromSecretKey(new Uint8Array(WALLET));
const connection = new Connection(RPC as string);

const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(keypair),
  {
    commitment: "confirmed",
  }
);

const program = new anchor.Program<Formigo>(
  IDL,
  FORMIGO_PROGRAM as anchor.Address,
  provider
);

const adminPda = PublicKey.findProgramAddressSync(
  [Buffer.from("admin")],
  program.programId
)[0];

export const createForm = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user;

    const { encryptedForm, iv, ecPubkey, formName }: CreateForm = req.body;

    // Check if user post the required fields
    if (!encryptedForm || !iv || !ecPubkey || !formName) {
      const missingFields = [];
      if (!formName) missingFields.push("formName");
      if (!encryptedForm) missingFields.push("encryptedForm");
      if (!iv) missingFields.push("iv");
      if (!ecPubkey) missingFields.push("ecPubkey");

      return res.status(400).json({
        message: `${missingFields.join(", ")} field${
          missingFields.length > 1 ? "s" : ""
        } is${missingFields.length > 1 ? " are" : " is"} required`,
      });
    }

    const uuid = uid.generate();

    //Every chunk length in bytes
    let maxChunkLength = 790;
    // Check the bytes of encrypted form
    const bsize = Buffer.byteLength(encryptedForm);

    const numNodes = Math.ceil(bsize / maxChunkLength);

    // Initialize an array to store the chunks
    const chunks = [];

    // Split the string into chunks and store them in the array
    for (let i = 0; i < numNodes; i++) {
      const startIndex = i * maxChunkLength;
      const endIndex = startIndex + maxChunkLength;
      const chunk = encryptedForm.slice(startIndex, endIndex);
      chunks.push(chunk);
    }
    for (let i = 0; i < chunks.length; i++) {
      let txSuccess = false;
      const bufferData = Buffer.from(chunks[i]);

      let txId = await program.methods
        .createForm(
          Buffer.from(uuid),
          bufferData,
          Buffer.from(iv.toString()),
          Buffer.from(ecPubkey.toString()),
          new PublicKey(user.pubkey),
          new anchor.BN(i + 1),
          new anchor.BN(chunks.length)
        )
        .accounts({
          payer: keypair.publicKey,
          admin: adminPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([keypair])
        .rpc();
      while (!txSuccess) {
        const { value: status } = await connection.getSignatureStatus(txId);

        // Break loop if transaction has succeeded
        if (
          status &&
          (status.confirmationStatus === "confirmed" ||
            status.confirmationStatus === "finalized")
        ) {
          txSuccess = true;
          await FormChunk.create({
            formId: uuid,
            txId,
            part: i + 1,
            chunk: chunks[i],
          });

          break;
        }
        // Check again after 1 sec
        await sleep(1000);
      }
    }

    await User.findOneAndUpdate(
      { base58Address: user.pubkey },
      { $set: { ecPub: ecPubkey } }
    );

    const form = await Form.create({
      formId: uuid,
      creator: user.pubkey,
      totalChunk: chunks.length,
      iv,
      name: formName,
    });
    return res.status(201).json({
      data: form,
      message: "Form created successfully.",
      status: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const getAllForms = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user;

    const userFound = await User.findOne({
      walletAddress: user.pubkey.toLowerCase(),
    });

    const forms = await Form.find({ creator: userFound?.base58Address });
    return res.status(200).json({
      status: true,
      data: forms,
      message:
        forms.length != 0
          ? "Forms successfully retrieved."
          : "No form was found",
      code: 200,
    });
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const getFormById = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user;
    const formId = req.params.formId;

    const userFound = await User.findOne({
      walletAddress: user.pubkey.toLowerCase(),
    });

    const form = await Form.findOne({
      creator: userFound?.base58Address,
      formId,
    });

    if (form) {
      let responses = await Respondent.find({ formId });
      return res.status(200).json({
        status: true,
        data: { form, responses },
        message: form ? "Form successfully retrieved." : "No form was found",
        code: 200,
      });
    } else {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No form was found",
        code: 404,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const getFormByIdAnon = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;

    const form = await Form.findOne({
      formId,
    });

    if (form) {
      let formCreator = await User.findOne({ base58Address: form.creator });
      if (formCreator) {
        let chunks = await FormChunk.find({ formId }).sort({ part: 1 });
        let chunksArray = chunks.map((item) => item.chunk);

        let joinedChunks = chunksArray.join("");

        const serverSig = await serverSignature();
        const { hashedSharedKey } = await getSharedKey(
          serverSig,
          formCreator.ecPub
        );
        let decryptedData = decrypt(joinedChunks, form.iv, hashedSharedKey);
        return res.status(200).json({
          status: true,
          data: { form, decryptedData },
          message: "Form successfully retrieved.",
          code: 200,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No form was found",
        code: 404,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const updateForm = async (req: IUserRequest, res: Response) => {
  try {
    const data: Form = req.body;
    
    const serializedData = serializeObject(data);

    const formId = req.params.formId;
    const form = await Form.findOne({
      formId,
    });

    if (!form) {
      return res.status(400).json({
        message: "Provided form id not found.",
        data: null,
        code: 400,
        status: false,
      });
    }

    let newForm = await Form.findOneAndUpdate(
      { formId },
      { $set: serializedData },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      data: newForm,
      message: "form updated",
      code: 200,
    });
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const updateFormViews = async (req: Request, res: Response) => {
  try {
    const formId = req.params.formId;

    const form = await Form.findOne({
      formId,
    });

    if (form) {
      let newForm = await Form.findOneAndUpdate(
        { formId },
        { $set: { views: form.views + 1 } },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        data: newForm,
        message: "Views updated",
        code: 200,
      });
    } else {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No form was found",
        code: 404,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};
