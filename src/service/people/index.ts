import { get } from "@/lib/client";
import { cacheOptions } from "@/lib/constants";
import { LRUCache } from "lru-cache";
import type { CombinedCredits, PersonDetail } from "./types";
import {
  combinedCreditsSchema,
  peopleResponseSchema,
  personDetailSchema,
} from "./types";

const peopleCache = new LRUCache<number, PersonDetail>(cacheOptions);
const creditsCache = new LRUCache<number, CombinedCredits>(cacheOptions);

export const searchPeople = async (query: string) => {
  if (query.length < 3) {
    throw new Error("Query must be at least 3 characters long");
  }

  const rawResponse = await get("/search/person", { query });
  const response = peopleResponseSchema.parse(rawResponse);
  return response.results;
};

export const getPerson = async (id: number): Promise<PersonDetail> => {
  if (typeof id !== "number" || isNaN(id)) throw new Error("Invalid id");

  if (peopleCache.has(id)) {
    console.log("Cache hit - getPerson", id);
    return peopleCache.get(id)!;
  }
  const rawResponse = await get(`/person/${id}`);
  const response = personDetailSchema.parse(rawResponse);

  peopleCache.set(id, response);

  return response;
};

export const getCombinedCredits = async (
  id: number
): Promise<CombinedCredits> => {
  if (typeof id !== "number" || isNaN(id)) throw new Error("Invalid id");

  if (creditsCache.has(id)) {
    console.log("Cache hit - getCombinedCredits", id);
    return creditsCache.get(id)!;
  }
  const rawResponse = await get(`/person/${id}/combined_credits`);
  const response = combinedCreditsSchema.parse(rawResponse);

  response.cast = response.cast.sort((a, b) => {
    if (a.release_date && b.release_date) {
      return a.release_date.getTime() - b.release_date.getTime();
    } else if (a.release_date) {
      return -1;
    } else if (b.release_date) {
      return 1;
    }
    return 0;
  });

  creditsCache.set(id, response);

  return response;
};
