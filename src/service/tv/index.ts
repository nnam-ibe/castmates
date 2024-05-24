import { get } from "@/lib/client";
import { tvDetailsSchema } from "./types";

export const getSeriesDetails = async (seriesId: number) => {
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
  return response;
};
