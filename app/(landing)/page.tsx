import Landing from "@/components/Landing";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main style={inter.style} className="flex justify-center w-full">
      <Landing />
    </main>
  );
}
