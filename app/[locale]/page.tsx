import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { fetchProductsServer } from "@/lib/server-api";
import { getBestProducts } from "@/lib/product-utils";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import { ProductList } from "@/components/ProductList";
import { Heading } from "@/components/Heading";
import { PageHeader } from "@/components/PageHeader";
import clsx from "clsx";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className={clsx("flex-1 relative")}>
      <div className="absolute inset-0 bg-baby-blue overflow-hidden">
        <div className="absolute w-full h-[900px] top-[-300px] lg:h-[1600px] lg:top-[-550px] [background-image:radial-gradient(circle_at_center_center,white,#c5d3e8),repeating-radial-gradient(circle_at_center_center,transparent,transparent,80px,#dae3f0_100px,#dae3f0_100px)] lg:[background-image:radial-gradient(circle_at_center_center,white,#c5d3e8),repeating-radial-gradient(circle_at_center_center,transparent,transparent,160px,#dae3f0_200px,#dae3f0_200px)] [background-blend-mode:multiply]" />
        <div className="absolute w-full h-[800px] lg:h-[1600px] top-0 [background-image:radial-gradient(circle_at_center_center,transparent_40%,var(--color-baby-blue)_70%)]" />
        <div className="absolute w-full h-[600px] top-[100px] lg:h-[800px] lg:top-[300px] [background-image:linear-gradient(to_bottom,transparent,transparent_50%,var(--color-baby-blue)_80%)]" />
      </div>

      <div className="relative">
        <PageHeader />

        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          <Heading
            level={1}
            className="text-center px-4 my-8 max-w-2xl mx-auto"
          >
            {t("title")}
          </Heading>

          <Suspense fallback={<ProductsLoadingSkeleton />}>
            <ProductsServer />
          </Suspense>
        </div>
      </div>
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
