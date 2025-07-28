import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const textStyles = cva("", {
  variants: {
    size: {
      // sizes shifted up to match nesto theme
      xs: "text-sm",
      sm: "text-base",
      base: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
      "2xl": "text-3xl",
      "3xl": "text-4xl",
      "4xl": "text-5xl",
      "5xl": "text-6xl",
      "6xl": "text-7xl",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

interface TextProps extends VariantProps<typeof textStyles> {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

export function Text({
  children,
  as: Component = "p",
  size,
  className,
}: TextProps) {
  return (
    <Component className={textStyles({ size, className })}>
      {children}
    </Component>
  );
}
