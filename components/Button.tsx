import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-navy-blue text-white hover:bg-opacity-90 focus:ring-navy-blue",
        secondary:
          "border border-navy-blue text-navy-blue hover:bg-navy-blue hover:text-white focus:ring-navy-blue",
        // ghost: "text-navy-blue hover:bg-navy-blue hover:bg-opacity-10 focus:ring-navy-blue",
      },
      size: {
        // sm: "px-3 py-1.5 text-sm",
        base: "px-4 py-2 text-base",
        // lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: ReactNode;
  className?: string;
}

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
