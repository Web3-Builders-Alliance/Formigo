'use client';

import { axios } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface IUser {
  walletAddress: string;
  base58Address: string;
  username: string;
  credits: number;
}

const useGetMe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IUser | null>(null);
  return { isLoading, data };
};

export default useGetMe;
