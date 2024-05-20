import { get } from "@/lib/client";
import {
  combinedCreditsSchema,
  peopleResponseSchema,
  personDetailSchema,
} from "./types";

export const searchPeople = async (query: string) => {
  if (query.length < 3) {
    throw new Error("Query must be at least 3 characters long");
  }

  const rawResponse = await get("/search/person", { query });
  const response = peopleResponseSchema.parse(rawResponse);
  return response.results;
};

export const getPerson = async (id: number) => {
  const rawResponse = await get(`/person/${id}`);
  const response = personDetailSchema.parse(rawResponse);
  return response;
};

export const getCombinedCredits = async (id: number) => {
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

  return response;
};
