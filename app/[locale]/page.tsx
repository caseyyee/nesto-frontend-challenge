import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { fetchProductsServer } from "@/lib/server-api";
import { getBestProducts } from "@/lib/product-utils";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import { ProductList } from "@/components/ProductList";
import { Heading } from "@/components/Heading";
import { PageHeader } from "@/components/PageHeader";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <>
      <PageHeader />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Heading level={1} className="text-center my-8 max-w-2xl mx-auto">
          {t("title")}
        </Heading>

        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsServer />
        </Suspense>
      </div>
    </>
  );
}

async function ProductsServer() {
  try {
    const products = await fetchProductsServer();
    const { variable, fixed } = getBestProducts(products);

    return <ProductList variable={variable} fixed={fixed} />;
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <div className="text-red-600">
        <p>Error loading products. Please try again later.</p>
        <p className="text-sm">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}
