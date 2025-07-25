import type { Meta, StoryObj } from "@storybook/nextjs";
import { TestI18nProvider } from "@/test-utils";
import AboutPage from "./page";

const meta: Meta<typeof AboutPage> = {
  title: "Pages/AboutPage",
  component: AboutPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "About page providing information about the application.",
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
          "Default state of the about page with heading and home navigation link.",
      },
    },
  },
};
