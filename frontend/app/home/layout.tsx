import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between items-center border-8 border-blue-700 min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
