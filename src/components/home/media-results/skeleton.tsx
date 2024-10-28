import { Skeleton } from "@/components/ui/skeleton";

export const MediaCardSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Skeleton className="w-24 h-36 rounded-md" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-52 rounded-md" />
              <Skeleton className="h-5 w-10 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-24 h-6 " />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
