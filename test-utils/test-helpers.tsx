import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestI18nProvider } from "./TestI18nProvider";

// Test wrapper with React Query provider and i18n
export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <TestI18nProvider>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </TestI18nProvider>,
  );
};