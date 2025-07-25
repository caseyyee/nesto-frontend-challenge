"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { data: products, isLoading, error } = useProducts();

  useEffect(() => {
    if (products) {
      console.log("Products:", products);
    }
  }, [products]);

  if (isLoading) return <div>Loading products...</div>;

  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>
      <p>Found {products?.length} products (check console for details)</p>
    </div>
  );
}
