type Props = {
  text: string;
};

export default function BlankCard({ text }: Props) {
  return (
    <div className="flex h-[135px] w-full items-center justify-center rounded-md bg-card">
      <p className='text-base font-medium text-txt-secondary'>{text}</p>
    </div>
  );
}
