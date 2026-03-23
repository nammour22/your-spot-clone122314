export default function PageSkeleton() {
  return (
    <div className="p-4 md:p-8 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-surface-highlight rounded" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-surface-highlight rounded-md" />
        ))}
      </div>
      <div className="h-6 w-32 bg-surface-highlight rounded mt-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-surface-highlight rounded-md" />
            <div className="h-4 w-3/4 bg-surface-highlight rounded" />
            <div className="h-3 w-1/2 bg-surface-highlight rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
