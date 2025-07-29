"use client";

import type { Application } from "@/types/nesto";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ApplicationSelectorProps {
  applications: Application[];
  currentApplicationId?: string;
}

export function ApplicationSelector({
  applications,
  currentApplicationId,
}: ApplicationSelectorProps) {
  const router = useRouter();
  const t = useTranslations("ApplicationSelector");
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>(
    currentApplicationId || "",
  );

  const handleApplicationSelect = (applicationId: string) => {
    setSelectedApplicationId(applicationId);

    // Redirect immediately when selection changes
    if (applicationId && applicationId !== currentApplicationId) {
      router.push(`/application/${applicationId}`);
    }
  };

  return (
    <div>
      <label
        htmlFor="application-select"
        className="block text-sm font-medium mb-2"
      >
        {t("label")}
      </label>
      <select
        id="application-select"
        value={selectedApplicationId}
        onChange={(e) => handleApplicationSelect(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent"
      >
        <option value="">
          {applications.length === 0
            ? t("noApplications")
            : t("selectPrompt")}
        </option>
        {applications.map((app, i) => {
          const [applicant] = app.applicants;

          const applicantName =
            applicant.firstName && applicant.lastName
              ? `${applicant.firstName} ${applicant.lastName}`
              : t("newApplication", { number: i + 1 });

          return (
            <option key={app.id} value={app.id}>
              {applicantName} - {app.createdAt}
            </option>
          );
        })}
      </select>
    </div>
  );
}
