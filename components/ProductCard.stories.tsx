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

export const WithSelectButton: Story = {
  args: {
    product: mockProduct,
    onSelectProduct: (id) => console.log("Selected product:", id),
  },
};

export const DifferentRates: Story = {
  render: () => (
    <div className="flex gap-4">
      <ProductCard
        product={{
          ...mockProduct,
          id: 1,
          bestRate: 1.1,
          term: "5_YEAR",
          name: "5 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
      <ProductCard
        product={{
          ...mockProduct,
          id: 2,
          bestRate: 2.8,
          term: "3_YEAR",
          name: "3 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
      <ProductCard
        product={{
          ...mockProduct,
          id: 3,
          bestRate: 4.99,
          term: "2_YEAR",
          name: "3 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
      <ProductCard
        product={{
          ...mockProduct,
          id: 4,
          bestRate: 12.5,
          term: "1_YEAR",
          name: "1 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
    </div>
  ),
};
