import type { Meta, StoryObj } from "@storybook/nextjs";
import { TestI18nProvider } from "@/test-utils";
import HomePage from "./page";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main landing page of the application with navigation to other sections.",
      },
    },
  },
  decorators: [
    (Story) => (
      <TestI18nProvider>
        <Story />
      </TestI18nProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default state of the home page with heading and navigation link.",
      },
    },
  },
};
