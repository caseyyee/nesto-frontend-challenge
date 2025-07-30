import { Heading } from "@/components/Heading";
import { ProductList } from "@/components/ProductList";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import { ErrorLayout } from "@/components/ErrorLayout";
import { getBestProducts } from "@/lib/product-utils";
import { fetchProductsServer } from "@/lib/server-api";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
      <Heading level={1} className="text-center px-4 my-8 max-w-2xl mx-auto">
        {t("title")}
      </Heading>

      <Suspense fallback={<ProductsLoadingSkeleton />}>
        <ProductsServer />
      </Suspense>
    </div>
  );
}

async function ProductsServer() {
  try {
    const products = await fetchProductsServer();
    const { variable, fixed } = getBestProducts(products);

    return <ProductList variable={variable} fixed={fixed} />;
  } catch (error) {
    console.error("Error loading products:", error);
    return <ErrorLayout title="Error loading products:" error={error} />;
  }
}
