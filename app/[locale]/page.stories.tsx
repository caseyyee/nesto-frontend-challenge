import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that the page renders with correct heading
    const heading = canvas.getByRole("heading", { level: 1 });
    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent("Home");
    
    // Test that the about link is present and has correct text
    const aboutLink = canvas.getByRole("link");
    await expect(aboutLink).toBeInTheDocument();
    await expect(aboutLink).toHaveTextContent("Go to the about page");
    await expect(aboutLink).toHaveAttribute("href", "/en/about");
  },
};
