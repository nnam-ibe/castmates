import { get } from "@/lib/client";
import { cacheOptions } from "@/lib/constants";
import { LRUCache } from "lru-cache";
import type { CombinedCredits, PersonDetail, MediaDetails } from "./types";
import {
  combinedCreditsSchema,
  peopleResponseSchema,
  personDetailSchema,
} from "./types";

const peopleCache = new LRUCache<number, PersonDetail>(cacheOptions);
const creditsCache = new LRUCache<number, CombinedCredits>(cacheOptions);

export {
  getCombinedCredits,
  getPeople,
  getPerson,
  getSharedCredits,
  searchPeople,
};

const searchPeople = async (query: string) => {
  if (query.length < 3) {
    throw new Error("Query must be at least 3 characters long");
  }

  const rawResponse = await get("/search/person", { query });
  const response = peopleResponseSchema.parse(rawResponse);
  return response.results;
};

const getPerson = async (id: number): Promise<PersonDetail> => {
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

const getPeople = async (
  ids: number[]
): Promise<Record<string, PersonDetail>> => {
  if (!Array.isArray(ids)) throw new Error("ids must be an array");

  const queries = ids.map((id) => getPerson(id));
  const queryResults = await Promise.allSettled(queries);

  const people: Record<string, PersonDetail> = {};
  queryResults.forEach((res) => {
    if (res.status !== "fulfilled") return;
    people[res.value.id] = res.value;
  });
  return people;
};

const getCombinedCredits = async (id: number): Promise<CombinedCredits> => {
  if (typeof id !== "number" || isNaN(id)) throw new Error("Invalid id");

  if (creditsCache.has(id)) {
    console.log("Cache hit - getCombinedCredits", id);
    return creditsCache.get(id)!;
  }
  const rawResponse = await get(`/person/${id}/combined_credits`);
  const response = combinedCreditsSchema.parse(rawResponse);

  response.cast = response.cast.sort((a, b) => {
    if (a.release_date && b.release_date) {
      return b.release_date.getTime() - a.release_date.getTime();
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

const getSharedCredits = async (ids: number[]): Promise<MediaDetails[]> => {
  if (!Array.isArray(ids)) throw new Error("ids should be an array");
  if (ids.length === 0) throw new Error("at least one id required");

  const queries = ids.map((id) => getCombinedCredits(id));
  const queryResults = await Promise.allSettled(queries);

  const mediaMap: Map<number, MediaDetails> = new Map();
  queryResults.forEach((res) => {
    if (res.status !== "fulfilled") return;

    res.value.cast.forEach((creditDetails) => {
      if (mediaMap.has(creditDetails.id)) {
        const currentVal = mediaMap.get(creditDetails.id);
        currentVal!.characters[res.value.id] = creditDetails.character ?? "";
        return;
      }

      mediaMap.set(creditDetails.id, {
        id: creditDetails.id,
        title: creditDetails.title ?? creditDetails.name ?? "(Unknown)",
        year: creditDetails.release_date
          ? new Date(creditDetails.release_date).getFullYear().toString()
          : "",
        posterPath: creditDetails.poster_path ?? "",
        mediaType: creditDetails.media_type,
        genreIds: creditDetails.genre_ids,
        characters: {
          [res.value.id]: creditDetails.character ?? "",
        },
      });
      return;
    });
  });

  const commonCredits: MediaDetails[] = [];
  mediaMap.forEach((mediaDetails) => {
    if (Object.keys(mediaDetails.characters).length === ids.length) {
      commonCredits.push(mediaDetails);
    }
  });

  return commonCredits;
};
