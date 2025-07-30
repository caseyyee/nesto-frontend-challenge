export const SkeletonCard = () => (
  <div className="w-full max-w-md bg-gray-300 rounded-3xl h-[270px] md:h-[370px] p-1 flex flex-col overflow-hidden">
    <div className="h-12 w-full flex items-center justify-center">
      <div className="h-6 w-1/2 bg-white animate-pulse rounded-full"></div>
    </div>
    <div className="bg-white rounded-3xl flex-1 flex flex-col items-center justify-center gap-6 p-4">
      <div className="h-25 w-60 bg-gray-200 animate-pulse rounded-full"></div>
      <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-full"></div>
    </div>
  </div>
);

export default function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Variable Products Column */}
      <div className="p-4 flex flex-col gap-8 items-center">
        <SkeletonCard />
      </div>

      {/* Fixed Products Column */}
      <div className="p-4 flex flex-col gap-8 items-center">
        <SkeletonCard />
      </div>
    </div>
  );
}
