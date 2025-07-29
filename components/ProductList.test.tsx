import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductList } from "./ProductList";
import { mockProducts } from "@/test-utils/mocks/products";
import type { Product } from "@/types/nesto";
import { api } from "@/lib/api";
import { TestI18nProvider } from "@/test-utils";
import messages from "@/messages/en.json";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock API
vi.mock("@/lib/api", () => ({
  api: {
    createApplication: vi.fn(),
  },
}));

// Test wrapper with React Query provider and i18n
const renderWithWrapper = (ui: React.ReactElement) => {
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

describe("ProductList", () => {
  const variableProducts: Product[] = mockProducts.filter(
    (p) => p.type === "VARIABLE",
  );
  const fixedProducts: Product[] = mockProducts.filter(
    (p) => p.type === "FIXED",
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const mockCreateApplication = vi.mocked(api.createApplication);

  describe("Rendering", () => {
    it("renders best variable and fixed products", () => {
      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      expect(
        screen.getByText(messages.ProductList.bestVariable),
      ).toBeInTheDocument();
      expect(
        screen.getByText(messages.ProductList.bestFixed),
      ).toBeInTheDocument();

      // Should show the first (best) product of each type
      expect(
        screen.getByText(variableProducts[0].lenderName),
      ).toBeInTheDocument();
      expect(screen.getByText(fixedProducts[0].lenderName)).toBeInTheDocument();
    });

    it("handles empty product lists gracefully", () => {
      renderWithWrapper(<ProductList variable={[]} fixed={[]} />);

      // Should not show best product cards when no products
      expect(
        screen.queryByText(messages.ProductList.bestVariable),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(messages.ProductList.bestFixed),
      ).not.toBeInTheDocument();

      // Should not show buttons when no additional products
      expect(
        screen.queryByText(
          messages.ProductList.moreVariable.replace("{count}", "1"),
        ),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(
          messages.ProductList.moreFixed.replace("{count}", "1"),
        ),
      ).not.toBeInTheDocument();
    });
  });

  describe("Show More Functionality", () => {
    it("shows and expands variable products", async () => {
      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      // Should show "more variable" button
      const moreVariableButton = screen.getByRole("button", {
        name: messages.ProductList.moreVariable.replace("{count}", "1"),
      });
      expect(moreVariableButton).toBeInTheDocument();

      // Click to expand
      fireEvent.click(moreVariableButton);

      // Should show additional variable products section
      expect(
        screen.getByText(messages.ProductList.variableRates),
      ).toBeInTheDocument();

      // Should show all variable products except the first one
      variableProducts.slice(1).forEach((product) => {
        expect(screen.getByText(product.lenderName)).toBeInTheDocument();
      });
    });

    it("shows and expands fixed products", async () => {
      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      // Should show "more fixed" button
      const moreFixedButton = screen.getByRole("button", {
        name: messages.ProductList.moreFixed.replace("{count}", "1"),
      });
      expect(moreFixedButton).toBeInTheDocument();

      // Click to expand
      fireEvent.click(moreFixedButton);

      // Should show additional fixed products section
      expect(
        screen.getByText(messages.ProductList.fixedRates),
      ).toBeInTheDocument();

      // Should show all fixed products except the first one
      fixedProducts.slice(1).forEach((product) => {
        expect(screen.getByText(product.lenderName)).toBeInTheDocument();
      });
    });
  });

  describe("Product Selection", () => {
    it("creates application and navigates on product selection", async () => {
      const mockApplication = {
        id: "app-123",
        type: "NEW" as const,
        applicants: [],
        createdAt: "2024-01-01",
      };
      mockCreateApplication.mockResolvedValue(mockApplication);

      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      // Click select button on the first variable product
      const selectButtons = screen.getAllByText(
        messages.ProductList.selectProduct,
      );
      fireEvent.click(selectButtons[0]);

      // Wait for API call to be made
      await waitFor(() => {
        expect(mockCreateApplication).toHaveBeenCalledWith({
          productId: variableProducts[0].id,
        });
      });

      // Should navigate to application page
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(
          `/application/${mockApplication.id}`,
        );
      });
    });

    it("shows loading state during application creation", async () => {
      let resolvePromise: (value: unknown) => void;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      mockCreateApplication.mockReturnValue(
        pendingPromise as ReturnType<typeof api.createApplication>,
      );

      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      // Click select button
      const selectButtons = screen.getAllByText(
        messages.ProductList.selectProduct,
      );
      fireEvent.click(selectButtons[0]);

      // Should show loading text
      await waitFor(() => {
        expect(
          screen.getAllByText(messages.ProductList.creatingApplication).length,
        ).toBeGreaterThan(0);
      });

      // All select buttons should be disabled during loading
      const allButtons = screen.getAllByRole("button");
      const disabledButtons = allButtons.filter(
        (button) =>
          button.textContent?.includes(
            messages.ProductList.creatingApplication,
          ) || button.textContent?.includes(messages.ProductList.selectProduct),
      );

      disabledButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Resolve the promise to clean up
      resolvePromise!({
        id: "app-123",
        type: "NEW" as const,
        applicants: [],
        createdAt: "2024-01-01",
      });
    });

    it("handles API errors gracefully", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockCreateApplication.mockRejectedValue(new Error("API Error"));

      renderWithWrapper(
        <ProductList variable={variableProducts} fixed={fixedProducts} />,
      );

      // Click select button
      const selectButtons = screen.getAllByText(
        messages.ProductList.selectProduct,
      );
      fireEvent.click(selectButtons[0]);

      // Should log error
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          messages.ProductList.createApplicationError,
          expect.any(Error),
        );
      });

      // Should not navigate
      expect(mockPush).not.toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });
});
