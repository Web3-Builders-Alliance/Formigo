type Survey = {
  title: string;
  description: string;
  active: boolean;
  participantNum: number;
};

const SurveyItem = (props: Survey) => {
  return (
    <div className="flex w-full flex-col justify-around rounded-xl border border-formigo-teal p-4 xs:mb-4 lg:mb-8">
      <p className="p-2 text-3xl font-bold">{props.title}</p>
      <p className="p-2 text-lg">{props.description}</p>
      <div className="flex items-center justify-start p-2">
        <div className="rounded-xl bg-formigo-lightOrange p-2 text-formigo-orange">
          {props.active ? "Active" : "Inactive"}
        </div>
        <div className="ml-4 rounded-xl bg-formigo-lightOrange p-2 text-formigo-orange">
          {props.participantNum} responses have rolled in!
        </div>
      </div>
    </div>
  );
};

export default SurveyItem;
