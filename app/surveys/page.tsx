import { Inter } from "next/font/google";
import "../globals.css";
import Surveys from "@/components/Surveys";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main style={inter.style} className="flex justify-center w-full">
      <Surveys/>
    </main>
  );
}
