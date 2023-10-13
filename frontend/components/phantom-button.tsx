'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getProvider, signMessage, signTransaction } from './utils';
import NoProvider from './NoProvider';
import PhantomIcon from './icons/phantom';
import { Button } from './ui/button';
import { useRouter } from 'next/router';

const provider = getProvider();
const message = 'Sign into Formigo!';

export type ConnectedMethods = {
  name: string;
  onClick: () => Promise<string | void | SignedMessage>;
};

type SignedMessage = {
  signature: Uint8Array;
  publicKey: string;
};

interface Props {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods[];
  handleConnect: () => Promise<void>;
}

const useProps = (): Props => {
  useEffect(() => {
    if (!provider) return;

    // attempt to eagerly connect
    provider.connect({ onlyIfTrusted: true }).catch(() => {});

    provider.on('connect', (publicKey: PublicKey) => {});

    provider.on('disconnect', () => {});

    provider.on('accountChanged', (publicKey: PublicKey | null) => {});
  }, []);

  /** SignMessage */
  const handleSignMessage = useCallback(async () => {
    if (!provider) return;

    try {
      const signedMessage = await signMessage(provider, message);
      return signedMessage;
    } catch (error: any) {}
  }, []);

  /** Connect */
  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.connect();
    } catch (error: any) {}
  }, []);

  /** Disconnect */
  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
    } catch (error: any) {}
  }, []);

  const connectedMethods = useMemo(() => {
    return [
      {
        name: 'Sign Message',
        onClick: handleSignMessage,
      },
      {
        name: 'Disconnect',
        onClick: handleDisconnect,
      },
    ];
  }, [handleSignMessage, handleDisconnect]);

  return {
    publicKey: provider?.publicKey || null,
    connectedMethods,
    handleConnect,
  };
};

const PhantomButton = () => {
  const { publicKey, connectedMethods, handleConnect } = useProps();
  const router = useRouter();

  if (!provider) {
    return <NoProvider />;
  }

  const handleClick = async () => {
    const message =
      await connectedMethods[connectedMethods.length - 2].onClick();

    if (message) {
      fetch('https://formigo-api.up.railway.app/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey,
          message: 'test',
          signature: message.signature,
        }),
      }).then(() => {
        router.push('/dashboard')
      });
    }
  };

  return (
    <Button variant='outline' className='w-full' onClick={handleClick}>
      <PhantomIcon className='mr-2 h-4 w-5' />
      Phantom wallet
    </Button>
  );
};

export default PhantomButton;
