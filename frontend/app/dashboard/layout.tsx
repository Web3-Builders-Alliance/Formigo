'use client'
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import useGetMe from '@/hooks/useGetMe';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading ,data } = useGetMe();
  
  

  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
