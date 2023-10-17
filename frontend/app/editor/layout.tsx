import NavEditor from '@/components/nav-editor';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <NavEditor />
      {children}
    </div>
  );
}
