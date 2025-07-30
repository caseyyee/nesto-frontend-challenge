import { ReactNode } from "react";
import { Heading } from "./Heading";
import { Text } from "./Text";

interface ErrorLayoutProps {
  title: string;
  message?: string;
  error?: Error | unknown;
  children?: ReactNode;
}

export function ErrorLayout({ title, message, error, children }: ErrorLayoutProps) {
  const errorMessage = error instanceof Error ? error.message : message || "Unknown error";

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-center space-y-4 min-h-90 flex flex-col items-center justify-center">
      <Heading level={2}>{title}</Heading>
      <Text size="xl">{errorMessage}</Text>
      {children}
    </div>
  );
}