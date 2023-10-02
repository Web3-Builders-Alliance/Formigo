function Landing() {
  return (
    <div className="grid h-full grid-flow-col gap-8 pb-4 pt-4 xs:grid-cols-1 xs:grid-rows-1 xs:pt-36 lg:w-5/6 lg:grid-cols-6 lg:grid-rows-6 lg:pt-8">
      <div className="col-span-3 row-span-3 flex w-full flex-col justify-around xs:h-4/6  xs:items-center lg:h-full lg:items-start">
        <h3 className="font-bold xs:max-w-md xs:p-4 xs:text-center xs:text-5xl lg:max-w-3xl lg:pb-4 lg:pl-0 lg:pr-0 lg:pt-4 lg:text-left lg:text-6xl">
          Crafting Survey Forms With Flair
        </h3>
        <p className="xs:text-md mb-4 xs:max-w-lg xs:p-4 xs:text-center sm:text-2xl lg:max-w-2xl lg:pb-4 lg:pl-0 lg:pr-0 lg:pt-4 lg:text-left">
          Level up your data game with web2 flair and web3
          innovation--collecting sign-ups, feedback and surveys made fun!
        </p>
        <button className="w-1/3 min-w-fit rounded-xl bg-formigo-blue text-xl text-white hover:brightness-110 xs:p-3 xs:text-lg">
          Try for free -&gt;{" "}
        </button>
      </div>
      <div className="col-span-3 row-span-3 rounded-2xl border bg-formigo-grey xs:hidden lg:block"></div>
      <div className="col-span-1 row-span-4 w-full rounded-2xl border-2 bg-formigo-grey xs:hidden lg:block"></div>
      <div className="col-span-3 row-span-2 rounded-2xl border bg-formigo-grey xs:hidden lg:block"></div>
      <div className="col-span-2 row-span-2 w-full rounded-2xl border-2 bg-formigo-grey xs:hidden lg:block"></div>
      <div className="col-span-2 row-span-2 w-full rounded-2xl border-2 bg-formigo-grey xs:hidden lg:block"></div>
    </div>
  );
}

export default Landing;
