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
    <>
      {testInfo.map((response, index) => (
        <ResponseItem
          key={index}
          surveyAddress={response.surveyAddress}
          surveyTitle={response.surveyTitle}
          dateCompleted={response.dateCompleted}
          userResponse={response.userResponse}
        />
      ))}
    </>
  );
};

export default Responses;
