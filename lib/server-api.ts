import { ProductsSchema } from "@/types/nesto";
import { DEFAULT_HEADERS } from "@/lib/constants";

const API_BASE_URL = process.env.NESTO_API;

export async function fetchProductsServer() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      next: { revalidate: 300 }, // 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Validate with Zod schema
    return ProductsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
