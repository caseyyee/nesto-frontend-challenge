import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestI18nProvider } from "./TestI18nProvider";
import React from "react";

// Create a new QueryClient for tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// Test wrapper with React Query provider and i18n
export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <TestI18nProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </TestI18nProvider>,
  );
};

// Test wrapper for hooks with React Query provider
export const createWrapper = () => {
  const queryClient = createTestQueryClient();

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
