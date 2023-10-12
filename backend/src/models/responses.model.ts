import mongoose from "mongoose";

export interface IRespondent extends Document {
  respondent: string;
  formId: string;
  totalChunk: number;
  formCreator:string
  responseId: string;
  anonymous: boolean;
  iv:string
}

const responseSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    responseId: { type: String, required: true, unique: true },
    respondent: { type: String, required: true },
    iv: { type: String, required: true },
    totalChunk: { type: Number, required: true },
    anonymous: { type: Boolean, required: true },
    formCreator:{ type: String, required: true },
  },
  { timestamps: true }
);

export const Respondent: mongoose.Model<IRespondent> = mongoose.model<IRespondent>(
  "respondent",
  responseSchema
);
