import { ErrorLayout } from "@/components/ErrorLayout";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ErrorLayout> = {
  title: "Components/ErrorLayout",
  component: ErrorLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    message: {
      control: { type: "text" },
    },
    error: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Error loading data",
    message: "Something went wrong while fetching the data. Please try again.",
  },
};

export const WithErrorObject: Story = {
  args: {
    title: "Server Error",
    error: new Error("Internal server error (500)"),
  },
};
