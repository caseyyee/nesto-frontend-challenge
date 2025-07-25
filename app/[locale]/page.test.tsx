import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestI18nProvider } from "@/test-utils";
import Page from "./page";

test("Page", () => {
  render(
    <TestI18nProvider>
      <Page />
    </TestI18nProvider>,
  );
  expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
});
