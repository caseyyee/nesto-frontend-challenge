import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import { ProductCard, termLabels } from "./ProductCard";
import { mockProducts, createMockProduct } from "@/test-utils/mocks/products";
import { renderWithProviders } from "@/test-utils";
import messages from "@/messages/en.json";

// Import the termType object (it's not exported, so we'll recreate it)
const termType = {
  VARIABLE: "variable",
  FIXED: "fixed",
};

describe("ProductCard", () => {
  const mockOnSelectProduct = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders product information correctly", () => {
      const product = mockProducts[0]; // Variable product
      renderWithProviders(
        <ProductCard product={product} onSelectProduct={mockOnSelectProduct} />,
      );

      // Should show term and type using the actual component mappings
      const expectedTermType = `${termLabels[product.term]} ${
        termType[product.type]
      }`;
      expect(screen.getByText(expectedTermType)).toBeInTheDocument();

      // Should show best rate with percentage
      expect(screen.getByText(product.bestRate.toString())).toBeInTheDocument();
      expect(screen.getByText("%")).toBeInTheDocument();

      // Should show lender name
      expect(screen.getByText(product.lenderName)).toBeInTheDocument();

      // Should show product name
      expect(screen.getByText(product.name)).toBeInTheDocument();

      // Should show select button
      expect(
        screen.getByText(messages.ProductList.selectProduct),
      ).toBeInTheDocument();
    });

    it("renders different term labels correctly", () => {
      const oneYearProduct = createMockProduct({
        term: "1_YEAR",
        type: "FIXED",
      });
      renderWithProviders(<ProductCard product={oneYearProduct} />);

      // Use actual component mappings
      const expectedTermType = `${termLabels[oneYearProduct.term]} ${
        termType[oneYearProduct.type]
      }`;
      expect(screen.getByText(expectedTermType)).toBeInTheDocument();
    });
  });

  describe("Variant Styling", () => {
    it("renders with base variant (default)", () => {
      const product = mockProducts[0];
      renderWithProviders(
        <ProductCard product={product} onSelectProduct={mockOnSelectProduct} />,
      );

      // Button should be secondary variant for base
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "secondary"); // Secondary button styling
    });

    it("renders with best variant", () => {
      const product = mockProducts[0];
      renderWithProviders(
        <ProductCard
          product={product}
          variant="best"
          onSelectProduct={mockOnSelectProduct}
        />,
      );

      // Button should be primary variant for best
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("data-variant", "primary"); // Primary button styling
    });
  });

  describe("Lender Display", () => {
    it("shows lender name text ", () => {
      const product = createMockProduct({ lenderName: "ABC Bank" });
      renderWithProviders(<ProductCard product={product} />);

      expect(screen.getByText("ABC Bank")).toBeInTheDocument();
    });
  });

  describe("Button Interactions", () => {
    it("calls onSelectProduct when button is clicked", () => {
      const product = mockProducts[0];
      renderWithProviders(
        <ProductCard product={product} onSelectProduct={mockOnSelectProduct} />,
      );

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(mockOnSelectProduct).toHaveBeenCalledWith(product.id);
    });

    it("does not render button when onSelectProduct is not provided", () => {
      const product = mockProducts[0];
      renderWithProviders(<ProductCard product={product} />);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("disables button when isLoading is true", () => {
      const product = mockProducts[0];
      renderWithProviders(
        <ProductCard
          product={product}
          onSelectProduct={mockOnSelectProduct}
          isLoading={true}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("enables button when isLoading is false", () => {
      const product = mockProducts[0];
      renderWithProviders(
        <ProductCard
          product={product}
          onSelectProduct={mockOnSelectProduct}
          isLoading={false}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeEnabled();
    });
  });
});
