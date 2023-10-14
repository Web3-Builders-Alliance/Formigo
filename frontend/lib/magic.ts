import { Magic } from 'magic-sdk';
import { SolanaExtension } from '@magic-ext/solana';

const RPC = process.env.NEXT_PUBLIC_RPC;
const MAGIC = process.env.NEXT_PUBLIC_MAGIC_API_DEVNET;
export const magic = new Magic(MAGIC as string, {
  extensions: {
    solana: new SolanaExtension({
      RPC,
    }),
  },
});
