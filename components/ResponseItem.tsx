type UserResponse = {
  [question: string]: string | number | boolean;
};

type Response = {
  surveyAddress: string;
  surveyTitle: string;
  dateCompleted: string;
  userResponse: UserResponse;
};

const ResponseItem = (props: Response) => {
  return (
    <div className="flex w-full flex-col justify-around rounded-xl border border-formigo-teal p-4 xs:mb-4 lg:mb-8">
      <p className="p-2 text-3xl font-bold">
        {props.surveyAddress.slice(0, 8) +
          "..." +
          props.surveyAddress.slice(-8)}
      </p>
      <p className="text-md p-2">
        Completed the {props.surveyTitle} on {props.dateCompleted}
      </p>
      <div className="flex items-center justify-start p-2">
        <button className=" rounded-xl text-formigo-blue">
          --&gt; View Response
        </button>
      </div>
    </div>
  );
};

export default ResponseItem;
