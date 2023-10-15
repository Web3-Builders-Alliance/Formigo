import BlankCard from '@/components/blank-card';
import CreateForm from '@/components/create-form';
import FormCard from '@/components/form-card';
import ResponseCard from '@/components/responses/response-card';
import getForms from '@/hooks/getForms';
import getResponses from '@/hooks/getResponses';
import Link from 'next/link';
import {
  IoArrowForward,
} from 'react-icons/io5';

export default async function Dashboard() {
  const forms = await getForms();
  const responses = await getResponses();
  
  return (
    <main className='flex min-h-screen flex-col justify-start gap-8 px-[135px] py-16 font-sans xl:px-[240px]'>
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-[28px] font-semibold leading-9'>Dashboard</h1>
        <h2 className='text-txt-secondary'>
          {"Welcome back! We're thrilled you're here!"}
        </h2>
      </div>
     
      <div className='mb-10 flex h-full w-full justify-between'>
        <div className='flex w-3/5 flex-col'>
          <div>
            <p className='h-12 text-xl font-semibold text-formigo-dark/text-2nd'>
              Recent forms
            </p>
            {forms.length != 0 ? (
              <div className='h-[205px]'>
                <FormCard
                  name={forms[0].name}
                  status={forms[0].status}
                  formId={forms[0].formId}
                />
                <Link
                  href='/forms'
                  className='flex h-12 items-center text-formigo-blue'
                >
                  <p>See all forms</p>
                  <IoArrowForward></IoArrowForward>
                </Link>
              </div>
            ) : (
              <div className='mb-10'>
                <BlankCard text='You have not yet generated any forms.' />
              </div>
            )}
          </div>
          <div>
            <p className='h-12 text-xl font-semibold text-formigo-dark/text-2nd'>
              Recent responses
            </p>
            {responses.length != 0 ? (
              <div className='h-[205px]'>
                <ResponseCard
                  data={{
                    name: responses[0].anonymous
                      ? 'Anonymous'
                      : responses[0].respondent,
                    date: new Date(responses[0].createdAt),
                    id: responses[0].responseId,
                  }}
                  surveyName={responses[0].surveyName}
                />
              </div>
            ) : (
              <BlankCard text='You have yet to receive any response' />
            )}
          </div>
        </div>

        <div className='mt-12 w-1/3'>
          <CreateForm />
        </div>
      </div>
    </main>
  );
}
