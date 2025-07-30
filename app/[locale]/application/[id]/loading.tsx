import { SkeletonCard } from "@/components/ProductsLoadingSkeleton";

export default function ApplicationLoading() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 p-4">
        <div className="flex flex-col gap-8 items-center lg:mt-18">
          <SkeletonCard />

          {/* Application Selector Skeleton */}
          <div className="w-full max-w-md">
            <div className="h-10 bg-gray-200 rounded-full w-3/4 animate-pulse mx-auto"></div>
          </div>
        </div>

        {/* Application Form Skeleton */}
        <div className="min-w-auto max-w-md mx-auto w-full">
          <div className="h-10 bg-gray-200 rounded-full w-48 mb-10 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-10 bg-gray-200 rounded-full w-24 mb-4 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse"></div>
              </div>
            ))}
            <div className="flex justify-center mt-8">
              <div className="h-10 bg-gray-200 rounded-full w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
