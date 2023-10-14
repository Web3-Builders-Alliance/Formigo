import mongoose from "mongoose";

export interface IUser extends Document {
  walletAddress: string;
  base58Address: string;
  username: string;
  credits: number;
  ecPub: string;
}

const userSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, unique: true, required: true },
    base58Address: { type: String, unique: true, required: true },
    username: { type: String, default: null },
    ecPub: { type: String, default: null },
    credits: { type: Number, default: 3 },
  },
  { timestamps: true }
);

export const User: mongoose.Model<IUser> = mongoose.model<IUser>(
  "user",
  userSchema
);
