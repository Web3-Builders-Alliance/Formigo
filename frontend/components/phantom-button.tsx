import PhantomIcon from "./icons/phantom";
import { Button } from "./ui/button";

export default function PhatomButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button variant="outline" className={className} onClick={onClick}>
      <PhantomIcon className="w-5 h-4 mr-2" />
      Phantom wallet
    </Button>
  );
}
