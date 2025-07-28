import { ReactNode, createElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const headingStyles = cva("", {
  variants: {
    variant: {
      hero: "font-bold text-4xl md:text-5xl lg:text-7xl",
      title: "font-bold text-xl md:text-2xl lg:text-4xl",
      subtitle: "font-bold text-lg md:text-xl lg:text-2xl",
      body: "text-base md:text-lg",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

// Default variant mapping for heading levels
const defaultVariantByLevel = {
  1: "hero",
  2: "title",
  3: "subtitle",
  4: "subtitle",
  5: "body",
  6: "body",
} as const;

interface HeadingProps extends VariantProps<typeof headingStyles> {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Heading({ children, level, variant, className }: HeadingProps) {
  const tagName = `h${level}` as const;
  const resolvedVariant = variant || defaultVariantByLevel[level];

  return createElement(
    tagName,
    {
      className: headingStyles({ variant: resolvedVariant, className }),
    },
    children,
  );
}
