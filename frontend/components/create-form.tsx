"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function CreateForm() {
  const router = useRouter();
  return (
    <div className="flex h-[205px] w-full flex-col items-center justify-center gap-3 rounded-md bg-card px-[21px] py-[35px] font-sans">
      <h1 className="font-sans text-xl font-semibold text-txt">
        Create new form?
      </h1>
      <p className="text-center text-base font-normal text-txt-secondary w-3/4">
        Behold! tap the button below and conjure responses swiftly!
      </p>
      <Button onClick={() => router.push("/editor")}>Create form</Button>
    </div>
  );
}
