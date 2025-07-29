import { ReactNode, LabelHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const fieldLabelStyles = cva("block font-semibold text-navy-blue", {
  variants: {
    size: {
      base: "mb-2 ml-2",
    },
    variant: {
      default: "text-navy-blue",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "default",
  },
});

interface FieldLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof fieldLabelStyles> {
  children: ReactNode;
}

export function FieldLabel({
  children,
  size,
  variant,

  className,
  ...props
}: FieldLabelProps) {
  return (
    <label
      className={clsx(fieldLabelStyles({ size, variant }), className)}
      {...props}
    >
      {children}
    </label>
  );
}
