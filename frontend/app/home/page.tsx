"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      style={inter.style}
      className="flex h-screen w-full flex-col items-center justify-between bg-formigo-darkgrey"
    >
      <div className="h-full w-5/6 pt-12">
        <div className="w-full">
          <div className="flex items-center pb-8 pt-8">
            <div className="w-1/2">
              <p className="text-white xs:text-2xl sm:text-4xl">
                Ahoy, Raymart!
              </p>
              <p className="text-formigo-dark/text-2nd sm:text-2xl">
                {"Welcome back! We're thrilled you're here!"}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full xs:flex-col xs:items-center xs:justify-center sm:items-start md:flex-row md:justify-between">
            <div className="flex h-full w-7/12 flex-col justify-start"></div>
            <div className="flex w-4/12 flex-col items-center justify-around rounded-xl bg-formigo-grey p-8 sm:h-1/3">
              <p className=" w-5/6 pt-4 text-center text-white xs:hidden sm:flex sm:justify-center sm:text-4xl xl:text-2xl">
                Create new form?
              </p>
              <p className="text-md text-formigo-bluegreen w-full pb-4 pt-4 text-center xs:hidden sm:flex xl:text-xl">
                Behold! Tap the button below and conjure responses swiftly!
              </p>
              <button className="text-md rounded-xl bg-formigo-blue p-4 text-white xs:w-full sm:w-5/6 xl:w-2/6">
                Create Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
