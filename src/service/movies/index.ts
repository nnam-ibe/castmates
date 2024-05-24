import { get } from "@/lib/client";
import { movieDetails } from "./types";

export const getMovie = async (movieId: number) => {
  const rawResponse = await get(`/movie/${movieId}`, {
    append_to_response: "credits",
  });
  if (isNaN(movieId)) throw new Error("Invalid movie id");
  if (rawResponse.success === false) {
    if (rawResponse.status_code === 34) {
      throw new Error("Oops! Movie not found");
    }
    throw new Error("Internal Server Error!");
  }

  const response = movieDetails.parse(rawResponse);
  return response;
};
