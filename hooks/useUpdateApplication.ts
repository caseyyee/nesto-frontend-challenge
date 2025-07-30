import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { revalidateApplications } from "@/lib/actions";
import type { Application } from "@/types/nesto";

interface UseUpdateApplicationOptions {
  initialApplication: Application;
  onSuccess?: (updatedApplication: Application) => void;
  onError?: (error: Error) => void;
}

export function useUpdateApplication({
  initialApplication,
  onSuccess,
  onError,
}: UseUpdateApplicationOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Application> }) =>
      api.updateApplication(id, data),
    onSuccess: async (updatedApplication) => {
      // Update the cache with new data
      queryClient.setQueryData(
        ["application", initialApplication.id],
        updatedApplication,
      );

      // Revalidate applications cache to update ApplicationSelector
      await revalidateApplications();

      // Call custom onSuccess handler if provided
      onSuccess?.(updatedApplication);
    },
    onError: (error) => {
      // Call custom onError handler if provided
      onError?.(error);
    },
  });

  const updateApplication = (data: Partial<Application>) => {
    if (!initialApplication?.id) {
      return;
    }

    mutation.mutate({
      id: initialApplication.id,
      data,
    });
  };

  return {
    updateApplication,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
