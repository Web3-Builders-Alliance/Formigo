import { api } from '@/lib/axios';
import { cookies } from 'next/headers';

export default async function getEc(wallet: string) {
  const nextCookies = cookies();
  const token = nextCookies.get('auth');

  try {
    const { data } = await api.get(`/api/user/ec/${wallet}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
}
