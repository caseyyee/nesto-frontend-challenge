import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCard } from "@/components/ProductCard";
import { mockProduct } from "@/test-utils/mocks/products";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    product: {
      control: { type: "object" },
    },
    onSelectProduct: {
      action: "onSelectProduct",
    },
    isLoading: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["base", "best"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProduct,
    onSelectProduct: undefined,
  },
};

export const BestVariant: Story = {
  args: {
    product: mockProduct,
    onSelectProduct: undefined,
    variant: "best",
  },
};

export const LoadingState: Story = {
  args: {
    product: mockProduct,
    isLoading: true,
    onSelectProduct: (id) => console.log("Selected product:", id),
  },
};

export const WithSelectButton: Story = {
  args: {
    product: mockProduct,
    onSelectProduct: (id) => console.log("Selected product:", id),
  },
};
