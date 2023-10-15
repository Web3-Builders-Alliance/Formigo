import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';

type TextAnswerProps = {
  index: number | 0;
  info: Info;
};

type Info = {
  type: string;
  question: string;
  choices?: string[] | '';
};

export default function ChoiceAnswerCard({ index, info }: TextAnswerProps) {
  return (
    <div className='flex w-[770px] flex-col rounded-md border border-border bg-card font-sans '>
      <div className='flex w-full flex-col gap-2 p-5'>
        <Label>Question</Label>
        <Input
          readOnly
          value={info.question}
          className='border-0 focus:ring-0'
        />
      </div>
      <div className='mb-6 flex w-full flex-col gap-2 p-5'>
        <Label>Choices</Label>
        <div className='flex flex-col gap-2'></div>
        {info.choices != '' && info.choices?.length != 0 ? (
          info.choices?.map((item, index) => (
            <Input
            key={index}
              value={item}
              readOnly
              className='w-1/2 border-0 focus:ring-0'
            />
          ))
        ) : (
          <></>
        )}
      </div>
      {/* 
      TODO: Analytics enchancement
      
      */}
      {/* <div className='flex flex-col border-t border-t-border px-5 py-4'>
        <div className='flex flex-col gap-2'></div>

        <Sheet>
          <div className='flex justify-end'>
            <SheetTrigger className='rounded-md border bg-transparent px-4 py-2.5 font-semibold text-txt-secondary shadow-sm transition-colors hover:bg-btn-secondary hover:text-txt'>
              Summary
            </SheetTrigger>
          </div>

          <SheetContent className='font-sans'>
            <div className='flex flex-col'>
              <div className='mt-6 flex flex-col gap-2'>
                <Label className='text-txt-secondary'>Question</Label>
                <h1 className='overflow-hidden text-ellipsis text-xl font-semibold'>
                  {info.question}
                </h1>
              </div>
              <div className='mt-8 flex w-full flex-col gap-4 rounded-md border border-border p-4'>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex w-full items-center justify-between'>
                      <p className='text-base font-medium'>
                        {info.choices?.[0]}
                      </p>
                      <p className='text-sm font-semibold text-btn-primary'>
                        55%
                      </p>
                    </div>
                  </div>
                  <Progress value={55} className='w-full text-base' />
                </div>
                <div className='flex flex-col'>
                  <div className='flex flex-col'>
                    <div className='flex w-full items-center justify-between'>
                      <p className='text-base font-medium'>
                        {info.choices?.[1]}
                      </p>
                      <p className='text-sm font-semibold text-btn-primary'>
                        45%
                      </p>
                    </div>
                  </div>
                  <Progress value={45} className='w-full text-base' />
                </div>
              </div>
              <div className='mt-8 flex flex-col gap-4'>
                <Label className='text-lg font-semibold'>Stats</Label>
                <div className='flex w-full gap-4'>
                  <div className='flex h-28  w-full flex-col gap-2 rounded-md border border-border bg-card p-4'>
                    <Label className='text-xs text-txt-secondary'>
                      Total responses
                    </Label>
                    <h2 className='text-xl font-semibold'>12</h2>
                  </div>
                  <div className='flex h-28  w-full flex-col gap-2 rounded-md border border-border bg-card p-4'>
                    <Label className='text-xs text-txt-secondary'>
                      Total views
                    </Label>
                    <h2 className='text-xl font-semibold'>14</h2>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div> */}
    </div>
  );
}
