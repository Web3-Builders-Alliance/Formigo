function Landing() {
  return (
    <div className="grid h-full grid-flow-col gap-8 pt-4 pb-4 xs:grid-cols-1 xs:grid-rows-1 xs:pt-36 lg:w-5/6 lg:grid-cols-6 lg:grid-rows-6 lg:pt-8">
      <div className="col-span-3 row-span-3 flex w-full flex-col justify-around xs:h-4/6  xs:items-center lg:h-full lg:items-start">
        <h3 className="xs:p-4 lg:pt-4 lg:pb-4 lg:pl-0 lg:pr-0 font-bold xs:text-center xs:text-5xl xs:max-w-md lg:max-w-3xl lg:text-left lg:text-6xl">
          Crafting Survey Forms With Flair
        </h3>
        <p className="xs:text-md xs:max-w-lg lg:max-w-2xl xs:p-4 lg:pt-4 lg:pb-4 lg:pl-0 lg:pr-0 mb-4 xs:text-center sm:text-2xl lg:text-left">
          Level up your data game with web2 flair and web3
          innovation--collecting sign-ups, feedback and surveys made fun!
        </p>
        <button className="w-1/3 min-w-fit hover:brightness-110 rounded-xl bg-formigo-blue text-xl text-white xs:p-3 xs:text-lg">
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
