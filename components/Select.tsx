import { SelectHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const selectStyles = cva(
  "w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none ring-1 focus:ring-2 focus:ring-offset-2 bg-white appearance-none",
  {
    variants: {
      variant: {
        default: "border-navy-blue focus:ring-navy-blue",
        error: "ring-orange border-orange focus:ring-orange",
        // success: "border-green-500 focus:ring-green-500",
      },
      size: {
        // sm: "px-2 py-1 text-sm",
        base: "px-3 py-3 text-base",
        // lg: "px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
    },
  },
);

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectStyles> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={clsx(selectStyles({ variant, size }), className)}
          {...props}
        >
          {children}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy-blue pointer-events-none" />
      </div>
    );
  },
);

Select.displayName = "Select";
