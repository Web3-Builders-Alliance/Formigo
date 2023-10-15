import { api } from '@/lib/axios';
import { cookies } from 'next/headers';

export default async function getForms() {
  const nextCookies = cookies();
  const token = nextCookies.get('auth');

  try {
    const { data } = await api.get('/api/forms', {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
}