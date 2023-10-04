import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex h-[7%] w-full items-center justify-center bg-formigo-grey">
      <div className="flex w-5/6 items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-formigo-dark/stroke-base text-white">
          F
        </div>
        <Link
          href="/"
          className="flex w-[14%] min-w-[10%] justify-start text-xl font-bold text-formigo-dark/text-2nd"
        >
          Formigo
        </Link>
        <div className="flex items-center justify-center text-center font-semibold xs:w-1/2 xs:max-w-md xs:text-sm sm:w-8/12 sm:max-w-full sm:text-lg">
          <button
            // onClick={() => setViewSurvey(true)}
            className="rounded-xl p-2 text-center text-formigo-dark/text-2nd hover:border-2 hover:bg-formigo-grey xs:w-fit sm:w-2/12"
          >
            Dashboard
          </button>
          <button
            // onClick={() => setViewSurvey(false)}
            className="rounded-xl p-2 text-center text-formigo-dark/text-2nd hover:border-2 hover:bg-formigo-grey xs:w-fit sm:w-2/12"
          >
            Forms
          </button>
        </div>
        <div className="flex h-1/2 w-[14%] items-center justify-end">
          <div className="rounded-full bg-blue-300 xs:h-8 xs:w-8 md:h-12 md:w-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
