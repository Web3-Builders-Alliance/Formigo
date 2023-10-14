'use client';

import { ReactNode, useState } from 'react';
import SetupForm from './setup-form';
import { IoAdd } from 'react-icons/io5';
import { Button } from '../ui/button';
import Question from './question';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import useFormStore from '@/stores/useFormStore';
import usePublishingStore from '@/stores/usePublishingStore';

export default function FormEditor() {
  const [numForms, setNumForms] = useState<number>(0);
  const formOverview = useFormStore((state) => state.formOverview);
  const isLoading = usePublishingStore((state) => state.isLoading);

  function addForm() {
    setNumForms(numForms + 1);
  }

  const formComponents = [];

  for (let i = 0; i < numForms; i++) {
    formComponents.push(<Question key={i} index={i} />);
  }

  return (
    <>
      <SetupForm />
      {formComponents.length != 0 ? (
        <div className='mt-12 flex flex-col gap-8'>{formComponents}</div>
      ) : null}
      {formOverview ? (
        <div className='my-6 flex items-center justify-center'>
          {isLoading ? (
            <Button disabled className='rounded-full p-3'>
              <IoAdd className='h-5 w-5' />
            </Button>
          ) : (
            <Button onClick={addForm} className='rounded-full p-3'>
              <IoAdd className='h-5 w-5' />
            </Button>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
