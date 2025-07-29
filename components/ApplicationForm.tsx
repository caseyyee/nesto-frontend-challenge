"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";
import { api } from "@/lib/api";
import { revalidateApplications } from "@/lib/actions";
import type { Application } from "@/types/nesto";

// Zod schema factory for applicant form validation with localized messages
const createApplicantFormSchema = (t: (key: string) => string) => z.object({
  firstName: z
    .string()
    .min(1, t("validation.firstNameRequired"))
    .min(2, t("validation.firstNameMinLength"))
    .max(50, t("validation.firstNameMaxLength")),
  lastName: z
    .string()
    .min(1, t("validation.lastNameRequired"))
    .min(2, t("validation.lastNameMinLength"))
    .max(50, t("validation.lastNameMaxLength")),
  email: z.email(t("validation.emailInvalid")),
  phone: z
    .string()
    .min(1, t("validation.phoneRequired"))
    .regex(/^[\+]?[\d\s\-\(\)\.]{5,20}$/, t("validation.phoneInvalid")),
});

type ApplicantFormData = z.infer<ReturnType<typeof createApplicantFormSchema>>;

// Helper function to extract default values from application data
const getDefaultValues = (application: Application): ApplicantFormData => {
  const applicant = application?.applicants?.[0];
  return {
    firstName: applicant?.firstName || "",
    lastName: applicant?.lastName || "",
    email: applicant?.email || "",
    phone: applicant?.phone || "",
  };
};

interface ApplicationFormProps {
  initialApplication: Application;
}

export function ApplicationForm({
  initialApplication,
}: ApplicationFormProps) {
  const queryClient = useQueryClient();
  const t = useTranslations("ApplicationForm");

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ApplicantFormData>({
    resolver: zodResolver(createApplicantFormSchema(t)),
    mode: "onBlur",
    defaultValues: getDefaultValues(initialApplication),
  });

  // Update application mutation
  const updateApplicationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Application> }) =>
      api.updateApplication(id, data),
    onSuccess: async (updatedApplication) => {
      // Update the cache with new data
      queryClient.setQueryData(
        ["application", initialApplication.id],
        updatedApplication,
      );

      // Update form data with the response to ensure consistency
      if (updatedApplication.applicants?.[0]) {
        const applicant = updatedApplication.applicants[0];
        reset({
          firstName: applicant.firstName || "",
          lastName: applicant.lastName || "",
          email: applicant.email || "",
          phone: applicant.phone || "",
        });
      }

      // Revalidate applications cache to update ApplicationSelector
      await revalidateApplications();
    },
    onError: (error) => {
      console.error(t("updateError"), error);
    },
  });

  const onSubmit = (data: ApplicantFormData) => {
    if (!initialApplication?.id) return;

    const updatedApplicants = [
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
    ];

    updateApplicationMutation.mutate({
      id: initialApplication.id,
      data: { applicants: updatedApplicants },
    });
  };

  if (!initialApplication) {
    return (
      <div>
        <Heading level={2} className="mb-4">
          {t("title")}
        </Heading>
        <Text className="text-gray-500">{t("noDataProvided")}</Text>
      </div>
    );
  }

  return (
    <div>
      <Heading level={2} className="mb-4">
        {t("title")}
      </Heading>

      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              {t("firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.firstName.message}
              </Text>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              {t("lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.lastName.message}
              </Text>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.email && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.email.message}
              </Text>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <Text size="xs" className="text-red-600 mt-1">
                {errors.phone.message}
              </Text>
            )}
          </div>

          <Button
            type="submit"
            disabled={
              updateApplicationMutation.isPending || !isValid || !isDirty
            }
            className="w-full"
          >
            {updateApplicationMutation.isPending
              ? t("saving")
              : t("saveButton")}
          </Button>

          {updateApplicationMutation.isSuccess && (
            <Text size="sm" className="text-green-600">
              {t("successMessage")}
            </Text>
          )}

          {updateApplicationMutation.isError && (
            <Text size="sm" className="text-red-600">
              {t("errorMessage")}
            </Text>
          )}
        </form>
      </div>
    </div>
  );
}
