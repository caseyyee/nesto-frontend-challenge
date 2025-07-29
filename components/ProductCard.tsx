import type { Product } from "@/types/nesto";
import { clsx } from "clsx";
import { HTMLAttributes } from "react";
import { Button } from "./Button";
import { Text } from "./Text";

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
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
  return (
    <div
      key={product.id}
      className={clsx(
        "bg-baby-blue p-4 mb-2 rounded-4xl flex flex-col items-center w-full border-navy-blue border",
        className,
      )}
      {...rest}
    >
      <Text>{termLabels[product.term]}</Text>
      <div className="flex">
        <Text size={"6xl"} className={clsx("font-bold")}>
          {product.bestRate}
        </Text>
        <Text size={"2xl"} className="font-bold">
          %
        </Text>
      </div>

      <Text>{product.lenderName}</Text>
      <Text>{product.name}</Text>
      {onSelectProduct && (
        <Button
          className="mt-4"
          variant={"primary"}
          onClick={() => onSelectProduct(product.id)}
          disabled={isLoading}
        >
          {isLoading ? "Creating Application..." : "Select this Product"}
        </Button>
      )}
    </div>
  );
}