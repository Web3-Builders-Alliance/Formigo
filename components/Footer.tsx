import Image from "next/image";

function Footer() {
  return (
    <div className="flex w-full flex-row items-center justify-center xs:h-24 sm:h-36">
      <div className="flex flex-row items-center justify-center">
        <Image
          src="/formigo_logo.png"
          alt="formigo logo full"
          width={40}
          height={30}
          className=""
        />
        <div className="font-bold text-formigo-blue xs:text-xl sm:text-4xl">
          ormigo
        </div>
      </div>
    </div>
  );
}

export default Footer;
