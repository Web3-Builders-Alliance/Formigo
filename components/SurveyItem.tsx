type Survey = {
  title: string,
  description: string,
  active: boolean,
  participantNum: number
}

const SurveyItem = (props: Survey) => {
  return (
    <div className="flex flex-col justify-around w-full border border-formigo-teal rounded-xl p-4 xs:mb-4 lg:mb-8">
      <p className="font-bold text-3xl p-2">
        {props.title}
      </p>
      <p className="text-lg p-2">
        {props.description} 
      </p>
      <div className="flex justify-start items-center p-2">
        <div className="bg-formigo-lightOrange text-formigo-orange p-2 rounded-xl">
          {props.active ? "Active" : "Inactive" }
        </div>
        <div className="bg-formigo-lightOrange text-formigo-orange p-2 rounded-xl ml-4">
          {props.participantNum} responses have rolled in!
        </div>
      </div>
    </div>
  )
};

export default SurveyItem;