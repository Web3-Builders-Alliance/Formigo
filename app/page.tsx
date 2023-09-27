import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Landing2 from "@/components/Landing";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center">
      <Navbar />
      <Landing />
      <Footer />
    </main>
  );
}
