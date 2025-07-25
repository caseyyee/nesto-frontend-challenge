import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "@storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the page renders with correct heading
    const heading = canvas.getByRole("heading", { level: 1 });
    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent("About");

    // Test that the home link is present and has correct text
    const homeLink = canvas.getByRole("link");
    await expect(homeLink).toBeInTheDocument();
    await expect(homeLink).toHaveTextContent("Go to home page");
    await expect(homeLink).toHaveAttribute("href", "/en");
  },
};
