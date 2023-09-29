import { Inter } from "next/font/google";
import "../globals.css";
import Responses from "@/components/Responses";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main style={inter.style} className="flex justify-center w-full">
      <Responses/>
    </main>
  );
}
