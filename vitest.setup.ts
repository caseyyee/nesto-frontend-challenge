import { vi } from "vitest";
import { createElement } from "react";
import "@testing-library/jest-dom/vitest";

// Mock the next-intl navigation components
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href, ...props }: any) =>
    createElement("a", { href, ...props }, children),
}));
