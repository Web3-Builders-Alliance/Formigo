import CheckAuthProvider from '@/components/auth-checker';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckAuthProvider>
      <div className='flex min-h-screen flex-col'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </CheckAuthProvider>
  );
}
