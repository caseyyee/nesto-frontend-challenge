import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/Button";
import {
  ArrowRightIcon,
  PlusIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "select" },
      options: ["base"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
    startIcon: {
      control: { type: "object" },
    },
    endIcon: {
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Tertiary Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    variant: "primary",
    children: "Add Item",
    startIcon: <PlusIcon className="w-6 h-6" />,
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: "primary",
    children: "More Options",
    endIcon: <ArrowRightIcon className="w-6 h-6" />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          Primary Disabled
        </Button>
      </div>
    </div>
  ),
};

export const AllVariantsWithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <Button variant="primary" startIcon={<PlusIcon className="w-6 h-6" />}>
          Add New
        </Button>
        <Button
          variant="secondary"
          endIcon={<ArrowRightIcon className="w-4 h-4" />}
        >
          Continue
        </Button>
        <Button
          variant="tertiary"
          // startIcon={<StarIcon className="w-4 h-4" />}
          startIcon={<HeartIcon className="w-4 h-4" />}
        >
          Add to Favorites
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          variant="primary"
          endIcon={<ArrowRightIcon className="w-6 h-6" />}
        >
          Next Step
        </Button>
        <Button
          variant="secondary"
          startIcon={<PlusIcon className="w-4 h-4" />}
        >
          Create Account
        </Button>
        <Button variant="tertiary" endIcon={<StarIcon className="w-4 h-4" />}>
          Add to Favorites
        </Button>
      </div>
    </div>
  ),
};
