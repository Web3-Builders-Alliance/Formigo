import mongoose from "mongoose";

export interface IResponseChunk extends Document {
  txId: string;
  part: number;
  chunk: string;
  responseId: string;
}

const responseChunkSchema = new mongoose.Schema(
  {
    responseId: { type: String, required: true },
    txId: { type: String, required: true },
    chunk: { type: String, required: true },
    part: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ResponseChunk: mongoose.Model<IResponseChunk> = mongoose.model<IResponseChunk>(
  "response_chunk",
  responseChunkSchema
);
