"use client";
import { IoChevronDown } from "react-icons/io5";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="sticky top-0 flex h-[70px] w-full items-center justify-between border border-b-border bg-card px-[135px] py-3.5 xl:px-[240px]">
      <div className="flex cursor-pointer items-center gap-2 text-txt-secondary hover:text-txt">
        <Button variant="secondary" className="text-txt">
          F
        </Button>
        <p className=" font-sans font-semibold">Formigo</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.push("/dashboard")}
          variant={pathname == "/dashboard" ? "ghost-active" : "ghost"}
        >
          Dashboard
        </Button>
        <Button
          onClick={() => router.push("/forms")}
          variant={pathname == "/forms" ? "ghost-active" : "ghost"}
        >
          Forms
        </Button>
        <Button variant="ghost">
          Account <IoChevronDown className="ml-2.5 h-5 w-5" />
        </Button>
      </div>

      <Avatar>
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
