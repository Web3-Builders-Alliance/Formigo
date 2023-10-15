'use client';

import Footer from '@/components/footer';
import FormTab from '@/components/form-tab';
import Navback from '@/components/nav-back';
import useGetMe from '@/hooks/useGetMe';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, data } = useGetMe();

  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <div className='flex min-h-screen flex-col'>
      <Navback />
      <main className='mx-auto flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[380px]'>
        <FormTab />
        {children}
      </main>

      <Footer />
    </div>
  );
}
