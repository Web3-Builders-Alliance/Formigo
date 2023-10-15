import { api } from '@/lib/axios';
import { cookies } from 'next/headers';

export default async function useFormAnon(id: string) {
  try {
    const { data } = await api.get(`/api/forms/anon/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
}
