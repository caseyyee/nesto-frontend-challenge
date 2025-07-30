import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import { mockApplications } from "@/test-utils/mocks/applications";
import { renderWithProviders } from "@/test-utils";
import messages from "@/messages/en.json";

// Hoisted mocks - must come before imports
const mockPush = vi.fn();

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Import after mocks
import { ApplicationSelector } from "./ApplicationSelector";

describe("ApplicationSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders label and select element", () => {
    renderWithProviders(<ApplicationSelector applications={[]} />);

    expect(
      screen.getByLabelText(messages.ApplicationSelector.label),
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows 'no applications' message when applications array is empty", () => {
    renderWithProviders(<ApplicationSelector applications={[]} />);

    expect(
      screen.getByText(messages.ApplicationSelector.noApplications),
    ).toBeInTheDocument();
  });

  it("shows 'select prompt' message when applications are available", () => {
    renderWithProviders(
      <ApplicationSelector applications={mockApplications} />,
    );

    expect(
      screen.getByText(messages.ApplicationSelector.selectPrompt),
    ).toBeInTheDocument();
  });

  it("renders application options with applicant names", () => {
    renderWithProviders(
      <ApplicationSelector applications={mockApplications} />,
    );

    // First application with full name
    const firstApplicant = mockApplications[0].applicants[0];
    const firstFullName = `${firstApplicant.firstName} ${firstApplicant.lastName}`;
    expect(screen.getByText(new RegExp(firstFullName))).toBeInTheDocument();

    // Second application with full name
    const secondApplicant = mockApplications[1].applicants[0];
    const secondFullName = `${secondApplicant.firstName} ${secondApplicant.lastName}`;
    expect(screen.getByText(new RegExp(secondFullName))).toBeInTheDocument();

    // Third application without names (should show "New Application 3")
    expect(screen.getByText(/New Application 3/)).toBeInTheDocument();
  });

  it("sets initial select value to currentApplicationId", () => {
    renderWithProviders(
      <ApplicationSelector
        applications={mockApplications}
        currentApplicationId="app-2"
      />,
    );

    const select = screen.getByLabelText(messages.ApplicationSelector.label);
    expect(select).toHaveValue("app-2");
  });

  it("navigates to selected application when selection changes", () => {
    renderWithProviders(
      <ApplicationSelector
        applications={mockApplications}
        currentApplicationId="app-1"
      />,
    );

    const select = screen.getByLabelText(messages.ApplicationSelector.label);
    fireEvent.change(select, { target: { value: "app-2" } });

    expect(mockPush).toHaveBeenCalledWith("/application/app-2");
  });

  it("updates local state when selection changes", () => {
    renderWithProviders(
      <ApplicationSelector
        applications={mockApplications}
        currentApplicationId="app-1"
      />,
    );

    const select = screen.getByLabelText(messages.ApplicationSelector.label);

    // Change to app-2
    fireEvent.change(select, { target: { value: "app-2" } });
    expect(select).toHaveValue("app-2");

    // Change to empty
    fireEvent.change(select, { target: { value: "" } });
    expect(select).toHaveValue("");
  });
});
