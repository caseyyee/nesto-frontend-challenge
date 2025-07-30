import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Application } from "@/types/nesto";

interface UseCreateApplicationOptions {
  onSuccess?: (application: Application) => void;
  onError?: (error: Error) => void;
}

export function useCreateApplication({
  onSuccess,
  onError,
}: UseCreateApplicationOptions = {}) {
  const mutation = useMutation({
    mutationFn: api.createApplication,
    onSuccess: (application) => {
      onSuccess?.(application);
    },
    onError: (error) => {
      onError?.(error);
    },
  });

  const createApplication = (productId: number) => {
    mutation.mutate({ productId });
  };

  return {
    createApplication,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}
