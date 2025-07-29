import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductListItem } from "@/components/ProductListItem";
import { mockProduct } from "@/test-utils/mocks/products";

const meta: Meta<typeof ProductListItem> = {
  title: "Components/ProductListItem",
  component: ProductListItem,
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
    onSelectProduct: (id) => console.log("Selected product:", id),
  },
};

export const InList: Story = {
  render: () => (
    <div className="w-full max-w-md grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border rounded-4xl bg-baby-blue">
      <ProductListItem
        product={{
          ...mockProduct,
          id: 1,
          bestRate: 5.25,
          term: "5_YEAR",
          name: "5 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
      <ProductListItem
        product={{
          ...mockProduct,
          id: 2,
          bestRate: 4.99,
          term: "3_YEAR",
          name: "3 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
      <ProductListItem
        product={{
          ...mockProduct,
          id: 3,
          bestRate: 6.75,
          term: "1_YEAR",
          name: "1 Year Fixed",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
    </div>
  ),
};
