'use client';

import MagicInput from '@/components/magic-input';
import { getSession, useSession } from 'next-auth/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'authenticated') {
    router.push('/dashboard');
  }
  return (
    <>
      {status === 'unauthenticated' && (
        <main className='flex h-screen flex-col items-center justify-center bg-[url("/bg.png")] bg-cover font-sans'>
          <div className='flex h-fit w-2/5 flex-col rounded-md bg-card px-[70px] py-[48px]'>
            <div className='flex'>
              <Image
                src='/formigo_logo_white.png'
                width={36}
                height={0}
                className='mr-2'
                alt='Formigo Logo'
              />
              <h1 className='font-serif text-2xl font-semibold'>Formigo</h1>
            </div>
            <p className='mt-6 text-left text-base font-medium text-txt-secondary'>
              In order to use Formigo you are required to sign in by selecting
              from the available login methods below.
            </p>
            <div className='mt-6 w-full'>
              <MagicInput />
            </div>
            {/* <DividerText label='or' />
      <div className='flex w-full justify-center'>
        <PhantomButton />
      </div> */}
          </div>
        </main>
      )}
    </>
  );
}
