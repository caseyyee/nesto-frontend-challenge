import { ReactNode, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-baby-blue disabled:text-navy-blue/50 disabled:cursor-not-allowed whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "px-8 py-3 bg-yellow text-xl font-bold text-navy-blue hover:bg-orange hover:text-white focus:ring-navy-blue",
        secondary:
          "font-bold bg-navy-blue text-white hover:bg-orange hover:text-white focus:ring-navy-blue",
        tertiary: "font-bold text-navy-blue hover:text-orange underline",
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
