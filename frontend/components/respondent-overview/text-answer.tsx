'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

type InfoProps = {
  question: string;
  answer: string;
  loading: boolean;
};

export default function TextResponseCard({
  question,
  answer,
  loading,
}: InfoProps) {
  return (
    <div className='flex w-[770px] flex-col rounded-md border border-border bg-card font-sans '>
      <div className='mb-6 flex w-full flex-col gap-2 p-5'>
        <Label>Question</Label>
        <Input readOnly value={question} />
      </div>
      <div className='flex items-center justify-between border-t border-t-border p-5'>
        <div className='flex flex-col'>
          {loading ? (
            <div className='flex items-center'>
              <ReloadIcon className='spin mr-2 h-4 w-4' />
              Decrypting...
            </div>
          ) : (
            <>
              <p className='text-sm text-txt-secondary'>Answer</p>
              <p className='text-lg font-semibold'>{answer}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
