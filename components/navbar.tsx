import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-28 flex justify-around items-center max-w-7xl">
      <div className="">
        <Image src="/formigo_logo.png" alt="formigo logo" width={60} height={12}/>
      </div>
      <div className="flex justify-around items-center w-1/2 text-lg">
        <Link href="">About</Link>
        <Link href="">Features</Link>
        <Link href="">FAQ</Link>
      </div>
      <button className="border-2 bg-[#0B44ED] p-4 text-lg text-white rounded-xl">Login Account</button>
    </div>)
}

export default Navbar;