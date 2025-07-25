import { expect, test, describe } from "vitest";
import { getBestProductsByType, getBestProducts } from "./product-utils";
import type { Product } from "@/types/nesto";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Variable Rate Product 1",
    family: "VALUE_FLEX",
    type: "VARIABLE",
    term: "5_YEAR",
    insurable: true,
    insurance: "INSURED",
    prepaymentOption: "STANDARD",
    restrictionsOption: "NO_RESTRICTIONS",
    restrictions: "",
    fixedPenaltySpread: "0.5",
    helocOption: "HELOC_WITH",
    helocDelta: 0.1,
    lenderName: "Lender A",
    lenderType: "Bank",
    rateHold: "60_DAYS",
    rate: 3.5,
    ratePrimeVariance: 0.5,
    bestRate: 3.2,
    created: "2024-01-01",
    updated: "2024-01-01",
  },
  {
    id: 2,
    name: "Fixed Rate Product 1",
    family: "STANDARD",
    type: "FIXED",
    term: "3_YEAR",
    insurable: false,
    insurance: "CONVENTIONAL",
    prepaymentOption: "ENHANCED",
    restrictionsOption: "SOME_RESTRICTIONS",
    restrictions: "Some restrictions apply",
    fixedPenaltySpread: "1.0",
    helocOption: "HELOC_WITHOUT",
    helocDelta: 0,
    lenderName: "Lender B",
    lenderType: "Credit Union",
    rateHold: "90_DAYS",
    rate: 4.2,
    ratePrimeVariance: 0,
    bestRate: 4.0,
    created: "2024-01-01",
    updated: "2024-01-01",
  },
  {
    id: 3,
    name: "Variable Rate Product 2",
    family: "VALUE_FLEX",
    type: "VARIABLE",
    term: "1_YEAR",
    insurable: true,
    insurance: "INSURED",
    prepaymentOption: "HELOC",
    restrictionsOption: "MORE_RESTRICTIONS",
    restrictions: "More restrictions",
    fixedPenaltySpread: "0.75",
    helocOption: "HELOC_WITH",
    helocDelta: 0.2,
    lenderName: "Lender C",
    lenderType: "Bank",
    rateHold: "30_DAYS",
    rate: 2.8,
    ratePrimeVariance: 0.3,
    bestRate: 2.5,
    created: "2024-01-01",
    updated: "2024-01-01",
  },
  {
    id: 4,
    name: "Fixed Rate Product 2",
    family: "STANDARD",
    type: "FIXED",
    term: "7_YEAR",
    insurable: false,
    insurance: "CONVENTIONAL",
    prepaymentOption: "STANDARD",
    restrictionsOption: "NO_RESTRICTIONS",
    restrictions: "",
    fixedPenaltySpread: "1.25",
    helocOption: "HELOC_WITHOUT",
    helocDelta: 0,
    lenderName: "Lender D",
    lenderType: "Bank",
    rateHold: "120_DAYS",
    rate: 4.8,
    ratePrimeVariance: 0,
    bestRate: 4.5,
    created: "2024-01-01",
    updated: "2024-01-01",
  },
];

describe("getBestProductsByType", () => {
  test("filters and sorts VARIABLE products by bestRate", () => {
    const result = getBestProductsByType(mockProducts, "VARIABLE");

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("VARIABLE");
    expect(result[1].type).toBe("VARIABLE");

    // Should be sorted by bestRate ascending (2.5, 3.2)
    expect(result[0].bestRate).toBe(2.5);
    expect(result[1].bestRate).toBe(3.2);
    expect(result[0].id).toBe(3);
    expect(result[1].id).toBe(1);
  });

  test("filters and sorts FIXED products by bestRate", () => {
    const result = getBestProductsByType(mockProducts, "FIXED");

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("FIXED");
    expect(result[1].type).toBe("FIXED");

    // Should be sorted by bestRate ascending (4.0, 4.5)
    expect(result[0].bestRate).toBe(4.0);
    expect(result[1].bestRate).toBe(4.5);
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(4);
  });

  test("returns empty array when no products match type", () => {
    const emptyProducts: Product[] = [];
    const result = getBestProductsByType(emptyProducts, "VARIABLE");

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  test("returns empty array when no products of specified type exist", () => {
    const fixedOnlyProducts = mockProducts.filter((p) => p.type === "FIXED");
    const result = getBestProductsByType(fixedOnlyProducts, "VARIABLE");

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});

describe("getBestProducts", () => {
  test("returns both variable and fixed products correctly structured", () => {
    const result = getBestProducts(mockProducts);

    expect(result).toHaveProperty("variable");
    expect(result).toHaveProperty("fixed");

    expect(result.variable).toHaveLength(2);
    expect(result.fixed).toHaveLength(2);

    // Variable products should be sorted by bestRate
    expect(result.variable[0].bestRate).toBe(2.5);
    expect(result.variable[1].bestRate).toBe(3.2);

    // Fixed products should be sorted by bestRate
    expect(result.fixed[0].bestRate).toBe(4.0);
    expect(result.fixed[1].bestRate).toBe(4.5);
  });

  test("handles empty product array", () => {
    const result = getBestProducts([]);

    expect(result.variable).toHaveLength(0);
    expect(result.fixed).toHaveLength(0);
    expect(result.variable).toEqual([]);
    expect(result.fixed).toEqual([]);
  });

  test("handles products with only one type", () => {
    const variableOnlyProducts = mockProducts.filter(
      (p) => p.type === "VARIABLE",
    );
    const result = getBestProducts(variableOnlyProducts);

    expect(result.variable).toHaveLength(2);
    expect(result.fixed).toHaveLength(0);
    expect(result.fixed).toEqual([]);
  });
});
