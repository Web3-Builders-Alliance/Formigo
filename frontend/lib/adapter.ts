import { PublicKey } from '@solana/web3.js';
import getProvider from './getProvider';
import React, { useEffect, useCallback, useMemo } from 'react';
import signMessage from './signMessage';
const provider = getProvider();
const message = 'Sign into Formigo!';

export type ConnectedMethods = {
  name: string;
  onClick: () => Promise<string | void | SignedMessage>;
};

type SignedMessage = {
  signature: Uint8Array | null;
  publicKey: string;
};

interface Props {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods[];
  handleConnect: () => Promise<void>;
}

const useAdapter = (): Props => {
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

export default useAdapter;
