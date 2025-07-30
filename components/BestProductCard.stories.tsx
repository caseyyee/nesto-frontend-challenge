import { BestProductCard } from "@/components/BestProductCard";
import { ProductCard } from "@/components/ProductCard";
import { mockProduct } from "@/test-utils/mocks/products";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof BestProductCard> = {
  title: "Components/BestProductCard",
  component: BestProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    startIcon: {
      control: { type: "object" },
    },
    endIcon: {
      control: { type: "object" },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Product",
    children: (
      <ProductCard
        product={mockProduct}
        onSelectProduct={(id) => console.log("Selected product:", id)}
        variant="best"
      />
    ),
  },
};

export const WithStartIcon: Story = {
  args: {
    title: "Best Fixed",
    startIcon: <StarIcon className="w-6 h-6 text-white" />,
    children: (
      <ProductCard
        product={{
          ...mockProduct,
          bestRate: 4.99,
          term: "5_YEAR",
          type: "FIXED",
        }}
        onSelectProduct={(id) => console.log("Selected product:", id)}
        variant="best"
      />
    ),
  },
};

export const WithEndIcon: Story = {
  args: {
    title: "Premium",
    endIcon: <SparklesIcon className="w-6 h-6 text-white" />,
    children: (
      <ProductCard
        product={{
          ...mockProduct,
          bestRate: 3.75,
          term: "3_YEAR",
          name: "Premium Rate",
        }}
        onSelectProduct={(id) => console.log("Selected product:", id)}
        variant="best"
      />
    ),
  },
};
