import { clsx } from "clsx";
import { useTranslations } from "next-intl";
import { Button } from "./Button";
import { termLabels, type ProductCardProps } from "./ProductCard";
import { Text } from "./Text";

export function ProductListItem({
  product,
  className,
  onSelectProduct,
  isLoading,
  ...rest
}: ProductCardProps & {
  onSelectProduct: (productId: number) => void;
  isLoading?: boolean;
}) {
  const t = useTranslations("ProductList");
  return (
    <div
      key={product.id}
      className={clsx("p-4 flex flex-col items-center w-full", className)}
      {...rest}
    >
      <Text>{termLabels[product.term]}</Text>
      <div className="flex">
        <Text size={"5xl"} className={"font-bold"}>
          {product.bestRate}
        </Text>
        <Text size={"xl"} className="font-bold">
          %
        </Text>
      </div>
      <Text>{product.lenderName}</Text>
      <Text>{product.name}</Text>
      <Button
        className="mt-4"
        variant="secondary"
        size="base"
        onClick={() => onSelectProduct(product.id)}
        disabled={isLoading}
      >
        {isLoading ? t("creatingApplication") : t("selectProduct")}
      </Button>
    </div>
  );
}
