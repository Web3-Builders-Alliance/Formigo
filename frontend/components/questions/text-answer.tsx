"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TextAnswerProps = {
  index: number | 0;
  info: Info;
};

type Info = {
  type: string;
  question: string;
};

export default function TextAnswerCard({ index, info }: TextAnswerProps) {
  return (
    <div className="flex flex-col w-[770px] bg-card border-border border font-sans rounded-md ">
      <div className="flex flex-col gap-2 w-full p-5 mb-6">
        <Label>Question</Label>
        <Input readOnly value={info.question} />
      </div>
      <div className="flex items-center justify-between border-t border-t-border p-5">
        <p className="text-sm text-txt-secondary">
          Since this is a text-based question, no choices to be display.
        </p>
        <p></p>
        {/* <Sheet>
          <SheetTrigger className="transition-colors border font-semibold text-txt-secondary bg-transparent shadow-sm hover:bg-btn-secondary hover:text-txt px-4 py-2.5 rounded-md">
            Summary
          </SheetTrigger>
          <SheetContent className="font-sans">
            <div className="flex flex-col">
              <div className="flex flex-col mt-6 gap-2">
                <Label className="text-txt-secondary">Question</Label>
                <h1 className="font-semibold text-xl text-ellipsis overflow-hidden">
                  {info.question}
                </h1>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <Label className="text-lg font-semibold">Stats</Label>
                <div className="flex w-full gap-4">
                  <div className="flex p-4  gap-2 flex-col bg-card rounded-md h-28 w-full border border-border">
                    <Label className="text-xs text-txt-secondary">
                      Total responses
                    </Label>
                    <h2 className="font-semibold text-xl">12</h2>
                  </div>
                  <div className="flex p-4  gap-2 flex-col bg-card rounded-md h-28 w-full border border-border">
                    <Label className="text-xs text-txt-secondary">
                      Total views
                    </Label>
                    <h2 className="font-semibold text-xl">14</h2>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet> */}
      </div>
    </div>
  );
}
