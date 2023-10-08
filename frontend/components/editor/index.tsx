"use client";

import { ReactNode, useState } from "react";
import SetupForm from "./setup-form";
import { IoAdd } from "react-icons/io5";
import { Button } from "../ui/button";
import Question from "./question";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function FormEditor() {
  const [numForms, setNumForms] = useState<number>(0);

  function addForm() {
    setNumForms(numForms + 1);
  }

  const formComponents = [];

  for (let i = 0; i < numForms; i++) {
    formComponents.push(<Question key={i} index={i + 1} />);
  }

  return (
    <>
      <SetupForm />
      {formComponents.length != 0 ? (
        <div className="flex flex-col gap-8 mt-12">{formComponents}</div>
      ) : null}

      <div className="flex items-center justify-center my-6">
        <Button onClick={addForm} className="rounded-full p-3">
          <IoAdd className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
