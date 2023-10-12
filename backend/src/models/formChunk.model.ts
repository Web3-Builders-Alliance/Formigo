import mongoose from "mongoose";

export interface IFormChunk extends Document {
  txId: string;
  part: number;
  chunk: string;
  formId: string;
}

const formChunkSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    txId: { type: String, required: true },
    chunk: { type: String, required: true },
    part: { type: Number, required: true },
  },
  { timestamps: true }
);

export const FormChunk: mongoose.Model<IFormChunk> = mongoose.model<IFormChunk>(
  "form_chunk",
  formChunkSchema
);
