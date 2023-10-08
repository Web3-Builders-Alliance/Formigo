import CreateForm from "@/components/create-form";
import FormCard from "@/components/form-card";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col px-[135px] py-16 font-sans xl:px-[240px]">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[28px] font-semibold leading-9">Ahoy, Raymart!</h1>
        <h2 className="text-txt-secondary">
          {"Welcome back! We're thrilled you're here!"}
        </h2>
      </div>
     
      <div className="flex h-full w-full justify-between mb-10">
        <div className="mb-10 flex w-3/5 flex-col gap-7 h-fit">
         
        </div>

        <div className="w-1/3">
          <CreateForm />
        </div>
      </div>
    </main>
  );
}
