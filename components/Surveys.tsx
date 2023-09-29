import SurveyItem from "./SurveyItem";

type Survey = {
  title: String;
  description: String;
  active: boolean;
  participantNum: Number;
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
    <div className="h-[75vh] w-5/6">
        <div className="xs:text-2xl sm:text-4xl font-bold pt-8 pb-8">
          Surveys
        </div>
      <div className="grid-rows-1 flow grid md:grid-cols-9 xs:gap-4 lg:gap-16">
        <div className="col-span-5 flex flex-col justify-start">
          {testInfo.map((survey, index) => (
          <SurveyItem
            key={index}
            title={survey.title}
            description={survey.description}
            active={survey.active}
            participantNum={survey.participantNum}
          />
          ))}
        </div>
        <div className="border-formigo-teal flex xs:col-span-5 flex-col sm:col-span-4 sm:h-1/3 min-h-[400px] max-h-[400px] items-center justify-around rounded-xl sm:border p-8">
          <p className=" xs:hidden sm:flex text-center font-semibold sm:text-4xl w-5/6 xl:text-5xl p-4">Ready to survey like a rockstar?</p>
          <p className="xs:hidden sm:flex text-md text-center xl:text-2xl p-4 w-5/6">
            Give that button a tap, and let&apos;s craft a fresh, fabulous survey
            together!
          </p>
          <button className="xs:w-full sm:w-5/6 xl:w-3/6 rounded-xl bg-formigo-blue p-4 text-xl text-white">
            Create survey
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Surveys;
