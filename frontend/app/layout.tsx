import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';


export const metadata: Metadata = {
  title: 'Formigo',
  description: '',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${montserrat.variable}`}>
      <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
