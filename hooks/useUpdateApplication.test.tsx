import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateApplication } from "./useUpdateApplication";
import { api } from "@/lib/api";
import { revalidateApplications } from "@/lib/actions";
import { mockApplications } from "@/test-utils/mocks/applications";
import { createWrapper } from "@/test-utils";
import type { Application } from "@/types/nesto";
import React from "react";

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

const mockUpdateApplication = vi.mocked(api.updateApplication);
const mockRevalidateApplications = vi.mocked(revalidateApplications);

describe("useUpdateApplication", () => {
  const initialApplication = mockApplications[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("successful mutation", () => {
    it("calls api.updateApplication with correct parameters", async () => {
      const updatedApplication = {
        ...initialApplication,
        applicants: [
          { ...initialApplication.applicants[0], firstName: "Updated" },
        ],
      };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper: createWrapper() },
      );

      const updateData = {
        applicants: [
          {
            firstName: "Updated",
            lastName: "Test",
            email: "test@example.com",
            phone: "555-1234",
          },
        ],
      };

      result.current.updateApplication(updateData);

      await waitFor(() => {
        expect(mockUpdateApplication).toHaveBeenCalledWith(
          initialApplication.id,
          updateData,
        );
      });
    });

    it("calls revalidateApplications after successful update", async () => {
      const updatedApplication = { ...initialApplication };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        expect(mockRevalidateApplications).toHaveBeenCalled();
      });
    });

    it("calls custom onSuccess callback with updated application", async () => {
      const updatedApplication = {
        ...initialApplication,
        applicants: [
          { ...initialApplication.applicants[0], firstName: "Updated" },
        ],
      };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      const onSuccess = vi.fn();

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication, onSuccess }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledWith(updatedApplication);
      });
    });

    it("updates query cache with new data", async () => {
      const updatedApplication = { ...initialApplication };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        const cachedData = queryClient.getQueryData([
          "application",
          initialApplication.id,
        ]);
        expect(cachedData).toEqual(updatedApplication);
      });
    });
  });

  describe("error handling", () => {
    it("handles API errors correctly", async () => {
      const error = new Error("API Error");
      mockUpdateApplication.mockRejectedValue(error);

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
        expect(result.current.isError).toBe(true);
        expect(result.current.isSuccess).toBe(false);
        expect(result.current.error).toBe(error);
      });
    });

    it("calls custom onError callback with error", async () => {
      const error = new Error("API Error");
      mockUpdateApplication.mockRejectedValue(error);

      const onError = vi.fn();

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication, onError }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(error);
      });
    });

    it("does not call revalidateApplications on error", async () => {
      const error = new Error("API Error");
      mockUpdateApplication.mockRejectedValue(error);

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(mockRevalidateApplications).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("does not call mutation when application id is missing", () => {
      const applicationWithoutId = {
        ...initialApplication,
        id: undefined as Application["id"],
      };

      const { result } = renderHook(
        () =>
          useUpdateApplication({ initialApplication: applicationWithoutId }),
        { wrapper: createWrapper() },
      );

      result.current.updateApplication({ applicants: [] });

      expect(mockUpdateApplication).not.toHaveBeenCalled();
    });

    it("works without custom callbacks", async () => {
      const updatedApplication = { ...initialApplication };
      mockUpdateApplication.mockResolvedValue(updatedApplication);

      const { result } = renderHook(
        () => useUpdateApplication({ initialApplication }),
        { wrapper: createWrapper() },
      );

      expect(() => {
        result.current.updateApplication({ applicants: [] });
      }).not.toThrow();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });
    });
  });
});
