import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Page from "./page";

const messages = {
  HomePage: {
    title: "Home",
    about: "Go to the about page",
  },
};

test("Page", () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Page />
    </NextIntlClientProvider>,
  );
  expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
});
