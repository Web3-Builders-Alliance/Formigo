import CreateForm from '@/components/create-form';
import FormCard from '@/components/form-card';
import CarbonViewFilled from '@/components/icons/CarbonViewFilled';
import FluentFormFilled from '@/components/icons/FluentFormFilled';
import MDIListBox from '@/components/icons/MDIListBox';
import ResponseCard from '@/components/responses/response-card';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoArrowDown,
  IoArrowForward,
  IoArrowUp,
  IoChevronDown,
} from 'react-icons/io5';

const data = [
  { name: 'Joseph', date: new Date('2023, 6, 2'), id: '1234-5678-abcd' },
  { name: 'Raymart', date: new Date('2023, 4, 2'), id: '1234-5678-abcd' },
];

export default function Dashboard() {
  return (
    <main className='flex min-h-screen flex-col justify-start gap-8 px-[135px] py-16 font-sans xl:px-[240px]'>
      <div className='flex flex-col gap-1.5'>
        <h1 className='text-[28px] font-semibold leading-9'>Ahoy, Raymart!</h1>
        <h2 className='text-txt-secondary'>
          {"Welcome back! We're thrilled you're here!"}
        </h2>
      </div>
      <div className='flex h-12 w-full flex-col items-end justify-around'>
        <div className='w-1/3 xl:w-1/5'>
          <Select>
            <SelectTrigger className='bg-card'>
              <SelectValue placeholder='Date' />
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <div className='flex h-24 w-full items-center justify-between rounded-md bg-card p-2'>
        <div className='flex h-12 w-1/3 items-center justify-start gap-4 pl-4'>
          <div className=''>
            <MDIListBox></MDIListBox>
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Forms created</p>
            <p className='text-2xl'>12</p>
          </div>
          <div className='hidden 2xl:flex items-center rounded-md bg-formigo-light/primary-2nd p-1 px-2'>
            <p className='mr-1'>+100% last month </p>
            <IoArrowUp />
          </div>
        </div>
        <div className='flex h-12 w-1/3 items-center justify-start gap-4 border-x pl-4'>
          <div className=''>
            <FluentFormFilled></FluentFormFilled>
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Form responses</p>
            <p className='text-2xl'>21</p>
          </div>
          <div className='hidden 2xl:flex items-center rounded-md bg-formigo-danger p-1 px-2'>
            <p className='mr-1'>-20% last month</p>
            <IoArrowDown />
          </div>
        </div>
        <div className='flex h-12 w-1/3 items-center justify-start gap-4 pl-4'>
          <div>
            <CarbonViewFilled></CarbonViewFilled>
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Form views</p>
            <p className='text-2xl'>122</p>
          </div>
          <div className='hidden 2xl:flex items-center rounded-md bg-formigo-light/primary-2nd p-1 px-2'>
            <p className='mr-1'>+10% last month </p>
            <IoArrowUp />
          </div>
        </div>
      </div>
      <div className='mb-10 flex h-full w-full justify-between'>
        <div className='flex w-3/5 flex-col'>
          <div>
            <p className='h-12 text-xl font-semibold text-formigo-dark/text-2nd'>
              Recent forms
            </p>
            <div className='h-[205px]'>
              <FormCard />
              <Link
                href='/forms'
                className='flex h-12 items-center text-formigo-blue'
              >
                <p>See all forms</p>
                <IoArrowForward></IoArrowForward>
              </Link>
            </div>
          </div>
          <div>
            <p className='h-12 text-xl font-semibold text-formigo-dark/text-2nd'>
              Recent responses
            </p>
            <div className='h-[205px]'>
              <ResponseCard
                data={{
                  name: 'Joseph',
                  date: new Date('2023, 6, 2'),
                  id: '1234-5678-abcd',
                }}
                surveyName='Formigo feedback'
              />
            </div>
          </div>
        </div>

        <div className='mt-12 w-1/3'>
          <CreateForm />
        </div>
      </div>
    </main>
  );
}
