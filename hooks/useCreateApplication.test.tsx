import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCreateApplication } from "./useCreateApplication";
import { api } from "@/lib/api";
import { createWrapper } from "@/test-utils";
import type { Application } from "@/types/nesto";

// Mock the API
vi.mock("@/lib/api", () => ({
  api: {
    createApplication: vi.fn(),
  },
}));

describe("useCreateApplication", () => {
  const mockCreateApplication = vi.mocked(api.createApplication);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates application and navigates on success", async () => {
    const mockApplication: Application = {
      id: "app-123",
      type: "NEW",
      applicants: [],
      createdAt: "2024-01-01",
    };

    mockCreateApplication.mockResolvedValue(mockApplication);

    const onSuccess = vi.fn();
    const { result } = renderHook(() => useCreateApplication({ onSuccess }), {
      wrapper: createWrapper(),
    });

    // Initially not pending
    expect(result.current.isPending).toBe(false);

    // Create application
    result.current.createApplication(1);

    // Wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isPending).toBe(false);
    });

    // Should have called API with correct data
    expect(mockCreateApplication).toHaveBeenCalledWith({ productId: 1 });

    // Should call onSuccess callback
    expect(onSuccess).toHaveBeenCalledWith(mockApplication);
  });

  it("handles error correctly", async () => {
    const mockError = new Error("API Error");
    mockCreateApplication.mockRejectedValue(mockError);

    const onError = vi.fn();
    const { result } = renderHook(() => useCreateApplication({ onError }), {
      wrapper: createWrapper(),
    });

    // Create application
    result.current.createApplication(1);

    // Wait for error
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });

    // Should call onError callback
    expect(onError).toHaveBeenCalledWith(mockError);
  });
});
