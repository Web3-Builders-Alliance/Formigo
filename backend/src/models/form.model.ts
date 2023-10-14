import mongoose from "mongoose";

export interface IForm extends Document {
  creator: string;
  formId: string;
  totalChunk: number;
  views: number;
  name: string;
  status: "active" | "draft" | "archive" | "disable";
  iv: string;
}

const formSchema = new mongoose.Schema(
  {
    formId: { type: String, unique: true, required: true },
    creator: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, default: "active" },
    iv: { type: String, required: true },
    totalChunk: { type: Number, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Form: mongoose.Model<IForm> = mongoose.model<IForm>(
  "form",
  formSchema
);
