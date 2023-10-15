'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { IoCheckmarkDone, IoCopyOutline } from 'react-icons/io5';
import axios from 'axios';
import { useToast } from './ui/use-toast';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

type Form = {
  formId: string;
  creator: string;
  name: string;
  status: string;
};

export default function SettingTab({ data }: { data: Form }) {
  const pathname = usePathname();
  let parts = pathname.split('/');
  const domain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(data?.status);
  const [link, setLink] = useState(`${domain}/${parts[2]}`);
  const [copied, setCopied] = useState(false);
  async function disableForm() {
    setIsLoading(true);
    let data = {
      status: 'disable',
    };

    axios
      .patch(`/api/form/${parts[2]}`, data, {
        headers: {
          Authorization: 'application/json',
        },
      })
      .then(() => {
        setIsLoading(false);
        setStatus('disable');
        toast({
          title: 'Form Disabled!',
          description: 'Your form has been successfully disabled.',
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: 'Update Failed!',
          description: 'Unable to disable the form. Please try again.',
          variant: 'destructive',
        });
      });
  }
  async function enableForm() {
    setIsLoading(true);
    let data = {
      status: 'active',
    };

    axios
      .patch(`/api/form/${parts[2]}`, data, {
        headers: {
          Authorization: 'application/json',
        },
      })
      .then(() => {
        setIsLoading(false);
        setStatus('active');
        toast({
          title: 'Form Activated!',
          description: 'Your form has been successfully activated.',
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: 'Update Failed!',
          description: 'Unable to enable the form. Please try again.',
          variant: 'destructive',
        });
      });
  }

  return (
    <div className='mt-12 flex w-[770px] flex-col gap-6'>
      <div className='w flex flex-col rounded-md border border-border bg-card font-sans '>
        <div className='flex w-full flex-col gap-2 p-5'>
          <Label>Share link</Label>
          <div className='flex items-center justify-between rounded-md border  border-border bg-btn-secondary px-4 py-3 text-sm'>
            <p>{`${domain}/${parts[2]}`}</p>
            <div
              className='cursor-pointer'
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(link);
              }}
            >
              {copied ? (
                <IoCheckmarkDone className='h-5 w-5' />
              ) : (
                <IoCopyOutline className='h-5 w-5' />
              )}
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-4 p-5'>
          <Label>Danger</Label>
          <div>
            {isLoading ? (
              <Button
                disabled
                variant='destructive'
                className='text-sm font-medium'
              >
                <ReloadIcon className='spin mr-2 h-4 w-4' />
                Please wait
              </Button>
            ) : (
              <>
                {status === 'active' ? (
                  <Button
                    onClick={disableForm}
                    variant='destructive'
                    className='text-sm font-medium'
                  >
                    Disable form
                  </Button>
                ) : (
                  <Button onClick={enableForm} className='text-sm font-medium'>
                    Activate form
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
