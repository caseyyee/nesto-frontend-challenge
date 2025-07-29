import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-baby-blue disabled:text-navy-blue/50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-yellow font-bold text-navy-blue hover:bg-navy-blue hover:text-white focus:ring-navy-blue",
        secondary:
          "font-bold bg-navy-blue text-white hover:bg-navy-blue hover:text-white focus:ring-navy-blue",
        tertiary: "font-bold text-navy-blue underline hover:bg-gray-200",
      },
      size: {
        base: "px-4 py-2 text-base",
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
