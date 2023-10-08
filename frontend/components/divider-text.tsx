export default function DividerText({ label }: { label: string }) {
  return (
    <div className="relative w-full flex py-5 items-center font-sans">
      <div className="flex-grow border-t border-txt-secondary"></div>
      <span className="flex-shrink mx-4 text-txt-secondary">{label}</span>
      <div className="flex-grow border-t border-txt-secondary"></div>
    </div>
  );
}
