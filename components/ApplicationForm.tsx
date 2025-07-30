"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Heading } from "./Heading";
import { Text } from "./Text";
import { Button } from "./Button";
import { FieldLabel } from "./FieldLabel";
import { Input } from "./Input";
import { ErrorLabel } from "./ErrorLabel";
import { api } from "@/lib/api";
import { revalidateApplications } from "@/lib/actions";
import type { Application } from "@/types/nesto";
import clsx from "clsx";

const createApplicantFormSchema = (t: (key: string) => string) =>
  z.object({
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

export function ApplicationForm({ initialApplication }: ApplicationFormProps) {
  const queryClient = useQueryClient();
  const t = useTranslations("ApplicationForm");

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

  const {
    mutate: updateApplication,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Application> }) =>
      api.updateApplication(id, data),
    onSuccess: async (updatedApplication) => {
      // Update the cache with new data
      queryClient.setQueryData(
        ["application", initialApplication.id],
        updatedApplication,
      );

      // Update form data with the response
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
    if (!initialApplication?.id) {
      return;
    }

    const updatedApplicants = [
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
    ];

    updateApplication({
      id: initialApplication.id,
      data: { applicants: updatedApplicants },
    });
  };

  return (
    <div>
      <div className="min-w-auto max-w-md mx-auto">
        <Heading level={3} className="ml-2 mb-6">
          {t("title")}
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FieldLabel htmlFor="firstName">{t("firstName")}</FieldLabel>
            <Input
              type="text"
              id="firstName"
              variant={errors.firstName ? "error" : "default"}
              {...register("firstName")}
            />
            <ErrorLabel error={errors.firstName} />
          </div>

          <div>
            <FieldLabel htmlFor="lastName">{t("lastName")}</FieldLabel>
            <Input
              type="text"
              id="lastName"
              variant={errors.lastName ? "error" : "default"}
              {...register("lastName")}
            />
            <ErrorLabel error={errors.lastName} />
          </div>

          <div>
            <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
            <Input
              type="email"
              id="email"
              variant={errors.email ? "error" : "default"}
              {...register("email")}
            />
            <ErrorLabel error={errors.email} />
          </div>

          <div>
            <FieldLabel htmlFor="phone">{t("phone")}</FieldLabel>
            <Input
              type="tel"
              id="phone"
              variant={errors.phone ? "error" : "default"}
              {...register("phone")}
            />
            <ErrorLabel error={errors.phone} />
          </div>

          <div className="flex justify-center mt-8">
            <Button type="submit" disabled={isPending || !isValid || !isDirty}>
              {t("saveButton")}
            </Button>
          </div>

          {isError ||
            (isSuccess && (
              <Text
                size="lg"
                className={clsx(
                  isError && "text-orange",
                  isSuccess && "text-grand-blue",
                  "font-semibold text-center",
                )}
              >
                {isError && t("errorMessage")}
                {isSuccess && t("successMessage")}
              </Text>
            ))}
        </form>
      </div>
    </div>
  );
}
