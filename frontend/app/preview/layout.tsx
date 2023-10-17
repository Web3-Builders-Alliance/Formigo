import CheckAuthProvider from '@/components/auth-checker';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CheckAuthProvider>{children}</CheckAuthProvider>;
}
