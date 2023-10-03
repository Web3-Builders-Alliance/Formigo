import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";
import "../globals.css";
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
      <body className="flex h-screen w-screen flex-col items-center justify-between">
        {children}
      </body>
    </html>
  );
}
