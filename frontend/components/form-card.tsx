'use client'
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function FormCard() {
  const router = useRouter();
  return (
    <div className="'flex bg-card h-[135px] w-full flex-col gap-4 rounded-md px-9 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-sans text-xl">Formigo Feedback</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              <IoEllipsisHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem
              className="font-sans"
              onClick={() => router.push("/form/ecqwsx")}
            >
              View Summary
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge>Active</Badge>
    </div>
  );
}
