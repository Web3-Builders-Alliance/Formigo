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

  const surveyView = (bool: boolean) => {
    setViewSurvey(bool);
  };

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
            onClick={() => surveyView(true)}
            className="rounded-xl p-4 text-center hover:bg-formigo-grey xs:w-fit sm:w-3/12"
          >
            Surveys
          </button>
          <button
            onClick={() => surveyView(false)}
            className="rounded-xl p-4 text-center hover:bg-formigo-grey xs:w-fit sm:w-3/12"
          >
            Responses
          </button>
        </div>
        <div className="flex h-1/2 w-[14%] items-center justify-end">
          <div className="rounded-full bg-formigo-grey xs:h-[40px] xs:w-[40px] md:h-[60px] md:w-[60px]"></div>
        </div>
      </div>
      {viewSurvey ? <Surveys /> : <Responses />}
      <Footer />
    </main>
  );
}
