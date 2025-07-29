import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationSelector } from "@/components/ApplicationSelector";
import { Heading } from "@/components/Heading";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import {
  fetchApplicationServer,
  fetchApplicationsServer,
  fetchProductServer,
} from "@/lib/server-api";
import { getTranslations } from "next-intl/server";

interface ApplicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationPage({
  params,
}: ApplicationPageProps) {
  const t = await getTranslations("ApplicationPage");
  const { id: applicationId } = await params;

  // Fetch all applications
  const allApplications = await fetchApplicationsServer().catch((error) => {
    console.error("Failed to fetch applications for selector:", error);
    return [];
  });

  try {
    const application = await fetchApplicationServer(applicationId);

    // Fetch product
    const product = application.productId
      ? await fetchProductServer(application.productId).catch((error) => {
          console.error("Failed to fetch product:", error);
          return null;
        })
      : null;

    return (
      <>
        <PageHeader />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {product && <ProductCard product={product} />}
              <ApplicationSelector
                applications={allApplications}
                currentApplicationId={application.id}
              />
            </div>
            <div>
              <ApplicationForm initialApplication={application} />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Failed to fetch application:", error);
    return (
      <>
        <PageHeader />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Heading level={1}>{t("title")}</Heading>
          <p>
            Error loading application:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>

          <div className="mt-8">
            <ApplicationSelector
              applications={allApplications}
              currentApplicationId={applicationId}
            />
          </div>
        </div>
      </>
    );
  }
}
