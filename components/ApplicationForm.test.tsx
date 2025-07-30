import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationForm } from "./ApplicationForm";
import {
  mockApplications,
  createMockApplication,
} from "@/test-utils/mocks/applications";
import { renderWithProviders } from "@/test-utils";
import messages from "@/messages/en.json";
import { api } from "@/lib/api";
import type { Application } from "@/types/nesto";

// Mock the API
vi.mock("@/lib/api", () => ({
  api: {
    updateApplication: vi.fn(),
  },
}));

// Mock the server actions
vi.mock("@/lib/actions", () => ({
  revalidateApplications: vi.fn(),
}));

describe("ApplicationForm", () => {
  const mockUpdateApplication = vi.mocked(api.updateApplication);
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders form with all fields and labels", () => {
      const application = mockApplications[0];
      renderWithProviders(<ApplicationForm initialApplication={application} />);

      // Check title
      expect(
        screen.getByText(messages.ApplicationForm.title),
      ).toBeInTheDocument();

      // Check all field labels
      expect(
        screen.getByText(messages.ApplicationForm.firstName),
      ).toBeInTheDocument();
      expect(
        screen.getByText(messages.ApplicationForm.lastName),
      ).toBeInTheDocument();
      expect(
        screen.getByText(messages.ApplicationForm.email),
      ).toBeInTheDocument();
      expect(
        screen.getByText(messages.ApplicationForm.phone),
      ).toBeInTheDocument();

      // Check all input fields
      expect(
        screen.getByLabelText(messages.ApplicationForm.firstName),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(messages.ApplicationForm.lastName),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(messages.ApplicationForm.email),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(messages.ApplicationForm.phone),
      ).toBeInTheDocument();

      // Check submit button
      expect(
        screen.getByText(messages.ApplicationForm.saveButton),
      ).toBeInTheDocument();
    });

    it("populates form with initial application data", () => {
      const application = mockApplications[0];
      const applicant = application.applicants[0];

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      // Check that fields are populated with applicant data
      expect(screen.getByDisplayValue(applicant.firstName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(applicant.lastName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(applicant.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(applicant.phone)).toBeInTheDocument();
    });

    it("handles application with empty applicant data", () => {
      const application = createMockApplication({
        applicants: [
          {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          },
        ],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      // All fields should be empty
      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const lastNameInput = screen.getByLabelText(
        messages.ApplicationForm.lastName,
      );
      const emailInput = screen.getByLabelText(messages.ApplicationForm.email);
      const phoneInput = screen.getByLabelText(messages.ApplicationForm.phone);

      expect(firstNameInput).toHaveValue("");
      expect(lastNameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(phoneInput).toHaveValue("");
    });
  });

  describe("Form Validation", () => {
    it("shows validation errors for required fields", async () => {
      const application = createMockApplication({
        applicants: [{ firstName: "", lastName: "", email: "", phone: "" }],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const lastNameInput = screen.getByLabelText(
        messages.ApplicationForm.lastName,
      );
      const emailInput = screen.getByLabelText(messages.ApplicationForm.email);
      const phoneInput = screen.getByLabelText(messages.ApplicationForm.phone);

      // Trigger validation by focusing and blurring fields (onTouched mode)
      await user.click(firstNameInput);
      await user.tab();
      await user.click(lastNameInput);
      await user.tab();
      await user.click(emailInput);
      await user.tab();
      await user.click(phoneInput);
      await user.tab();

      // Wait for validation errors to appear
      await waitFor(() => {
        expect(
          screen.getByText(
            messages.ApplicationForm.validation.firstNameRequired,
          ),
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            messages.ApplicationForm.validation.lastNameRequired,
          ),
        ).toBeInTheDocument();
        expect(
          screen.getByText(messages.ApplicationForm.validation.emailInvalid),
        ).toBeInTheDocument();
        expect(
          screen.getByText(messages.ApplicationForm.validation.phoneRequired),
        ).toBeInTheDocument();
      });
    });

    it("validates minimum length for names", async () => {
      const application = createMockApplication({
        applicants: [
          {
            firstName: "J",
            lastName: "D",
            email: "test@example.com",
            phone: "555-123-4567",
          },
        ],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const lastNameInput = screen.getByLabelText(
        messages.ApplicationForm.lastName,
      );

      // The field already has "J" (1 character), which should show min length error on blur
      await user.click(firstNameInput);
      await user.tab(); // Trigger blur to validate

      // Wait for validation to trigger and check if error appears
      await waitFor(() => {
        // Check if input has error state
        expect(firstNameInput).toHaveAttribute("data-error", "true");

        // Check if error message appears
        const errorElement = screen.getByTestId("firstName-error");
        expect(errorElement).toHaveTextContent(
          messages.ApplicationForm.validation.firstNameMinLength,
        );
      });

      // Check last name validation
      await user.click(lastNameInput);
      await user.tab(); // Trigger blur to validate

      await waitFor(() => {
        // Check if input has error state
        expect(lastNameInput).toHaveAttribute("data-error", "true");

        // Check if error message appears
        const errorElement = screen.getByTestId("lastName-error");
        expect(errorElement).toHaveTextContent(
          messages.ApplicationForm.validation.lastNameMinLength,
        );
      });
    });

    it("validates email format", async () => {
      const application = createMockApplication({
        applicants: [{ firstName: "", lastName: "", email: "", phone: "" }],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const emailInput = screen.getByLabelText(messages.ApplicationForm.email);

      await user.type(emailInput, "invalid-email");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(messages.ApplicationForm.validation.emailInvalid),
        ).toBeInTheDocument();
      });
    });

    it("validates phone format", async () => {
      const application = createMockApplication({
        applicants: [{ firstName: "", lastName: "", email: "", phone: "" }],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const phoneInput = screen.getByLabelText(messages.ApplicationForm.phone);

      await user.type(phoneInput, "123");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText(messages.ApplicationForm.validation.phoneInvalid),
        ).toBeInTheDocument();
      });
    });

    it("shows error styling on invalid fields", async () => {
      const application = createMockApplication({
        applicants: [{ firstName: "", lastName: "", email: "", phone: "" }],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );

      // With onTouched mode, trigger validation by focusing and blurring
      await user.click(firstNameInput);
      await user.tab();

      await waitFor(() => {
        expect(firstNameInput).toHaveAttribute("data-error", "true");
      });
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      const application = mockApplications[0];
      const updatedApplication = { ...application };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      // Make a change to enable the form
      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");

      // Submit the form
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateApplication).toHaveBeenCalledWith(application.id, {
          applicants: [
            {
              firstName: "Updated Name",
              lastName: application.applicants[0].lastName,
              email: application.applicants[0].email,
              phone: application.applicants[0].phone,
            },
          ],
        });
      });
    });

    it("shows success message after successful submission", async () => {
      const application = mockApplications[0];
      const updatedApplication = { ...application };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(messages.ApplicationForm.successMessage),
        ).toBeInTheDocument();
      });
    });

    it("shows error message after failed submission", async () => {
      const application = mockApplications[0];

      // Suppress console.error during test
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      mockUpdateApplication.mockRejectedValue(new Error("API Error"));

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(messages.ApplicationForm.errorMessage),
        ).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it("disables submit button when form is invalid", async () => {
      const application = createMockApplication({
        applicants: [{ firstName: "", lastName: "", email: "", phone: "" }],
      });

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );
      expect(submitButton).toBeDisabled();
    });

    it("disables submit button when form is not dirty", () => {
      const application = mockApplications[0];
      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );
      expect(submitButton).toBeDisabled();
    });

    it("disables submit button while mutation is pending", async () => {
      const application = mockApplications[0];
      // Make the promise never resolve to simulate pending state
      mockUpdateApplication.mockImplementation(() => new Promise(() => {}));

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");
      await user.click(submitButton);

      // Button should be disabled during mutation
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe("Form Behavior", () => {
    it("enables submit button when form is valid and dirty", async () => {
      const application = mockApplications[0];
      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      // Initially disabled
      expect(submitButton).toBeDisabled();

      // Make a change
      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");

      // Should be enabled now
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });

    it("resets form after successful submission", async () => {
      const application = mockApplications[0];
      const updatedApplication = {
        ...application,
        applicants: [
          {
            ...application.applicants[0],
            firstName: "Updated Name",
          },
        ],
      };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      await user.clear(firstNameInput);
      await user.type(firstNameInput, "Updated Name");
      await user.click(submitButton);

      // Form should reset with updated data
      await waitFor(() => {
        expect(firstNameInput).toHaveValue("Updated Name");
        expect(submitButton).toBeDisabled(); // Should be disabled again after reset
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles application without applicants array", () => {
      const application = createMockApplication({
        applicants: undefined as Application["applicants"],
      });

      expect(() => {
        renderWithProviders(
          <ApplicationForm initialApplication={application} />,
        );
      }).not.toThrow();

      // All fields should be empty
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("handles application with empty applicants array", () => {
      const application = createMockApplication({ applicants: [] });

      expect(() => {
        renderWithProviders(
          <ApplicationForm initialApplication={application} />,
        );
      }).not.toThrow();

      // All fields should be empty
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("does not submit when application id is missing", async () => {
      const application = createMockApplication({
        id: undefined as Application["id"],
      });
      renderWithProviders(<ApplicationForm initialApplication={application} />);

      const firstNameInput = screen.getByLabelText(
        messages.ApplicationForm.firstName,
      );
      const submitButton = screen.getByText(
        messages.ApplicationForm.saveButton,
      );

      await user.type(firstNameInput, "Test");
      await user.click(submitButton);

      // Should not call the API
      expect(mockUpdateApplication).not.toHaveBeenCalled();
    });
  });
});
