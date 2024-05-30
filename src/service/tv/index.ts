import { get } from "@/lib/client";
import { cacheOptions } from "@/lib/constants";
import { LRUCache } from "lru-cache";
import type { TvDetails } from "./types";
import { tvDetailsSchema } from "./types";

const seriesCache = new LRUCache<number, TvDetails>(cacheOptions);

export const getSeriesDetails = async (seriesId: number) => {
  if (typeof seriesId !== "number" || isNaN(seriesId))
    throw new Error("Invalid id");

  if (seriesCache.has(seriesId)) {
    console.log("Cache hit - getSeriesDetails", seriesId);
    return seriesCache.get(seriesId)!;
  }
  const rawResponse = await get(`/tv/${seriesId}`, {
    append_to_response: "credits",
  });

  if (rawResponse.success === false) {
    if (rawResponse.status_code === 34) {
      throw new Error("Oops! Series not found.");
    }
    throw new Error("Internal Server Error!");
  }

  const response = tvDetailsSchema.parse(rawResponse);
  seriesCache.set(seriesId, response);
  return response;
};
