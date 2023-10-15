import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-btn-primary/40 rounded-md', className)} {...props} />
  );
}

export { Skeleton };
