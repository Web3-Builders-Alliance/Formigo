import BlankCard from '@/components/blank-card';
import CreateForm from '@/components/create-form';
import FormCard from '@/components/form-card';
import ResponseCard from '@/components/responses/response-card';
import getForms from '@/hooks/getForms';
import getResponses from '@/hooks/getResponses';

import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

type Form = {
  name: string;
  status: 'active' | 'draft' | 'archive' | 'disable';
  formId: string;
};

type Response = {
  anonymous: string;
  respondent: string;
  createdAt: string | Date;
  responseId: string;
  surveyName: string;
};

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
              <div className='flex flex-col gap-6'>
                {forms.slice(0, 3).map((form: Form) => (
                  <FormCard
                    key={form.formId}
                    name={form.name}
                    status={form.status}
                    formId={form.formId}
                  />
                ))}

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
          <div className='mt-6'>
            <p className='h-12 text-xl font-semibold text-formigo-dark/text-2nd'>
              Recent responses
            </p>
            {responses.length != 0 ? (
              <div className='flex flex-col gap-6'>
                {responses.slice(0, 3).map((response: Response) => (
                  <ResponseCard
                    key={response.responseId}
                    data={{
                      name: response.anonymous
                        ? 'Anonymous'
                        : response.respondent,
                      date: new Date(response.createdAt),
                      id: response.responseId,
                    }}
                    surveyName={response.surveyName}
                  />
                ))}
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
