import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProductsLoadingSkeleton, {
  SkeletonCard,
} from "@/components/ProductsLoadingSkeleton";

const meta: Meta<typeof ProductsLoadingSkeleton> = {
  title: "Components/ProductsLoadingSkeleton",
  component: ProductsLoadingSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SkeletonCardOnly: Story = {
  render: () => <SkeletonCard />,
  parameters: {
    docs: {
      description: {
        story:
          "Individual skeleton card component used within the loading skeleton",
      },
    },
  },
};
