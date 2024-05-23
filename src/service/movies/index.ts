import { get } from "@/lib/client";
import { movieDetails } from "./types";

export const getMovie = async (movieId: number) => {
  const rawResponse = await get(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
  if (rawResponse.success === false) {
    if (rawResponse.status_code === 34) {
      throw new Error("Oops movie not found!");
    }
    throw new Error("Internal Server Error!");
  }

  const response = movieDetails.parse(rawResponse);
  return response;
};
