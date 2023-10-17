import { authOptions } from '@/lib/authOptions';
import { api } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

export default async function getFormResponsesById(id: string) {
  const session = await getServerSession(authOptions);

  try {
    const { data } = await api.get(`/api/responses/form/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    return error;
  }
}
