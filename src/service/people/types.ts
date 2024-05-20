import { z } from "zod";

const mediaType = z.enum(["movie", "tv"]);
const originalLanguage = z.enum(["cn", "en", "fr", "id", "ko"]);
const knownForDepartment = z.enum(["Acting", "Art"]);

export const knownForSchema = z.object({
  backdrop_path: z.string().nullable(),
  id: z.number(),
  original_name: z.string().optional(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  media_type: mediaType.catch("movie"),
  adult: z.boolean().catch(false),
  name: z.string().optional(),
  original_language: originalLanguage.catch("en"),
  genre_ids: z.array(z.number()).catch([]),
  popularity: z.number().catch(0),
  first_air_date: z.coerce.date().nullable().optional().catch(null),
  vote_average: z.number().catch(0),
  vote_count: z.number().catch(0),
  origin_country: z.array(z.string()).optional().catch([]),
  original_title: z.string().optional(),
  title: z.string().optional(),
  release_date: z.coerce.date().nullable().optional().catch(null),
  video: z.boolean().optional().catch(false),
});

export const personSchema = z.object({
  adult: z.boolean().catch(false),
  gender: z.number().catch(0),
  id: z.number(),
  known_for_department: knownForDepartment.catch("Acting"),
  name: z.string(),
  original_name: z.string(),
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
