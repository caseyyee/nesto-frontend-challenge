"use client";

import { useCreateApplication } from "@/hooks/useCreateApplication";
import type { Product } from "@/types/nesto";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BestProductCard } from "./BestProductCard";
import { Button } from "./Button";
import { ErrorLayout } from "./ErrorLayout";
import { ProductCard } from "./ProductCard";
import { ProductListSection } from "./ProductListSection";

interface ProductListProps {
  variable: Product[];
  fixed: Product[];
}

export function ProductList({ variable, fixed }: ProductListProps) {
  const [showMoreVariable, setShowMoreVariable] = useState(false);
  const [showMoreFixed, setShowMoreFixed] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const t = useTranslations("ProductList");

  const [bestVariable, ...restVariable] = variable;
  const [bestFixed, ...restFixed] = fixed;

  const { createApplication, isPending } = useCreateApplication({
    onSuccess: (application) => {
      setError(null);
      router.push(`/application/${application.id}`);
    },
    onError: (error) => {
      console.error(t("createApplicationError"), error);
      setError(error);
      setSelectedProductId(null);
    },
  });

  const handleSelectProduct = (productId: number) => {
    setError(null);
    setSelectedProductId(productId);
    createApplication(productId);
  };

  if (error) {
    return <ErrorLayout title={t("createApplicationError")} error={error} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="p-4 rounded-lg flex flex-col gap-4 md:gap-8 items-center">
        {bestVariable && (
          <BestProductCard
            title={t("bestVariable")}
            startIcon={<StarIcon className="w-6 h-6 text-white" />}
          >
            <ProductCard
              variant="best"
              product={bestVariable}
              onSelectProduct={handleSelectProduct}
              isLoading={isPending && selectedProductId === bestVariable.id}
            />
          </BestProductCard>
        )}

        {restVariable.length > 0 && showMoreVariable && (
          <ProductListSection title={t("variableRates")}>
            {restVariable.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={handleSelectProduct}
                isLoading={isPending && selectedProductId === product.id}
              />
            ))}
          </ProductListSection>
        )}

        {restVariable.length > 0 && !showMoreVariable && (
          <Button
            onClick={() => setShowMoreVariable(!showMoreVariable)}
            variant="tertiary"
            endIcon={<ArrowRightIcon className="w-4 h-4" />}
          >
            {t("moreVariable", { count: restVariable.length })}
          </Button>
        )}
      </div>

      <div className="p-4 rounded-lg flex flex-col gap-4 md:gap-8 items-center">
        {bestFixed && (
          <BestProductCard
            title={t("bestFixed")}
            startIcon={<StarIcon className="w-6 h-6 text-white" />}
          >
            <ProductCard
              variant="best"
              product={bestFixed}
              onSelectProduct={handleSelectProduct}
              isLoading={isPending && selectedProductId === bestFixed.id}
            />
          </BestProductCard>
        )}

        {restFixed.length > 0 && showMoreFixed && (
          <ProductListSection title={t("fixedRates")}>
            {restFixed.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={handleSelectProduct}
                isLoading={isPending && selectedProductId === product.id}
              />
            ))}
          </ProductListSection>
        )}

        {restFixed.length > 0 && !showMoreFixed && (
          <Button
            onClick={() => setShowMoreFixed(!showMoreFixed)}
            variant="tertiary"
            endIcon={<ArrowRightIcon className="w-4 h-4" />}
          >
            {t("moreFixed", { count: restFixed.length })}
          </Button>
        )}
      </div>
    </div>
  );
}
