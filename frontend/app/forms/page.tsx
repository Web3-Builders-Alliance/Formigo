
import CreateForm from "@/components/create-form";
import FormCard from "@/components/form-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Forms() {
  return (
    <main className="flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[240px]">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[28px] font-semibold leading-9">Forms</h1>
        <h2 className="text-txt-secondary">
          {"Here, you can see all the forms you've generated and drafted."}
        </h2>
      </div>
      <div className="my-12 h-[22px] w-[338px]">
        <Input placeholder="Search form" />
      </div>
      <div className="flex h-full w-full justify-between mb-10">
        <div className="mb-10 flex w-3/5 flex-col gap-7 h-fit">
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
          <FormCard />
        </div>

        <div className="w-1/3">
          <CreateForm />

        </div>
      </div>
    </main>
  );
}
