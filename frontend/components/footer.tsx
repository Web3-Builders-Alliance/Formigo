import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function Footer() {
  return (
    <div className="flex w-full flex-col items-center px-[135px] py-16  xl:px-[240px] pt-12 justify-between bg-card xs:h-24 sm:h-1/4 font-sans">
      <div className="grid grid-rows-1 grid-cols-6 w-full h-full pb-8">
        <div className="col-span-2 flex flex-col p-4 justify-start w-full h-full">
          <div className="flex flex-row items-start justify-start pl-0">
            <Image
              src="/formigo_logo_white.png"
              alt="formigo logo full"
              width={40}
              height={30}
              className=""
            />
            <div className="ml-2 mb-1 font-bold text-txt xs:text-xl sm:text-4xl font-serif">
              Formigo
            </div>
          </div>
          <p className="text-txt-secondary p-1 w-3/4">
            Create, conduct, and secure forms or surveys on Solana blockchain.
          </p>
        </div>
        <div className="col-span-2 w-full h-full flex justify-between text-xl">
          <div className="w-1/2 h-full flex flex-col justify-start p-4">
            <p className="text-white font-bold p-1">Product</p>
            <Link
              href="/features"
              className="text-txt-secondary text-base w-fit p-1 rounded-lg hover:bg-formigo-dark/stroke-base"
            >
              Features
            </Link>
            <Link
              href="/integrations"
              className="text-txt-secondary text-base  w-fit p-1 rounded-lg hover:bg-formigo-dark/stroke-base"
            >
              Integrations
            </Link>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-start p-4">
            <p className="text-white text-xl font-bold p-1">Resources</p>
            <Link
              href="/community"
              className="text-txt-secondary text-base  w-fit p-1 rounded-lg hover:bg-formigo-dark/stroke-base"
            >
              Community
            </Link>
            <Link
              href="/blog"
              className="text-txt-secondary text-base  w-fit p-1 rounded-lg hover:bg-formigo-dark/stroke-base"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-txt-secondary text-base  w-fit p-1 rounded-lg hover:bg-formigo-dark/stroke-base"
            >
              FAQ
            </Link>
          </div>
        </div>
        <div className="col-span-2 w-full h-full flex flex-col justify-start p-4">
          <p className="text-white text-xl font-bold p-1">
            Get Email Notifications
          </p>
          <p className="text-txt-secondary mb-2 p-1 w-2/3">
            Sign up to our e-mail newsletter to receive the latest news &
            updates.
          </p>
          <form>
            <input
              className="p-3 placeholder:pl-2 w-3/4 rounded-l-md bg-formigo-dark/stroke-base"
              placeholder="Input your email"
              type="text"
            ></input>
            <Button className="rounded-br-md rounded-tr-md rounded-tl-[0px] rounded-bl-[0px]">Submit</Button>
          </form>
        </div>
      </div>
      <div className="flex w-full h-1/2 justify-between items-end border-t-2 pt-10 border-formigo-dark/stroke-base">
        <p className="flex items-center text-txt-secondary">
          © 2023 Formigo. All Rights Reserved.
        </p>
        <div className="flex items-center justify-around w-32">
          <a href="https://discord.com" target="_blank">
            <Image
              src="/discord.svg"
              alt="Formigo Discord"
              width={40}
              height={30}
              className="brightness-0 invert ml-2 mr-2 p-1"
            />
          </a>
          <a href="https://twitter.com/FormigoOfficial" target="_blank">
            <Image
              src="/twitter.svg"
              alt="Formigo Twitter"
              width={40}
              height={30}
              className="brightness-0 invert ml-2 mr-4"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
