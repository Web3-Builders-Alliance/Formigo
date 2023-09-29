type UserResponse = {
  [question: string]: string | number | boolean
};

type Response = {
  surveyAddress: string
  surveyTitle: string
  dateCompleted: string
  userResponse: UserResponse
};

const ResponseItem = (props: Response) => {
  return (
    <div className="flex flex-col justify-around w-full border border-formigo-teal rounded-xl p-4 xs:mb-4 lg:mb-8">
      <p className="font-bold text-3xl p-2">
        {props.surveyAddress.slice(0,8) + "..." + props.surveyAddress.slice(-8)}
      </p>
      <p className="text-md p-2">
        Completed the {props.surveyTitle} on {props.dateCompleted}
      </p>
      <div className="flex justify-start items-center p-2">
        <button className=" text-formigo-blue rounded-xl">
          --&gt; View Response
        </button>
      </div>
    </div>
  )
};

export default ResponseItem;