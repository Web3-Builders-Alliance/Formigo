import { authOptions } from '@/lib/authOptions';
import { api } from '@/lib/axios';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

type Payload = {
  encryptedForm: string;
  iv: string;
  ecPubkey: string;
  formName: string;
};

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    const { data } = await api.get('/api/forms', {
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(data.data);

    return Response.json({ data: data.data }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  const payload: Payload = await req.json();
  const session = await getServerSession(authOptions);

  try {
    const { data } = await api.post('/api/forms', payload, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
        'Content-Type': 'application/json',
      },
    });

    return Response.json({ data: data.data }, { status: 201 });
  } catch (error: any) {
    console.log(error);

    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}
