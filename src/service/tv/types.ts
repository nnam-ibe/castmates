import { z } from "zod";

export const castSchema = z.object({
  adult: z.boolean().optional().catch(false),
  gender: z.number().optional().catch(0),
  id: z.number(),
  known_for_department: z.string().optional().catch(""),
  name: z.string().optional().catch(""),
  original_name: z.string().optional().catch(""),
  popularity: z.number().optional().catch(0),
  profile_path: z.string().optional().catch(""),
  character: z.string().optional().catch(""),
  credit_id: z.string().optional().catch(""),
  order: z.number().optional().catch(0),
  department: z.string().optional().catch(""),
  job: z.string().optional().catch(""),
});
export type Cast = z.infer<typeof castSchema>;

export const genreSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});

export const lastEpisodeToAirSchema = z.object({
  id: z.number(),
  overview: z.string().optional().catch(""),
  name: z.string().optional().catch(""),
  air_date: z.coerce.date().nullable().optional().catch(null),
  episode_number: z.number().optional().catch(0),
  episode_type: z.string().optional().catch(""),
  season_number: z.number().optional().catch(0),
  show_id: z.number().catch(0),
  still_path: z.string().optional().catch(""),
});

export const seasonSchema = z.object({
  air_date: z.coerce.date().nullable().optional().catch(null),
  episode_count: z.number().optional().catch(0),
  id: z.number(),
  name: z.string().optional().catch(""),
  overview: z.string().optional().catch(""),
  poster_path: z.string().optional().catch(""),
  season_number: z.number().optional().catch(0),
});

export const creditsSchema = z.object({
  cast: z.array(castSchema).optional().catch([]),
  crew: z.array(castSchema).optional().catch([]),
});
export type Credits = z.infer<typeof creditsSchema>;

export const tvDetailsSchema = z.object({
  adult: z.boolean().optional().catch(false),
  backdrop_path: z.string().optional().catch(""),
  episode_run_time: z.array(z.number()).optional().catch([]),
  first_air_date: z.coerce.date().nullable().optional().catch(null),
  genres: z.array(genreSchema).optional().catch([]),
  homepage: z.string().optional().catch(""),
  id: z.number(),
  in_production: z.boolean().optional().catch(false),
  last_air_date: z.coerce.date().nullable().optional().catch(null),
  last_episode_to_air: lastEpisodeToAirSchema.optional().nullable(),
  name: z.string().optional().catch(""),
  next_episode_to_air: lastEpisodeToAirSchema.optional().nullable(),
  number_of_episodes: z.number().optional().catch(0),
  number_of_seasons: z.number().optional().catch(0),
  original_name: z.string().optional(),
  overview: z.string().optional(),
  poster_path: z.string().optional().catch(""),
  seasons: z.array(seasonSchema).optional().catch([]),
  status: z.string().optional().catch(""),
  tagline: z.string().optional().catch(""),
  type: z.string().optional().catch(""),
  credits: creditsSchema.optional(),
});
export type TvDetails = z.infer<typeof tvDetailsSchema>;
