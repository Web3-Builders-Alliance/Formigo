import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full h-28 flex justify-around items-center max-w-7xl">
      <div className="ml-4">
        <Image src="/formigo_logo.png" alt="formigo logo" width={60} height={12}/>
      </div>
      <div className="flex justify-around items-center w-1/2 text-lg">
        <Link href="">About</Link>
        <Link href="">Features</Link>
        <Link href="">FAQ</Link>
      </div>
      <button className="mr-4 bg-formigo-blue p-3 text-lg text-white rounded-xl">Login Account</button>
    </div>)
}

export default Navbar;