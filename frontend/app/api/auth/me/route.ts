import { api } from '@/lib/axios';

import { cookies } from 'next/headers';

export async function GET() {
  const nextCookies = cookies();
  const token = nextCookies.get('auth');
  try {
    const { data } = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    });

    return Response.json({ data }, { status: 200 });
  } catch (error: any) {
    nextCookies.delete('auth');

    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}
