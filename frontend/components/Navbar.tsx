import { IoChevronDown } from "react-icons/io5";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Navbar = () => {
  return (
    <nav className="bg-card border-b-border flex h-[70px] w-full items-center justify-between border px-[135px] xl:px-[240px] py-3.5">
      <div className="text-txt-secondary hover:text-txt flex cursor-pointer items-center gap-2">
        <Button variant="secondary" className="text-txt">
          F
        </Button>
        <p className=" font-sans font-semibold">Formigo</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost">Dashboard</Button>
        <Button variant="ghost">Forms</Button>
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
