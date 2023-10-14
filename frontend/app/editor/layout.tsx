'use client'

import NavEditor from '@/components/nav-editor';
import useGetMe from '@/hooks/useGetMe';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, data } = useGetMe();

  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <div className='flex min-h-screen flex-col'>
      <NavEditor />
      {children}
    </div>
  );
}
