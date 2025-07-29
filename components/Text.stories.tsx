import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "@/components/Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ],
    },
    as: {
      control: { type: "select" },
      options: ["p", "span", "div"],
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    size: "base",
    children: "Base Text",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Text",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Text",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large Text",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="base">Base (base)</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
      <Text size="2xl">2X Large (2xl)</Text>
      <Text size="3xl">3X Large (3xl)</Text>
      <Text size="4xl">4X Large (4xl)</Text>
      <Text size="5xl">5X Large (5xl)</Text>
      <Text size="6xl">6X Large (6xl)</Text>
    </div>
  ),
};
