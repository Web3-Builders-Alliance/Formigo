'use client';

import React, { FC, useCallback, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  BaseWalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SolanaSignInInput } from '@solana/wallet-standard-features';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const LABELS = {
  'change-wallet': 'Change wallet',
  connecting: 'Connecting ...',
  'copy-address': 'Copy address',
  copied: 'Copied',
  disconnect: 'Disconnect',
  'has-wallet': 'Connect',
  'no-wallet': 'Select Wallet',
} as const;

export const PhantomButton: FC = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PhantomButton;