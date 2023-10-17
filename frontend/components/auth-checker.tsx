'use client';

import useGetMe from '@/hooks/useGetMe';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CheckAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status, data } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'unauthenticated') {
    router.push('/');
  }
  return <>{status === 'authenticated' && children}</>;
}
