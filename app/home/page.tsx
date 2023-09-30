"use client"

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

  const surveyView = (bool: boolean) => {setViewSurvey(bool)};
  
  return (
    <main style={inter.style} className="flex h-screen w-screen flex-col justify-between items-center">
      <div className="sm:h-36 mt-4 mb-4 flex w-5/6 items-center justify-between xs:h-24">
        <Link href="/" className="flex w-[14%] min-w-[10%] justify-start">
          <Image
            src="/formigo_logo.png"
            alt="formigo logo"
            width={65}
            height={12}
          />
        </Link>
        <div className="sm:text-2xl flex xs:w-1/2 sm:w-8/12 text-center xs:max-w-md sm:max-w-full items-center justify-start font-semibold xs:text-sm">
          <button onClick={() => surveyView(true)} className="rounded-xl p-4 xs:w-fit sm:w-3/12 text-center hover:bg-formigo-grey">
            Surveys
          </button>
          <button onClick={() => surveyView(false)} className="rounded-xl p-4 xs:w-fit sm:w-3/12 text-center hover:bg-formigo-grey">
            Responses
          </button>
        </div>
        <div className="flex w-[14%] h-1/2 justify-end items-center">
          <div className="xs:w-[40px] xs:h-[40px] md:w-[60px] md:h-[60px] bg-formigo-grey rounded-full"></div>
        </div>
      </div>
      {viewSurvey ? <Surveys/> : <Responses/>}
      <Footer/>
    </main>
  );
}
