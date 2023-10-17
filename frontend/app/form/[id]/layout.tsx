import CheckAuthProvider from '@/components/auth-checker';
import Footer from '@/components/footer';
import FormTab from '@/components/form-tab';
import Navback from '@/components/nav-back';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CheckAuthProvider>
      <div className='flex min-h-screen flex-col'>
        <Navback />
        <main className='mx-auto flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[380px]'>
          <FormTab />
          {children}
        </main>

        <Footer />
      </div>
    </CheckAuthProvider>
  );
}
