import { get } from "@/lib/client";
import { cacheOptions } from "@/lib/constants";
import { LRUCache } from "lru-cache";
import type { MovieDetails } from "./types";
import { movieDetails } from "./types";

const moviesCache = new LRUCache<number, MovieDetails>(cacheOptions);

export const getMovie = async (movieId: number) => {
  if (typeof movieId !== "number" || isNaN(movieId))
    throw new Error("Invalid id");

  if (moviesCache.has(movieId)) {
    console.log("Cache hit - getMovie", movieId);
    return moviesCache.get(movieId)!;
  }

  const rawResponse = await get(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
  if (rawResponse.success === false) {
    if (rawResponse.status_code === 34) {
      throw new Error("Oops! Movie not found");
    }
    throw new Error("Internal Server Error!");
  }

  const response = movieDetails.parse(rawResponse);
  moviesCache.set(movieId, response);
  return response;
};
