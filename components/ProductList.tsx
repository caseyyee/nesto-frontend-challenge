"use client";

import { useState, HTMLAttributes } from "react";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";
import type { Product } from "@/types/nesto";
import { clsx } from "clsx";

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
        "p-4 mb-2 rounded bg-baby-blue flex flex-col items-center w-full",
        className,
      )}
      {...rest}
    >
      <div className="flex">
        <Text size="6xl" className="font-medium">
          {product.bestRate}
        </Text>
        <Text size="2xl" className="font-bold">
          %
        </Text>
      </div>
      <Text>{termLabels[product.term]}</Text>
      <Text>{product.lenderName}</Text>
      <Heading level={3}>{product.name}</Heading>
      <Button className="mt-4">Select this Product</Button>
    </div>
  );
}

export function ProductList({ variable, fixed }: ProductListProps) {
  const [showMoreVariable, setShowMoreVariable] = useState(false);
  const [showMoreFixed, setShowMoreFixed] = useState(false);

  const [bestVariable, ...restVariable] = variable;
  const [bestFixed, ...restFixed] = fixed;

  return (
    <div className="flex gap-4 justify-center">
      <div className="border p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2} className="mb-2">
          Best Variable
        </Heading>

        {bestVariable && <ProductCard product={bestVariable} />}

        {restVariable.length > 0 && showMoreVariable ? (
          <>
            {restVariable.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        ) : (
          <Button
            onClick={() => setShowMoreVariable(!showMoreVariable)}
            variant="secondary"
          >
            {restVariable.length} more rate options
          </Button>
        )}
      </div>

      <div className="border p-4 rounded-lg flex flex-col gap-4 items-center">
        <Heading level={2}>Best Fixed</Heading>

        {bestFixed && <ProductCard product={bestFixed} />}

        {restFixed.length > 0 && (
          <>
            {showMoreFixed ? (
              <div className="space-y-2">
                {restFixed.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Button
                onClick={() => setShowMoreFixed(!showMoreFixed)}
                variant="secondary"
              >
                {restFixed.length} more rate options
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
