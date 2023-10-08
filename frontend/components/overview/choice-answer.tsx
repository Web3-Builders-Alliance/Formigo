import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";

type TextAnswerProps = {
  index: number | 0;
  info: Info;
};
type Choice = {
  choice: string;
  total: number;
};

type Info = {
  type: string;
  question: string;
  choices?: Choice[];
};

export default function ChoiceAnswerCard({ index, info }: TextAnswerProps) {
  return (
    <div className="flex flex-col w-[770px] bg-card border-border border font-sans rounded-md ">
      <div className="flex flex-col gap-2 w-full p-5 mb-6">
        <Label>Question</Label>
        <Input readOnly value={info.question} />
      </div>
      <div className="flex flex-col border-t border-t-border p-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-sm text-txt-secondary">Top answer</p>
            <div className="flex w-full justify-between items-center">
              <p className="text-base font-medium">
                {info.choices?.[0].choice}
              </p>
              <p className="text-btn-primary font-semibold text-sm">55%</p>
            </div>
          </div>

          <Progress value={55} className="w-full text-base" />
        </div>

        <Sheet>
          <div className="flex mt-4 justify-end">
            <SheetTrigger className="transition-colors border font-semibold text-txt-secondary bg-transparent shadow-sm hover:bg-btn-secondary hover:text-txt px-4 py-2.5 rounded-md">
              Summary
            </SheetTrigger>
          </div>

          <SheetContent className="font-sans">
            <div className="flex flex-col">
              <div className="flex flex-col mt-6 gap-2">
                <Label className="text-txt-secondary">Question</Label>
                <h1 className="font-semibold text-xl text-ellipsis overflow-hidden">
                  {info.question}
                </h1>
              </div>
              <div className="flex flex-col border border-border w-full p-4 rounded-md mt-8 gap-4">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="flex w-full justify-between items-center">
                      <p className="text-base font-medium">
                        {info.choices?.[0].choice}
                      </p>
                      <p className="text-btn-primary font-semibold text-sm">
                        55%
                      </p>
                    </div>
                  </div>
                  <Progress value={55} className="w-full text-base" />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="flex w-full justify-between items-center">
                      <p className="text-base font-medium">
                        {info.choices?.[1].choice}
                      </p>
                      <p className="text-btn-primary font-semibold text-sm">
                        45%
                      </p>
                    </div>
                  </div>
                  <Progress value={45} className="w-full text-base" />
                </div>
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
        </Sheet>
      </div>
    </div>
  );
}
