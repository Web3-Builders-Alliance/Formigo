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
      <body className="flex flex-col items-center justify-between h-screen">
        {children}
      </body>
    </html>
  );
}
