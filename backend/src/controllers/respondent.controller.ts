import { Request, Response } from "express";
import * as anchor from "@coral-xyz/anchor";
import { Formigo, IDL } from "../artifacts/formigo";
import { FORMIGO_PROGRAM, RPC, WALLET } from "../utils/secrets";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import uid from "short-uuid";
import { sleep } from "../utils/sleep";
import { ResponseChunk } from "../models/responseChunk.model";
import { Respondent } from "../models/responses.model";
import { Form } from "../models/form.model";
import { IUserRequest } from "../middleware/auth";
import { User } from "../models/user.model";

type RespondentForm = {
  encryptedResponse: string;
  iv: string;
  ecPubkey: string;
  anonymous: boolean;
  respondent: string;
  formId: string;
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

export const responseForm = async (req: Request, res: Response) => {
  try {
    const {
      encryptedResponse,
      iv,
      ecPubkey,
      anonymous,
      respondent,
      formId,
    }: RespondentForm = req.body;
    // Check if anonymous
    let user =
      respondent && !anonymous
        ? new PublicKey(respondent)
        : Keypair.generate().publicKey;

    // Check if user post the required fields
    if (
      !encryptedResponse ||
      !iv ||
      !ecPubkey ||
      !anonymous ||
      !respondent ||
      !formId
    ) {
      const missingFields = [];
      if (!encryptedResponse) missingFields.push("encryptedResponse");
      if (!iv) missingFields.push("iv");
      if (!ecPubkey) missingFields.push("ecPubkey");
      if (!anonymous) missingFields.push("anonymous");
      if (!respondent) missingFields.push("respondent");
      if (!formId) missingFields.push("formId");

      return res.status(400).json({
        message: `${missingFields.join(", ")} field${
          missingFields.length > 1 ? "s" : ""
        } is${missingFields.length > 1 ? " are" : " is"} required`,
      });
    }

    // Check if formId found on DB
    const formFound = await Form.findOne({ formId });
    if (!formFound) {
      return res.status(400).json({
        message: "Provided form id not found.",
        data: null,
        code: 400,
        status: false,
      });
    }

    // Generate a response id
    const responseId = uid.generate();

    //Every chunk length in bytes
    let maxChunkLength = 720;
    // Check the bytes of encrypted form
    const bsize = Buffer.byteLength(encryptedResponse);

    const numNodes = Math.ceil(bsize / maxChunkLength);

    // Initialize an array to store the chunks
    const chunks = [];

    // Split the string into chunks and store them in the array
    for (let i = 0; i < numNodes; i++) {
      const startIndex = i * maxChunkLength;
      const endIndex = startIndex + maxChunkLength;
      const chunk = encryptedResponse.slice(startIndex, endIndex);
      chunks.push(chunk);
    }
    for (let i = 0; i < chunks.length; i++) {
      let txSuccess = false;
      const bufferData = Buffer.from(chunks[i]);

      let txId = await program.methods
        .takeForm(
          Buffer.from(formId),
          Buffer.from(responseId),
          bufferData,
          Buffer.from(iv.toString()),
          Buffer.from(ecPubkey.toString()),
          user,
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
          await ResponseChunk.create({
            responseId,
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

    const respondentObj = await Respondent.create({
      formId,
      respondent: user,
      totalChunk: chunks.length,
      responseId,
      iv,
      anonymous,
      formCreator: formFound.creator,
      surveyName: formFound.name,
      ecPub: ecPubkey,
    });

    return res.status(201).json({
      data: respondentObj,
      message: "Response recorded successfully.",
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

export const getAllResponse = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user;

    const userFound = await User.findOne({
      walletAddress: user.pubkey.toLowerCase(),
    });

    const respondent = await Respondent.find({
      formCreator: userFound?.base58Address,
    });
    return res.status(200).json({
      status: true,
      data: respondent,
      message:
        respondent.length != 0
          ? "Respondents successfully retrieved."
          : "No respondent was found",
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

export const getResponseById = async (req: IUserRequest, res: Response) => {
  try {
    const user = req.user;
    const responseId = req.params.responseId;
    const userFound = await User.findOne({
      walletAddress: user.pubkey.toLowerCase(),
    });

    const respondent = await Respondent.findOne({
      formCreator: userFound?.base58Address,
      responseId,
    });

    if (respondent) {
      let chunks = await ResponseChunk.find({ responseId }).sort({ part: 1 });
      return res.status(200).json({
        status: true,
        data: { response: respondent, chunks },
        message: respondent
          ? "Respondent successfully retrieved."
          : "No respondent was found",
        code: 200,
      });
    } else {
      return res.status(404).json({
        status: false,
        data: null,
        message: "No respondent was found",
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

export const getResponseChunks = async (req: Request, res: Response) => {
  try {
    const responseId = req.params.responseId;

    const response = await Respondent.findOne({
      responseId,
    });

    if (response) {
      let chunks = await ResponseChunk.find({ responseId }).sort({
        part: 1,
      });
      let chunksArray = chunks.map((item) => item.chunk);

      let joinedChunks = chunksArray.join("");

      return res.status(200).json({
        status: true,
        data: { response, encryptedResponse: joinedChunks },
        message: "Response chunk successfully retrieved.",
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
