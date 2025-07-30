import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ApplicationLoading from "@/app/[locale]/application/[id]/loading";

const meta: Meta<typeof ApplicationLoading> = {
  title: "Components/ApplicationLoading",
  component: ApplicationLoading,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
