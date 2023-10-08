import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AnswerProps = {
  type: string;
  question: string;
  answer: string;
};

type InfoProps = {
  info: AnswerProps;
};

export default function ChoiceResponseCard({ info }: InfoProps) {
  return (
    <div className="flex flex-col w-[770px] bg-card border-border border font-sans rounded-md ">
      <div className="flex flex-col gap-2 w-full p-5 mb-6">
        <Label>Question</Label>
        <Input readOnly value={info.question} />
      </div>
      <div className="flex flex-col border-t border-t-border p-5">
        <div className="flex flex-col">
          <p className="text-sm text-txt-secondary">Answer</p>
          <p className="text-lg font-semibold">{info.answer}</p>
        </div>
      </div>
    </div>
  );
}
