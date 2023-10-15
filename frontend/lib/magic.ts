import { Magic } from 'magic-sdk';
import { SolanaExtension } from '@magic-ext/solana';

const RPC = process.env.NEXT_PUBLIC_RPC;
const MAGIC = process.env.NEXT_PUBLIC_MAGIC_API_DEVNET;

const createMagic = (key: string) => {
  return (
    typeof window !== 'undefined' &&
    new Magic(key, {
      extensions: {
        solana: new SolanaExtension({
          RPC,
        }),
      },
    })
  );
};
export const magic = createMagic(MAGIC as string);
