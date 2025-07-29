import { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const inputStyles = cva(
  "w-full border rounded-lg px-3 py-2 focus:ring-offset-2 focus:outline-none ring-1 focus:ring-2 bg-white",
  {
    variants: {
      variant: {
        default: "border-navy-blue focus:ring-navy-blue",
        error: "ring-orange border-orange focus:ring-orange",
      },
      size: {
        base: "px-3 py-3 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputStyles> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(inputStyles({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
