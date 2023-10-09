export default function CarbonViewFilled({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='56'
      height='56'
      viewBox='0 0 32 32'
    >
      <circle cx='16' cy='16' r='4' fill='#27b973' />
      <path
        fill='#27b973'
        d='M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z'
      />
    </svg>
  );
}
