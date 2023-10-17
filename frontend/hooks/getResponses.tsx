import { authOptions } from '@/lib/authOptions';
import { api } from '@/lib/axios';
import { getServerSession } from 'next-auth';

export default async function getResponses() {
  const session = await getServerSession(authOptions);

  try {
    const { data } = await api.get('/api/responses', {
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
