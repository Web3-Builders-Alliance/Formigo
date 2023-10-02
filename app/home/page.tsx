"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Surveys from "@/components/Surveys";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Responses from "@/components/Responses";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [viewSurvey, setViewSurvey] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main
      style={inter.style}
      className="flex h-screen w-screen flex-col items-center justify-between"
    >
      <div className="mb-4 mt-4 flex w-5/6 items-center justify-between xs:h-24 sm:h-36">
        <Link href="/" className="flex w-[14%] min-w-[10%] justify-start">
          <Image
            src="/formigo_logo.png"
            alt="formigo logo"
            width={65}
            height={12}
          />
        </Link>
        <div className="flex items-center justify-start text-center font-semibold xs:w-1/2 xs:max-w-md xs:text-sm sm:w-8/12 sm:max-w-full sm:text-2xl">
          <button
            onClick={() => setViewSurvey(true)}
            className="rounded-xl p-4 text-center hover:bg-formigo-grey xs:w-fit sm:w-3/12"
          >
            Surveys
          </button>
          <button
            onClick={() => setViewSurvey(false)}
            className="rounded-xl p-4 text-center hover:bg-formigo-grey xs:w-fit sm:w-3/12"
          >
            Responses
          </button>
        </div>
        <div className="flex h-1/2 w-[14%] items-center justify-end">
          <div className="rounded-full bg-formigo-grey xs:h-[40px] xs:w-[40px] md:h-[60px] md:w-[60px]"></div>
        </div>
      </div>
      <div className="h-[75vh] w-5/6">
        <div className="w-full font-bold">
          <div className="pb-8 pt-8 xs:text-2xl sm:text-4xl">
            {viewSurvey ? "Surveys" : "Responses"}
          </div>
          <div className="flex h-full w-full xs:flex-col xs:items-center xs:justify-center sm:items-start md:flex-row md:justify-between">
            <div className="flex h-full w-7/12 flex-col justify-start">
              {viewSurvey ? <Surveys /> : <Responses />}
            </div>
            <div className="flex max-h-[500px] min-h-[500px] w-4/12 flex-col items-center justify-around rounded-xl border-formigo-teal p-4 sm:h-1/3 sm:border">
              <p className=" w-5/6 pb-4 pt-4 text-center font-semibold xs:hidden sm:flex sm:text-4xl xl:text-5xl">
                Ready to survey like a rockstar?
              </p>
              <p className="text-md w-5/6 pb-4 pt-4 text-center xs:hidden sm:flex xl:text-xl">
                Give that button a tap, and let&apos;s craft a fresh, fabulous
                survey together!
              </p>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="rounded-xl bg-formigo-blue p-4 text-xl text-white xs:w-full sm:w-5/6 xl:w-3/6"
              >
                Create Survey
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
