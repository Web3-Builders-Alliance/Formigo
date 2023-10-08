"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoTrash } from "react-icons/io5";
export default function Choices({
  removeChoice,
  index,
}: {
  index: number;
  removeChoice: (index: number) => void;
}) {
  const [choice, setChoice] = useState<string>("");
  return (
    <div className="w-full flex gap-4 items-center">
      <Input
        onChange={(e) => setChoice(e.target.value)}
        value={choice ?? ""}
        placeholder="Input choice"
      />
      <div onClick={() => removeChoice(index)} className="cursor-pointer">
        <IoTrash className="w-7 h-7 fill-destructive"  />
      </div>
    </div>
  );
}
