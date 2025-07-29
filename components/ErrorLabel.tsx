import { ReactNode } from "react";
import { Text } from "./Text";

interface ErrorLabelProps {
  error?: {
    message?: string;
  };
  children?: ReactNode;
}

export function ErrorLabel({ error, children }: ErrorLabelProps) {
  if (!error?.message && !children) {
    return null;
  }

  return (
    <Text size="sm" className="text-orange mt-2 ml-2 font-semibold">
      {error?.message || children}
    </Text>
  );
}
