import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-full border-2 border-transparent whitespace-nowrap transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:border-navy-blue/40 disabled:bg-baby-blue disabled:text-navy-blue/40",
  {
    variants: {
      variant: {
        primary:
          "bg-yellow px-8 py-3 text-xl font-bold text-navy-blue hover:bg-orange hover:text-white focus:ring-navy-blue",
        secondary:
          "bg-navy-blue font-bold text-white hover:bg-orange hover:text-white focus:ring-navy-blue",
        tertiary: "font-bold text-navy-blue underline hover:text-orange",
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
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Button({
  children,
  variant,
  size,
  className,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(buttonStyles({ size, variant }), className)}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
}
