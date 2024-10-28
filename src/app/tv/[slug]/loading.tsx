import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Film, Star, Tag } from "lucide-react";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-[68px] w-full" />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/3">
            <Skeleton className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="w-full md:w-2/3">
            <Skeleton className="rounded-md w-[80%]" />

            <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <Skeleton className="w-[36px] h-[24px]" />
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <Skeleton className="w-[36px] h-[24px]" />
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500" />
                <Skeleton className="w-[36px] h-[24px]" />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={20} />
                <h2 className="text-xl font-semibold">Genres</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="w-[56px] h-[24px]" />
                <Skeleton className="w-[56px] h-[24px]" />
                <Skeleton className="w-[56px] h-[24px]" />
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[80%]" />
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Film size={24} />
            Cast
          </h2>
        </section>
      </div>
    </div>
  );
}
