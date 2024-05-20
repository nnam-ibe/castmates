import { get } from "@/lib/client";
import { peopleResponseSchema, personDetailSchema } from "./types";

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
