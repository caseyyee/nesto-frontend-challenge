import { ReactNode, HTMLAttributes } from "react";
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
      "5xl": "text-4xl md:text-6xl",
      "6xl": "text-5xl md:text-7xl",
      "7xl": "text-6xl md:text-8xl",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

interface TextProps extends VariantProps<typeof textStyles>, Omit<HTMLAttributes<HTMLElement>, 'className'> {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

export function Text({
  children,
  as: Component = "p",
  size,
  className,
  ...props
}: TextProps) {
  return (
    <Component className={textStyles({ size, className })} {...props}>
      {children}
    </Component>
  );
}
