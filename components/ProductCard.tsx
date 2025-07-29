import type { Product } from "@/types/nesto";
import { clsx } from "clsx";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";
import { Text } from "./Text";
import { NestoLogo } from "./NestoLogo";

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
  onSelectProduct?: (productId: number) => void;
  isLoading?: boolean;
}

export const termLabels = {
  "1_YEAR": "1-year",
  "2_YEAR": "2-year",
  "3_YEAR": "3-year",
  "4_YEAR": "4-year",
  "5_YEAR": "5-year",
  "6_YEAR": "6-year",
  "7_YEAR": "7-year",
  "10_YEAR": "10-year",
};

const termType = {
  VARIABLE: "variable",
  FIXED: "fixed",
};

export function ProductCard({
  product,
  className,
  onSelectProduct,
  isLoading,
  ...rest
}: ProductCardProps & {
  onSelectProduct?: (productId: number) => void;
  isLoading?: boolean;
}) {
  const t = useTranslations("ProductList");

  return (
    <div
      key={product.id}
      className={clsx(
        // "p-6 rounded-4xl flex flex-col items-center w-full bg-white/60 backdrop-blur-lg shadow-lg",
        "p-6 rounded-3xl flex flex-col items-center w-full bg-white",
        className,
      )}
      {...rest}
    >
      <Text className="font-bold">
        {termLabels[product.term]} {termType[product.type]}
      </Text>

      <div className="flex">
        <Text size={"6xl"} className={clsx("font-extrabold")}>
          {product.bestRate}
        </Text>
        <Text size={"2xl"} className="font-bold">
          %
        </Text>
      </div>

      <div className="mt-4">
        {product.lenderName === "nesto" ? (
          <NestoLogo />
        ) : (
          <Text>{product.lenderName}</Text>
        )}
      </div>

      <Text className="mt-1">{product.name}</Text>

      {onSelectProduct && (
        <Button
          className="mt-5"
          variant="primary"
          onClick={() => onSelectProduct(product.id)}
          disabled={isLoading}
        >
          {isLoading ? t("creatingApplication") : t("selectProduct")}
        </Button>
      )}
    </div>
  );
}
