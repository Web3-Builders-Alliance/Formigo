import { api } from '@/lib/axios';
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';

type Payload = {
  message: string;
  walletAddress: string;
  signature: string;
};

export async function POST(req: NextRequest) {
  const payload: Payload = await req.json();
  try {
    const { data } = await api.post('/api/auth/', payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    let serilized = serialize('auth', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 60 * 60,
      path: '/',
    });
    console.log(data.data);
    
    return Response.json(
      { message: 'authenticated', data: data.data },
      { status: 200, headers: { 'Set-Cookie': serilized } }
    );
  } catch (error: any) {
    console.log(error);
    
    return Response.json(
      { data: null, message: error.message },
      { status: 400 }
    );
  }
}
