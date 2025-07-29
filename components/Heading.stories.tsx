import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "@/components/Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    variant: {
      control: { type: "select" },
      options: ["hero", "title", "subtitle", "body"],
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {
  args: {
    level: 1,
    variant: "hero",
    children: "Hero Heading",
  },
};

export const Title: Story = {
  args: {
    level: 2,
    variant: "title",
    children: "Title Heading",
  },
};

export const Subtitle: Story = {
  args: {
    level: 3,
    variant: "subtitle",
    children: "Subtitle Heading",
  },
};

export const Body: Story = {
  args: {
    level: 4,
    variant: "body",
    children: "Body Heading",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={1} variant="hero">
        Hero (h1)
      </Heading>
      <Heading level={2} variant="title">
        Title (h2)
      </Heading>
      <Heading level={3} variant="subtitle">
        Subtitle (h3)
      </Heading>
      <Heading level={4} variant="body">
        Body (h4)
      </Heading>
    </div>
  ),
};

export const AllLevelsWithAutoVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={1}>H1 - Auto Hero Variant</Heading>
      <Heading level={2}>H2 - Auto Title Variant</Heading>
      <Heading level={3}>H3 - Auto Subtitle Variant</Heading>
      <Heading level={4}>H4 - Auto Subtitle Variant</Heading>
      <Heading level={5}>H5 - Auto Body Variant</Heading>
      <Heading level={6}>H6 - Auto Body Variant</Heading>
    </div>
  ),
};
