import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IoEllipsisHorizontal } from "react-icons/io5";

export default function FormCard() {
  return (
    <div className="'flex bg-card h-[135px] w-full flex-col gap-4 rounded-md px-9 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-sans text-xl">Formigo Feedback</h1>
        <Button variant="secondary">
          <IoEllipsisHorizontal className="h-6 w-6" />
        </Button>
      </div>

      <Badge>Active</Badge>
    </div>
  );
}
