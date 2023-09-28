import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Formigo",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-col justify-between items-center">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
