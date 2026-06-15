import { Card } from "../../../components/ui";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      aria-busy="true"
    />
  );
}

export default function LoadingState() {
  return (
    <div className="flex flex-col gap-lg">
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} elevation="sm" padding="md">
            <div className="flex flex-col gap-xs">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-8 w-32" />
              <SkeletonBox className="h-4 w-20" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} elevation="sm" padding="md">
            <SkeletonBox className="mb-md h-6 w-40" />
            <SkeletonBox className="h-48 w-full" />
          </Card>
        ))}
      </div>

      <Card elevation="none" padding="md">
        <SkeletonBox className="mb-md h-6 w-40" />
        <div className="space-y-md">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-md">
              <SkeletonBox className="h-10 w-24 flex-shrink-0" />
              <SkeletonBox className="h-10 flex-1" />
              <SkeletonBox className="h-10 w-32 flex-shrink-0" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
