import { authOptions } from '@/lib/authOptions';
import { api } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const payload = await req.json();
  const session = await getServerSession(authOptions);

  try {
    const { data } = await api.patch(`/api/forms/${params.slug}`, payload, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
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
