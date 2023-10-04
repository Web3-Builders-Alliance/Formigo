import FormCard from "@/components/formcards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Forms() {
  return (
    <main className="flex h-screen flex-col px-[135px] py-16 font-sans xl:px-[240px] overflow-auto">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[28px] font-semibold leading-9">Forms</h1>
        <h2 className="text-txt-secondary ">
          Here, you can see all the forms you've generated and drafted.
        </h2>
      </div>
      <div className="my-12 h-[22px] w-[338px]">
        <Input placeholder="Search form" />
      </div>
      <div className="flex h-full w-full justify-between mb-10">
        <div className="mb-10 flex w-3/5 flex-col gap-7">
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
        </div>

        <div className="flex w-4/12 flex-col items-center justify-around rounded-xl bg-formigo-grey p-8 sm:h-1/3">
          <p className=" w-5/6 pt-4 text-center text-white xs:hidden sm:flex sm:justify-center sm:text-4xl xl:text-2xl">
            Create new form?
          </p>
          <p className="text-md w-full pb-4 pt-4 text-center text-formigo-bluegreen xs:hidden sm:flex xl:text-xl">
            Behold! Tap the button below and conjure responses swiftly!
          </p>
          <Button>Create Form</Button>
        </div>
      </div>
    </main>
  );
}
