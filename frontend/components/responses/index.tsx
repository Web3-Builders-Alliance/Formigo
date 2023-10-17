import ResponseCard from './response-card';

type Responses = {
  respondent: string;
  surveyName: string;
  responseId: string;
  anonymous: boolean;
  createdAt: string | Date;
};

export default function FormResponseTab({
  responses,
}: {
  responses: Responses[];
}) {
  console.log("d",responses);
  
  return (
    <div className='mt-12 flex w-[770px] flex-col gap-6'>
      {responses && responses.length != 0 ? (
        responses.map((item, index) => (
          <ResponseCard
            key={index}
            data={{
              name: item.anonymous ? 'Anonymous' : item.respondent,
              date: item.createdAt,
              id: item.responseId,
            }}
            surveyName={item.surveyName}
          />
        ))
      ) : (
        <div className='flex h-[114px] w-full items-center justify-center gap-4 rounded-md border border-border bg-card'>
          <p className='text-base font-medium text-txt-secondary'>
            You dont have yet any form response
          </p>
        </div>
      )}
    </div>
  );
}
