import SurveyItem from "./SurveyItem";

type Survey = {
  title: string;
  description: string;
  active: boolean;
  participantNum: number;
};

const Surveys = () => {
  const testInfo = [
    {
      title: "Jito Feedback Form",
      description: "This is a new survey",
      active: true,
      participantNum: 45,
    },
    {
      title: "Solana Feedback Form",
      description: "This is a new survey",
      active: true,
      participantNum: 415,
    },
    {
      title: "Formigo Feedback Form",
      description: "This is a new survey",
      active: true,
      participantNum: 12,
    },
  ];

  return (
    <>
    {testInfo.map((survey:Survey, index: number) => (
      <SurveyItem
        key={index}
        title={survey.title}
        description={survey.description}
        active={survey.active}
        participantNum={survey.participantNum}
      />
    ))}
    </>
  );
};

export default Surveys;
