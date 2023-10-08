import ResponseCard from "./response-card";

const data = [
  { name: "Joseph", date: new Date("2023, 6, 2"), id: "1234-5678-abcd" },
  { name: "Raymart", date: new Date("2023, 4, 2"),id: "1234-5678-abcd" },
];

export default function FormResponseTab() {
  return (
    <div className="flex flex-col gap-6 w-[770px] mt-12">
      {data.map((item, index) => (
        <ResponseCard
          key={index}
          data={item}
          surveyName="Formigo feedback"
        />
      ))}
    </div>
  );
}
