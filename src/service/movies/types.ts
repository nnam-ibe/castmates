import { z } from "zod";

export const castSchema = z.object({
  adult: z.boolean().catch(false),
  gender: z.number().optional().catch(0),
  id: z.number(),
  known_for_department: z.string().optional().catch(""),
  name: z.string().catch(""),
  original_name: z.string().optional().catch(""),
  popularity: z.number().catch(0),
  profile_path: z.string().optional().catch(""),
  cast_id: z.number().optional().catch(0),
  character: z.string().optional(),
  credit_id: z.string().catch(""),
  order: z.number().optional(),
  job: z.string().optional().catch(""),
});
export type Cast = z.infer<typeof castSchema>;

export const genreSchema = z.object({
  id: z.number(),
  name: z.string().catch("-"),
});

export const creditsSchema = z.object({
  cast: z.array(castSchema),
  crew: z.array(castSchema),
});
export type Credits = z.infer<typeof creditsSchema>;

export const rawMovieDetails = z.object({
  adult: z.boolean().catch(false),
  backdrop_path: z.string().catch(""),
  budget: z.number(),
  genres: z.array(genreSchema).catch([]),
  homepage: z.string().catch(""),
  id: z.number(),
  overview: z.string().catch(""),
  poster_path: z.string().optional().catch(undefined),
  release_date: z.coerce.date().nullable().optional().catch(null),
  revenue: z.number().optional().catch(0),
  runtime: z.number().optional().catch(undefined),
  vote_average: z.number().optional().catch(0),
  status: z.string().catch("Unknown"),
  tagline: z.string().catch(""),
  title: z.string().catch(""),
  credits: creditsSchema,
});
export type RawMovieDetails = z.infer<typeof rawMovieDetails>;

export const movieDetails = rawMovieDetails.transform((data) => {
  return {
    ...data,
    mediaType: "movie",
  };
});
export type MovieDetails = z.infer<typeof movieDetails>;
