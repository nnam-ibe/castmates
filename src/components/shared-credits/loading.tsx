import { MovieCardSkeleton } from "@/components/movie-card";

export function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <MovieCardSkeleton />
      <MovieCardSkeleton />
      <MovieCardSkeleton />
    </div>
  );
}
