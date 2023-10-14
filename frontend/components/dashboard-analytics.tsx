'use client';

import DashboardSelect from '@/components/dashboard-select';
import CarbonViewFilled from '@/components/icons/CarbonViewFilled';
import FluentFormFilled from '@/components/icons/FluentFormFilled';
import MDIListBox from '@/components/icons/MDIListBox';
import useDashboardDateStore from '@/stores/useDashboardDateStore';

export default function DashboardAnalytics() {
  const selectedDate = useDashboardDateStore((state) => state.date);
  return (
    <>
      <div className='flex h-12 w-full flex-col items-end justify-around'>
        <div className='w-1/3 xl:w-1/5'>
          <DashboardSelect />
        </div>
      </div>
      <div className='flex h-24 w-full items-center justify-between rounded-md p-2 px-20'>
        <div className='flex  items-center justify-start gap-4 bg-card py-4 px-8 rounded-md'>
          <div className=''>
            <MDIListBox />
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Forms created</p>
            <p className='text-2xl'>12</p>
          </div>
        </div>
        <div className='h-3/4 border border-border'></div>
        <div className='flex h-12  items-center justify-start gap-4 '>
          <div className=''>
            <FluentFormFilled />
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Form responses</p>
            <p className='text-2xl'>21</p>
          </div>
        </div>
        <div className='h-3/4 border border-border'></div>
        <div className='flex h-12 items-center justify-start gap-4'>
          <div>
            <CarbonViewFilled />
          </div>
          <div className='flex flex-col justify-start'>
            <p className='whitespace-nowrap'>Form views</p>
            <p className='text-2xl'>122</p>
          </div>
        </div>
      </div>
    </>
  );
}
