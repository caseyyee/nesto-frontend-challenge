import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { fetchProductsServer } from "@/lib/server-api";
import { getBestProducts } from "@/lib/product-utils";
import ProductsLoadingSkeleton from "@/components/ProductsLoadingSkeleton";
import Image from "next/image";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div>
      <Link href="https://www.nesto.ca/" target="_blank">
        <Image
          src={`/logo-nesto-en.svg`}
          alt={`Logo`}
          width={231}
          height={101}
        />
      </Link>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>

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

    return (
      <div>
        <p>
          Found {products.length} products ({variable.length} variable,{" "}
          {fixed.length} fixed)
        </p>
        <div>
          <h2>Variable Rate Products</h2>
          {variable.map((product) => (
            <div key={product.id} className="border p-4 mb-2">
              <h3>{product.name}</h3>
              <p>Rate: {product.bestRate}%</p>
              <p>Term: {product.term}</p>
            </div>
          ))}
        </div>
        <div>
          <h2>Fixed Rate Products</h2>
          {fixed.map((product) => (
            <div key={product.id} className="border p-4 mb-2">
              <h3>{product.name}</h3>
              <p>Rate: {product.bestRate}%</p>
              <p>Term: {product.term}</p>
            </div>
          ))}
        </div>
      </div>
    );
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
