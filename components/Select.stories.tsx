import { Select } from "@/components/Select";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "base", "lg"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export const WithSelectedValue: Story = {
  args: {
    defaultValue: "2",
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    children: (
      <>
        <option value="">Please select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "1",
    children: (
      <>
        <option value="1">Selected Option</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};
