import { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import { verifySig } from "../utils/verifySig";
import jwt from "jsonwebtoken";
import { JWT_SECRET, MAGIC_SECRET } from "../utils/secrets";
import { IUserRequest } from "../middleware/auth";
import { decrypt } from "../utils/crypto";

type RegisterData = {
  message: string;
  walletAddress: string;
  signature: string | Uint8Array;
  wallet: "magic" | "adapter";
};
export const auth = async (req: Request, res: Response) => {
  try {
    const { message, walletAddress, signature, wallet }: RegisterData =
      req.body;

    // Check if user post the required fields
    if (!message || !walletAddress || !signature) {
      const missingFields = [];
      if (!message) missingFields.push("message");
      if (!walletAddress) missingFields.push("walletAddress");
      if (!signature) missingFields.push("signature");

      return res.status(400).json({
        message: `${missingFields.join(", ")} field${
          missingFields.length > 1 ? "s" : ""
        } is${missingFields.length > 1 ? " are" : " is"} required`,
      });
    }

    // Check if user is already registered
    const oldUser = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    // Verify the signature provided in the body
    const verify = verifySig(message, walletAddress, signature, wallet);
    if (verify) {
      if (!oldUser) {
        const user = await User.create({
          walletAddress: walletAddress.toLowerCase(),
          base58Address: walletAddress,
        });

        // Create a jwt token
        const token = jwt.sign(
          { pubkey: user.base58Address },
          JWT_SECRET as string,
          {
            expiresIn: "8h",
          }
        );
        // Return the token and user info
        return res.status(201).json({
          message: "User registered successfully.",
          data: { user, token },
          code: 201,
          status: true,
        });
      } else {
        // Create a jwt token
        const token = jwt.sign(
          { pubkey: oldUser.base58Address },
          JWT_SECRET as string,
          {
            expiresIn: "8h",
          }
        );
        // Return the token and user info
        return res.status(200).json({
          message: "User found.",
          data: { user: oldUser, token },
          code: 200,
          status: true,
        });
      }
    } else {
      return res.status(400).json({
        message: "Signature not valid.",
        code: 400,
        status: false,
      });
    }
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      data: null,
      message: error.message,
      status: false,
    });
  }
};

export const authMagic = async (req: Request, res: Response) => {
  try {
    const { iv, encryptedData } = req.body;

    // Check if user post the required fields
    if (!iv || !encryptedData) {
      const missingFields = [];
      if (!encryptedData) missingFields.push("encryptedData");
      if (!iv) missingFields.push("iv");

      return res.status(400).json({
        message: `${missingFields.join(", ")} field${
          missingFields.length > 1 ? "s" : ""
        } is${missingFields.length > 1 ? " are" : " is"} required`,
      });
    }

    let decryptedData = decrypt(
      encryptedData,
      iv,
      Buffer.from(MAGIC_SECRET as string, "hex")
    );

    if (decryptedData) {
      let decryptedDataInJson = JSON.parse(decryptedData);

      const oldUser = await User.findOne({
        walletAddress: decryptedDataInJson.walletAddress.toLowerCase(),
      });

      if (!oldUser) {
        const user = await User.create({
          walletAddress: decryptedDataInJson.walletAddress.toLowerCase(),
          base58Address: decryptedDataInJson.walletAddress,
        });

        // Create a jwt token
        const token = jwt.sign(
          { pubkey: user.base58Address },
          JWT_SECRET as string,
          {
            expiresIn: "8h",
          }
        );
        // Return the token and user info
        return res.status(201).json({
          message: "User registered successfully.",
          data: { user, token },
          code: 201,
          status: true,
        });
      } else {
        // Create a jwt token
        const token = jwt.sign(
          { pubkey: oldUser.base58Address },
          JWT_SECRET as string,
          {
            expiresIn: "8h",
          }
        );
        // Return the token and user info
        return res.status(200).json({
          message: "User found.",
          data: { user: oldUser, token },
          code: 200,
          status: true,
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalid data",
        code: 400,
        status: false,
        data: null,
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

export const getMe = async (req: IUserRequest, res: Response) => {
  try {
    let user = req.user;
    let userFound = await User.findOne({ base58Address: user.pubkey });

    if (userFound) {
      return res.status(200).json({
        data: userFound,
        message: "User retrived successfuly",
        status: false,
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

export const getEc = async (req: Request, res: Response) => {
  try {
    const wallet = req.params.wallet;
    let userFound = await User.findOne({ base58Address: wallet });

    if (userFound) {
      return res.status(200).json({
        data: { ec: userFound.ecPub },
        message: "User ec pubkey retrived successfuly",
        status: false,
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
