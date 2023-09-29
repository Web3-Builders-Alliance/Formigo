"use client"

import Image from "next/image";
import Link from "next/link";

const HomeNavbar = () => {
  return (
    <div className="sm:h-36 flex w-5/6 items-center justify-between xs:h-24">
      <Link href="/" className="flex w-[14%] min-w-[10%] justify-start">
        <Image
          src="/formigo_logo.png"
          alt="formigo logo"
          width={65}
          height={12}
        />
      </Link>
      <div className="sm:text-lg flex xs:w-1/2 sm:w-8/12 text-center xs:max-w-md sm:max-w-full items-center sm:justify-start xs:justify-around font-semibold xs:text-sm">
        <Link href="/surveys" className="rounded-xl p-1 xs:w-fit sm:w-2/12 hover:bg-formigo-grey">
          Surveys
        </Link>
        <Link href="/responses" className="rounded-xl p-1 xs:w-fit sm:w-2/12 hover:bg-formigo-grey">
          Responses
        </Link>
      </div>
      <div className="flex w-[14%] h-1/2 justify-end items-center">
        <div className="xs:w-[40px] xs:h-[40px] md:w-[60px] md:h-[60px] bg-formigo-grey rounded-full"></div>
      </div>
    </div>
  );
};

export default HomeNavbar;
