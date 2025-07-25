import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  "stories": [
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../**/*.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  }
};
export default config;