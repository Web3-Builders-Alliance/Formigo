import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <main
      style={inter.style}
      className="bg-formigo-darkgrey flex h-screen w-screen items-center justify-center"
    >
      <div className="h-[40%] w-1/2 rounded-lg bg-formigo-grey">
        <div className=" flex h-full w-full flex-col items-start justify-start p-24 pt-16 text-white shadow-xl">
          <div className="flex h-16 w-full items-center text-3xl font-bold">
            <Image
              src="/formigo_logo_white.png"
              width={36}
              height={0}
              className="mr-2"
              alt="Formigo Logo"
            />
            <h1 className="mb-1">Formigo</h1>
          </div>
          <div className="flex h-24 w-3/4 items-center text-xl font-bold">
            <p className="text-formigo-dark/text-2nd">
              In order to use Formigo you are required to sign in by selecting
              from the available login methods below.
            </p>
          </div>
          <div className="flex h-64 w-full items-center text-lg font-bold">
            <form className="flex h-full w-full flex-col justify-center">
              <label className="mb-2">Email</label>
              <input
                placeholder="Input your email"
                className="bg-formigo-dark/base-3rd text-formigo-dark/text-2nd mb-2 h-16 w-full rounded-lg placeholder:p-4"
              ></input>
              <label className="mb-8">
                {"We'll email you a magic link for a password-free experience."}
              </label>
              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-formigo-blue text-center text-lg hover:bg-[#5842c3]"
              >
                Continue with email
              </button>
            </form>
          </div>
          <div className="flex h-24 w-full items-center justify-center text-lg font-bold">
            <span className="bg-formigo-dark/text-2nd mr-4 h-[2px] w-[48%]"></span>
            <p className="text-formigo-dark/text-2nd">or</p>
            <span className="bg-formigo-dark/text-2nd ml-4 h-[2px] w-[48%]"></span>
          </div>
          <div className="flex h-24 w-full items-center text-lg font-bold">
            <button className="text-formigo-dark/text-2nd border-formigo-dark/stroke-base flex h-16 w-full items-center justify-center rounded-lg border p-4 hover:bg-gray-600">
              <Image
                src="/Phantom-Icon_Transparent_White.png"
                width={36}
                height={0}
                className="mr-2"
                alt="Formigo Logo"
              />
              Phantom Wallet
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
