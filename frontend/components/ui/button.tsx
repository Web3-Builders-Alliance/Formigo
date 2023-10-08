import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex  items-center justify-center rounded-md transition-colors font-sans font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-btn-primary text-primary-foreground shadow hover:bg-btn-primary-hover ",
        outline:
          "border text-txt-secondary bg-transparent shadow-sm hover:bg-btn-secondary hover:text-txt",
        secondary:
          "bg-btn-secondary border-border border text-txt-secondary- shadow-sm hover:bg-btn-secondary/80 hover:text-txt",
        ghost: "text-txt-secondary hover:bg-btn-secondary hover:text-txt",
        "ghost-active": "bg-btn-secondary text-txt",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "px-2 py-1.5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
