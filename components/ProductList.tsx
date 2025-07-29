"use client";

import type { Product } from "@/types/nesto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { ProductCard } from "./ProductCard";
import { ProductListItem } from "./ProductListItem";

interface ProductListProps {
  variable: Product[];
  fixed: Product[];
}

export function ProductList({ variable, fixed }: ProductListProps) {
  const [showMoreVariable, setShowMoreVariable] = useState(false);
  const [showMoreFixed, setShowMoreFixed] = useState(false);
  const router = useRouter();
  const t = useTranslations("ProductList");

  const [bestVariable, ...restVariable] = variable;
  const [bestFixed, ...restFixed] = fixed;

  const createApplicationMutation = useMutation({
    mutationFn: api.createApplication,
    onSuccess: (application) => {
      router.push(`/application/${application.id}`);
    },
    onError: (error) => {
      console.error(t("createApplicationError"), error);
    },
  });

  const handleSelectProduct = (productId: number) => {
    createApplicationMutation.mutate({ productId });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:w-5/6 mx-auto">
      <div className="p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2}>{t("bestVariable")}</Heading>
        {bestVariable && (
          <ProductCard
            product={bestVariable}
            onSelectProduct={handleSelectProduct}
            isLoading={createApplicationMutation.isPending}
          />
        )}

        {restVariable.length > 0 && showMoreVariable && (
          <>
            <Heading level={3}>{t("variableRates")}</Heading>
            <div className="w-full grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border rounded-4xl bg-baby-blue">
              {restVariable.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onSelectProduct={handleSelectProduct}
                  isLoading={createApplicationMutation.isPending}
                />
              ))}
            </div>
          </>
        )}

        {restVariable.length > 0 && !showMoreVariable && (
          <Button
            onClick={() => setShowMoreVariable(!showMoreVariable)}
            variant="tertiary"
          >
            {t("moreVariable", { count: restVariable.length })}
          </Button>
        )}
      </div>

      <div className="p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2}>{t("bestFixed")}</Heading>
        {bestFixed && (
          <ProductCard
            product={bestFixed}
            onSelectProduct={handleSelectProduct}
            isLoading={createApplicationMutation.isPending}
          />
        )}

        {restFixed.length > 0 && showMoreFixed && (
          <>
            <Heading level={3}>{t("fixedRates")}</Heading>
            <div className="w-full grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border rounded-4xl bg-baby-blue">
              {restFixed.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onSelectProduct={handleSelectProduct}
                  isLoading={createApplicationMutation.isPending}
                />
              ))}
            </div>
          </>
        )}

        {restFixed.length > 0 && !showMoreFixed && (
          <Button
            onClick={() => setShowMoreFixed(!showMoreFixed)}
            variant="tertiary"
          >
            {t("moreFixed", { count: restFixed.length })}
          </Button>
        )}
      </div>
    </div>
  );
}
