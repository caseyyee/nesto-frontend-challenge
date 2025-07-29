import { DEFAULT_HEADERS } from "@/lib/constants";
import {
  ApplicationSchema,
  ApplicationsSchema,
  ProductsSchema,
} from "@/types/nesto";

const API_BASE_URL = process.env.NEXT_PUBLIC_NESTO_API;

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

export async function fetchProductServer(id: number) {
  try {
    const products = await fetchProductsServer();
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function fetchApplicationsServer() {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      next: {
        revalidate: 300, // 5 minutes
        tags: ["applications"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch applications: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Validate with Zod schema
    return ApplicationsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
}

export async function fetchApplicationServer(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      next: { revalidate: 300 }, // 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch application: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Validate with Zod schema
    return ApplicationSchema.parse(data);
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
}
