import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "../ui/avatar";
import ChoiceResponseCard from "./choice-answer";
import TextResponseCard from "./text-answer";

const data = {
  respondent: "Joseph",
  surveyName: "Formigo feedback",
  completedAt: new Date("2023, 6, 2"),
  answers: [
    {
      question: "How are you?",
      type: "text",
      answer: "fine",
    },
    {
      question:
        "Are you experiencing difficulties or challenges with the product?",
      type: "choice",
      answer: "no",
    },
  ],
};

export default function RespondentOverview() {
  return (
    <div className="flex flex-col gap-6 font-sans">
      <h1 className="text-lg font-semibold text-txt-secondary">Respondent</h1>
      <div className="flex gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className="text-xl">J</AvatarFallback>
        </Avatar>
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-semibold">Joseph</h1>
          <p className="text-txt-secondary">
            Completed the <b className="text-txt">{data.surveyName}</b>{" "}
            {formatDistanceToNow(new Date("2023, 4, 2"), { addSuffix: true })}
          </p>
        </div>
      </div>
      {data.answers.map((item, index) => {
        if (item.type == "text") {
          return <TextResponseCard info={item} key={index} />;
        } else if (item.type === "choice") {
          return <ChoiceResponseCard key={index} info={item} />;
        }
      })}
    </div>
  );
}
