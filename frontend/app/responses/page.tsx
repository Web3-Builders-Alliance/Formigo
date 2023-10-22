import BlankCard from '@/components/blank-card';
import CreateForm from '@/components/create-form';
import FormCard from '@/components/form-card';
import ResponseCard from '@/components/responses/response-card';
import getResponses from '@/hooks/getResponses';

type Response = {
  anonymous: string;
  respondent: string;
  createdAt: string | Date;
  responseId: string;
  surveyName: string;
};

export default async function Forms() {
  const responses = await getResponses();
  return (
    <main className='flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[240px]'>
      <div className='mb-6 flex flex-col gap-1.5'>
        <h1 className='text-[28px] font-semibold leading-9'>Responses</h1>
        <h2 className='text-txt-secondary'>
          {"Here, you can see all the responses of your generated forms."}
        </h2>
      </div>
      {/* <div className='my-12 h-[22px] w-[338px]'>
        <Input placeholder='Search form' />
      </div> */}
      <div className='mb-10 flex h-full w-full justify-between'>
        <div className='mb-10 flex h-fit w-3/5 flex-col gap-7'>
          {responses.length != 0 ? (
            responses.map((response: Response) => (
              <ResponseCard
                key={response.responseId}
                data={{
                  name: response.anonymous ? 'Anonymous' : response.respondent,
                  date: new Date(response.createdAt),
                  id: response.responseId,
                }}
                surveyName={response.surveyName}
              />
            ))
          ) : (
            <BlankCard text='You have yet to receive any response' />
          )}
        </div>

        <div className='w-1/3'>
          <CreateForm />
        </div>
      </div>
    </main>
  );
}
