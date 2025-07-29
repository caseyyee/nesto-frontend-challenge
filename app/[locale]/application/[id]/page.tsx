import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationSelector } from "@/components/ApplicationSelector";
import { Heading } from "@/components/Heading";
import { ProductCard } from "@/components/ProductCard";
import {
  fetchApplicationServer,
  fetchApplicationsServer,
  fetchProductServer,
} from "@/lib/server-api";
import { getTranslations } from "next-intl/server";
import { BestProductCard } from "@/components/BestProductCard";
import { Text } from "@/components/Text";

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
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 p-4">
          <div className="flex flex-col gap-8 items-center lg:mt-18">
            {product && (
              <BestProductCard
                title={t("selectedProduct")}
                className="max-w-md"
              >
                <ProductCard product={product} variant="best" />
              </BestProductCard>
            )}
            <ApplicationSelector
              applications={allApplications}
              currentApplicationId={application.id}
            />
          </div>

          <ApplicationForm initialApplication={application} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch application:", error);
    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 text-center space-y-4 min-h-90 flex flex-col items-center justify-center">
        <Heading level={2}>Error loading application:</Heading>
        <Text size="xl">
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </div>
    );
  }
}
