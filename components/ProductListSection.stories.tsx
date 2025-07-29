import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductListSection } from "@/components/ProductListSection";
import { ProductListItem } from "@/components/ProductListItem";
import { mockProduct } from "@/test-utils/mocks/products";

const meta: Meta<typeof ProductListSection> = {
  title: "Components/ProductListSection",
  component: ProductListSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Variable Rates",
    children: (
      <>
        <ProductListItem
          product={{
            ...mockProduct,
            id: 1,
            bestRate: 3.45,
            term: "5_YEAR",
            name: "5 Year Variable",
          }}
          onSelectProduct={(id) => console.log("Selected:", id)}
        />
        <ProductListItem
          product={{
            ...mockProduct,
            id: 2,
            bestRate: 3.75,
            term: "3_YEAR",
            name: "3 Year Variable",
          }}
          onSelectProduct={(id) => console.log("Selected:", id)}
        />
        <ProductListItem
          product={{
            ...mockProduct,
            id: 3,
            bestRate: 4.25,
            term: "1_YEAR",
            name: "1 Year Variable",
          }}
          onSelectProduct={(id) => console.log("Selected:", id)}
        />
      </>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    title: "Single Rate",
    children: (
      <ProductListItem
        product={{
          ...mockProduct,
          bestRate: 3.25,
          term: "5_YEAR",
          name: "Special Rate",
        }}
        onSelectProduct={(id) => console.log("Selected:", id)}
      />
    ),
  },
};

export const LoadingState: Story = {
  args: {
    title: "Loading Rates",
    children: (
      <>
        <ProductListItem
          product={{
            ...mockProduct,
            id: 1,
            bestRate: 3.45,
            term: "5_YEAR",
            name: "5 Year Variable",
          }}
          onSelectProduct={(id) => console.log("Selected:", id)}
          isLoading={true}
        />
        <ProductListItem
          product={{
            ...mockProduct,
            id: 2,
            bestRate: 3.75,
            term: "3_YEAR",
            name: "3 Year Variable",
          }}
          onSelectProduct={(id) => console.log("Selected:", id)}
          isLoading={true}
        />
      </>
    ),
  },
};
