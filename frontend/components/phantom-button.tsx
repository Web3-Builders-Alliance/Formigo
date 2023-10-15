'use client';

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import NoProvider from './NoProvider';
import PhantomIcon from './icons/phantom';
import { Button } from './ui/button';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import useAdapter from '@/lib/adapter';
import getProvider from '@/lib/getProvider';
import { generateLogInMessage } from '@/lib/generateMessage';
import { ReloadIcon } from '@radix-ui/react-icons';

const provider = getProvider();

const PhantomButton = () => {
  const { publicKey, connectedMethods, handleConnect } = useAdapter();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!provider) {
    return <NoProvider />;
  }

  // const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const sig = await connectedMethods[connectedMethods.length - 2].onClick();
  //     const message = 'Sign into Formigo!';
  //     if (sig) {
  //       fetch('/api/auth', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           walletAddress: sig.publicKey.toString(),
  //           message,
  //           signature: sig?.signature,
  //           wallet: 'adapter',
  //         }),
  //       })
  //         .then(() => {
  //           router.push('/dashboard');
  //         })
  //         .catch((e) => {
  //           setLoading(false);
  //           console.log(e);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      {loading ? (
        <Button variant='outline' className='w-full' disabled>
          <ReloadIcon className='spin mr-2 h-4 w-4' />
          Please wait
        </Button>
      ) : (
        <Button variant='outline' className='w-full'>
          <PhantomIcon className='mr-2 h-4 w-5' />
          Phantom wallet
        </Button>
      )}
    </>
  );
};

export default PhantomButton;
