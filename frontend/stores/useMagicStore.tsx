import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider';
import { MagicUserMetadata } from 'magic-sdk';
import { create } from 'zustand';

type MagicState = {
  wallet: string;
  user: any;
  magic: InstanceWithExtensions<SDKBase, any> | null;
  setUser: (e: any) => void;
  setMagic: (e: any) => void;
  setWallet: (e: any) => void;
};

const useMagicStore = create<MagicState>()((set) => ({
  user: null,
  wallet: '',
  magic: null,
  setUser: (user) => set((state) => ({ user })),
  setMagic: (magic) => set((state) => ({ magic })),
  setWallet: (wallet) => set((state) => ({ wallet })),
}));

export default useMagicStore;
