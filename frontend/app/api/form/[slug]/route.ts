import { api } from '@/lib/axios';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const payload = await req.json();
  const nextCookies = cookies();
  const token = nextCookies.get('auth');

  try {
    const { data } = await api.patch(`/api/forms/${params.slug}`, payload, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    });

    return Response.json({ data: data.data }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}
