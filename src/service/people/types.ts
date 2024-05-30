import { z } from "zod";

const mediaType = z.enum(["movie", "tv"]);
const originalLanguage = z.enum(["cn", "en", "fr", "id", "ko"]);
const knownForDepartment = z.enum(["Acting", "Art"]);

export const knownForSchema = z.object({
  backdrop_path: z.string().nullable().catch(""),
  id: z.number(),
  original_name: z.string().optional().catch(""),
  overview: z.string().catch(""),
  poster_path: z.string().nullable().catch(""),
  media_type: mediaType.catch("movie"),
  adult: z.boolean().catch(false),
  name: z.string().optional().catch(""),
  original_language: originalLanguage.catch("en"),
  genre_ids: z.array(z.number()).catch([]),
  popularity: z.number().catch(0),
  first_air_date: z.coerce.date().nullable().optional().catch(null),
  vote_average: z.number().catch(0),
  vote_count: z.number().catch(0),
  origin_country: z.array(z.string()).optional().catch([]),
  original_title: z.string().optional().catch(""),
  title: z.string().optional().catch(""),
  release_date: z.coerce.date().nullable().optional().catch(null),
  video: z.boolean().optional().catch(false),
});

export const personSchema = z.object({
  adult: z.boolean().catch(false),
  gender: z.number().catch(0),
  id: z.number(),
  known_for_department: knownForDepartment.catch("Acting"),
  name: z.string(),
  original_name: z.string().catch(""),
  popularity: z.number().catch(0),
  profile_path: z.string().optional().catch(undefined),
  known_for: z.array(knownForSchema).catch([]),
});
export type Person = z.infer<typeof personSchema>;

export const peopleResponseSchema = z.object({
  page: z.number(),
  results: z.array(personSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const personDetailSchema = z.object({
  adult: z.boolean().catch(false),
  also_known_as: z.array(z.string()).catch([]),
  biography: z.string().optional().catch(""),
  birthday: z.coerce.date().nullable().optional().catch(null),
  deathday: z.coerce.date().nullable().optional().catch(null),
  gender: z.number().optional().catch(0),
  homepage: z.string().optional().catch(undefined),
  id: z.number(),
  imdb_id: z.string().optional().catch(""),
  known_for_department: z.string().optional().catch(""),
  name: z.string(),
  place_of_birth: z.string().catch(""),
  popularity: z.number().optional().catch(0),
  profile_path: z.string().optional().catch(undefined),
});
export type PersonDetail = z.infer<typeof personDetailSchema>;

export const castSchema = z.object({
  adult: z.boolean().catch(false),
  backdrop_path: z.string().optional().catch(""),
  genre_ids: z.array(z.number()).catch([]),
  id: z.number(),
  original_title: z.string().optional().catch(""),
  overview: z.string().catch(""),
  popularity: z.number().catch(0),
  poster_path: z.string().optional().catch(""),
  release_date: z.coerce.date().nullable().optional().catch(null),
  title: z.string().optional().catch(""),
  video: z.boolean().optional().catch(false),
  character: z.string().optional().catch(""),
  credit_id: z.string().catch(""),
  order: z.number().optional().catch(0),
  media_type: mediaType.catch("movie"),
  original_name: z.string().optional().catch(""),
  first_air_date: z.coerce.date().nullable().optional().catch(null),
  name: z.string().optional().catch(""),
});

export const combinedCreditsSchema = z.object({
  cast: z.array(castSchema),
  id: z.number(),
});
export type CombinedCredits = z.infer<typeof combinedCreditsSchema>;
