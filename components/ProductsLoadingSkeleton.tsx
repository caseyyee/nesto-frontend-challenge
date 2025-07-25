export default function ProductsLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-64 mb-6"></div>

      {/* Variable Products Section */}
      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        {[1, 2].map((i) => (
          <div key={i} className="border p-4 mb-2 bg-gray-50">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      {/* Fixed Products Section */}
      <div>
        <div className="h-6 bg-gray-200 rounded w-44 mb-4"></div>
        {[1, 2].map((i) => (
          <div key={i} className="border p-4 mb-2 bg-gray-50">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
