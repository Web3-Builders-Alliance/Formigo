import { log } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    cookies().delete('next-auth.session-token');
    return Response.json({ message: 'No conrent' }, { status: 203 });
  } catch (error) {
    console.log(error);
  }
}
