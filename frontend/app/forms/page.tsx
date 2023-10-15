import BlankCard from '@/components/blank-card';
import CreateForm from '@/components/create-form';
import FormCard from '@/components/form-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import getForms from '@/hooks/getForms';

type Form = {
  name: string;
  status: 'active' | 'draft' | 'archive' | 'disable';
  formId: string;
};

export default async function Forms() {
  const forms = await getForms();
  return (
    <main className='flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[240px]'>
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-[28px] font-semibold leading-9'>Forms</h1>
        <h2 className='text-txt-secondary'>
          {"Here, you can see all the forms you've generated."}
        </h2>
      </div>
      {/* <div className='my-12 h-[22px] w-[338px]'>
        <Input placeholder='Search form' />
      </div> */}
      <div className='mb-10 flex h-full w-full justify-between'>
        <div className='mb-10 flex h-fit w-3/5 flex-col gap-7'>
          {forms.length != 0 ? (
            forms.map((item: Form, index: number) => (
              <FormCard
                key={index}
                name={item.name}
                status={item.status}
                formId={item.formId}
              />
            ))
          ) : (
            <BlankCard text='You have not yet generated any forms.' />
          )}
        </div>

        <div className='w-1/3'>
          <CreateForm />
        </div>
      </div>
    </main>
  );
}
