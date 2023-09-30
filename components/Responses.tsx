import ResponseItem from "./ResponseItem";

type Response = {
  surveyAddress: string
  surveyTitle: string
  dateCompleted: string
  userResponse: UserResponse
};

type UserResponse = {
  [question: string]: string | number | boolean
};

const Responses = () => {
  const testInfo = [
    {
      surveyAddress: "Eo7541qr1MZsTDPAtypqjgEdx3APA87x3nyhGDNczeQC",
      surveyTitle: "Jito Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?":"Bob"
      }
    },
    {
      surveyAddress: "3RXKQBRv7xKTQeNdLSPhCiD4QcUfxEQ12rtgUkMf5LnS",
      surveyTitle: "Solana Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?":"Alex"
      }
    },
    {
      surveyAddress: "4pUwb58SNrM1scGAeTRK94SdMrHcTr5rYQpm8uJSXwicRh",
      surveyTitle: "Formigo Feedback Form",
      dateCompleted: "September 30, 2023",
      userResponse: {
        "What_is_your_name?":"Bob"
      }
    },
  ];

  return (
    <div className="h-[75vh] w-5/6">
        <div className="xs:text-2xl sm:text-4xl font-bold pt-8 pb-8">
          Responses
        </div>
      <div className="grid-rows-1 flow grid md:grid-cols-9 xs:gap-4 lg:gap-16">
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

export default Responses;
