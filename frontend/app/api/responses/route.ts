import { api } from '@/lib/axios';
import { NextRequest } from 'next/server';

type Payload = {
  encryptedResponse: string;
  iv: string;
  ecPubkey: string;
  anonymous: boolean;
  respondent: string;
  formId: string;
};

export async function POST(req: NextRequest) {
  const payload: Payload = await req.json();
  try {
    const { data } = await api.post('/api/responses', payload, {
      headers: {
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
