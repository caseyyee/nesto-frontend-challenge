"use client";

import type { Product } from "@/types/nesto";
import { clsx } from "clsx";
import { HTMLAttributes, useState } from "react";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { Text } from "./Text";

interface ProductListProps {
  variable: Product[];
  fixed: Product[];
}

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const termLabels = {
  "1_YEAR": "1-year",
  "2_YEAR": "2-year",
  "3_YEAR": "3-year",
  "4_YEAR": "4-year",
  "5_YEAR": "5-year",
  "6_YEAR": "6-year",
  "7_YEAR": "7-year",
  "10_YEAR": "10-year",
};

function ProductCard({ product, className, ...rest }: ProductCardProps) {
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
      <Button className="mt-4" variant={"primary"}>
        Select this Product
      </Button>
    </div>
  );
}

function ProductCardItem({ product, className, ...rest }: ProductCardProps) {
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
      <Button className="mt-4" variant="secondary" size="base">
        Select this Product
      </Button>
    </div>
  );
}

export function ProductList({ variable, fixed }: ProductListProps) {
  const [showMoreVariable, setShowMoreVariable] = useState(false);
  const [showMoreFixed, setShowMoreFixed] = useState(false);

  const [bestVariable, ...restVariable] = variable;
  const [bestFixed, ...restFixed] = fixed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:w-5/6 mx-auto">
      <div className="p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2}>Best Variable</Heading>
        {bestVariable && <ProductCard product={bestVariable} />}
        {restVariable.length > 0 && showMoreVariable ? (
          <>
            <Heading level={3}>Variable Rates</Heading>
            <div className="w-full grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border rounded-4xl bg-baby-blue">
              {restVariable.map((product) => (
                <ProductCardItem key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <Button
            onClick={() => setShowMoreVariable(!showMoreVariable)}
            variant="tertiary"
          >
            {restVariable.length} more variable
          </Button>
        )}
      </div>

      <div className="p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2}>Best Fixed</Heading>
        {bestFixed && <ProductCard product={bestFixed} />}
        {restFixed.length > 0 && showMoreFixed ? (
          <>
            <Heading level={3}>Fixed Rates</Heading>
            <div className="w-full grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border rounded-4xl bg-baby-blue">
              {restFixed.map((product) => (
                <ProductCardItem key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <Button
            onClick={() => setShowMoreFixed(!showMoreFixed)}
            variant="tertiary"
          >
            {restFixed.length} more fixed
          </Button>
        )}
      </div>
    </div>
  );
}
