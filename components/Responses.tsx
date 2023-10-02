import ResponseItem from "./ResponseItem";

type Response = {
  surveyAddress: string;
  surveyTitle: string;
  dateCompleted: string;
  userResponse: UserResponse;
};

type UserResponse = {
  [question: string]: string | number | boolean;
};

const Responses = () => {
  const testInfo = [
    {
      surveyAddress: "Eo7541qr1MZsTDPAtypqjgEdx3APA87x3nyhGDNczeQC",
      surveyTitle: "Jito Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?": "Bob",
      },
    },
    {
      surveyAddress: "3RXKQBRv7xKTQeNdLSPhCiD4QcUfxEQ12rtgUkMf5LnS",
      surveyTitle: "Solana Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?": "Alex",
      },
    },
    {
      surveyAddress: "4pUwb58SNrM1scGAeTRK94SdMrHcTr5rYQpm8uJSXwicRh",
      surveyTitle: "Formigo Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?": "Bob",
      },
    },
  ];

  return (
    <div className="h-[75vh] w-5/6">
      <div className="pb-8 pt-8 font-bold xs:text-2xl sm:text-4xl">
        Responses
      </div>
      <div className="flow grid grid-rows-1 xs:gap-4 md:grid-cols-9 lg:gap-16">
        <div className="col-span-5 flex flex-col justify-start">
          {testInfo.map((response, index) => (
            <ResponseItem
              key={index}
              surveyAddress={response.surveyAddress}
              surveyTitle={response.surveyTitle}
              dateCompleted={response.dateCompleted}
              userResponse={response.userResponse}
            />
          ))}
        </div>
        <div className="flex max-h-[400px] min-h-[400px] flex-col items-center justify-around rounded-xl border-formigo-teal p-8 xs:col-span-5 sm:col-span-4 sm:h-1/3 sm:border">
          <p className=" w-5/6 p-4 text-center font-semibold xs:hidden sm:flex sm:text-4xl xl:text-5xl">
            Ready to survey like a rockstar?
          </p>
          <p className="text-md w-5/6 p-4 text-center xs:hidden sm:flex xl:text-2xl">
            Give that button a tap, and let&apos;s craft a fresh, fabulous
            survey together!
          </p>
          <button className="rounded-xl bg-formigo-blue p-4 text-xl text-white xs:w-full sm:w-5/6 xl:w-3/6">
            Create survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Responses;
