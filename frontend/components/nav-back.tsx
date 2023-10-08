"use client";
import { Button } from "./ui/button";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Navback() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 flex h-[70px] w-full items-center justify-between border border-b-border bg-card px-[135px] py-3.5 xl:px-[240px]">
      <Button variant="ghost" onClick={() => router.back()}>
        <IoChevronBack className="mr-2.5 h-5 w-5" /> Return to previous page
      </Button>
    </nav>
  );
}
