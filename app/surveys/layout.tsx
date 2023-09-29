import Footer from "@/components/Footer";
import HomeNavbar from "@/components/HomeNavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-col justify-between items-center">
        <HomeNavbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )};