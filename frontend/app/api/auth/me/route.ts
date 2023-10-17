import { authOptions } from '@/lib/authOptions';
import { api } from '@/lib/axios';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  try {
    const { data } = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
    });

    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    

    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}
