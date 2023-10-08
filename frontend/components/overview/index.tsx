import ChoiceAnswerCard from "./choice-answer";
import TextAnswerCard from "./text-answer";

const data = [
  {
    question: "How are you?",
    type: "text",
  },
  {
    question:
      "Are you experiencing difficulties or challenges with the product?",
    type: "choice",
    choices: [
      {
        choice: "no",
        total: 12,
      },
      {
        choice: "yes",
        total: 13,
      },
    ],
  },
];

export default function FormOverviewTab() {
  return (
    <div className="flex flex-col gap-6 mt-12">
      {data.map((item, index) => {
        if (item.type == "text") {
          return <TextAnswerCard index={index} info={item} key={index} />;
        } else if (item.type === "choice") {
          return <ChoiceAnswerCard index={index} key={index} info={item}/>;
        }
      })}
    </div>
  );
}
