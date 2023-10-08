import DividerText from "@/components/divider-text";
import MagicInput from "@/components/magic-input";
import PhatomButton from "@/components/phantom-button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center font-sans">
      <div className="flex flex-col h-fit w-2/5 bg-card rounded-md px-[70px] py-[48px]">
        <div className="flex">
          <Image
            src="/formigo_logo_white.png"
            width={36}
            height={0}
            className="mr-2"
            alt="Formigo Logo"
          />
          <h1 className="font-serif text-2xl font-semibold">Formigo</h1>
        </div>
        <p className="text-txt-secondary text-base font-medium mt-6 text-left">
          In order to use Formigo you are required to sign in by selecting from
          the available login methods below.
        </p>
        <div className="mt-6 w-full">
          <MagicInput />
        </div>
        <DividerText label="or" />
        <div className="w-full">
          <PhatomButton className="w-full" />
        </div>
      </div>
    </main>
  );
}
