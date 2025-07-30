import { ReactNode, HTMLAttributes } from "react";
import { Text } from "./Text";

interface ErrorLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  error?: {
    message?: string;
  };
  children?: ReactNode;
}

export function ErrorLabel({ error, children, ...props }: ErrorLabelProps) {
  if (!error?.message && !children) {
    return null;
  }

  return (
    <Text size="sm" className="text-orange mt-2 ml-2 font-semibold" {...props}>
      {error?.message || children}
    </Text>
  );
}
