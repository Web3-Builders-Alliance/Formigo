import { Request, Response } from "express";
import { User, IUser } from "../models/user.model";
import { verifySig } from "../utils/verifySig";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secrets";
import { IUserRequest } from "../middleware/auth";

type RegisterData = {
  message: string;
  walletAddress: string;
  signature: string;
};
export const auth = async (req: Request, res: Response) => {
  const { message, walletAddress, signature }: RegisterData = req.body;

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
  const verify = verifySig(message, walletAddress, signature);
  if (verify) {
    if (!oldUser) {
      const user = await User.create({
        walletAddress: walletAddress.toLowerCase(),
        base58Address: walletAddress
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
};

