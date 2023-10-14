'use client';

import { api, axios } from '@/lib/axios';
import useUserStore from '@/stores/useUserStore';
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
  const setUser = useUserStore((state) => state.login);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    async function getMe() {
      try {
        setIsLoading(true);

        const data = await axios.get(`/api/auth/me`, {
          cancelToken: source.token,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (data.status == 200) {
          let userData = data.data.data;
          setData(userData);
          setUser(userData.data.base58Address);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setData(null);
          setUser(null);
          router.push('/');
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setData(null);
          setIsLoading(false);
          setUser(null);
          router.push('/');
        }
      }
    }
    getMe();
    return () => {
      source.cancel();
    };
  }, []);

  return { isLoading, data };
};

export default useGetMe;
