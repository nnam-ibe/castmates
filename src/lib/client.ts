import "dotenv/config";

const tmdbUrl = process.env.TMDB_BASE_URL;
const bearerToken = process.env.TMDB_TOKEN;

export const get = async (
  endpoint: string,
  params?: Record<string, string>
) => {
  const queryParams = new URLSearchParams(params);
  const res = await fetch(`${tmdbUrl}/${endpoint}?${queryParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return res.json();
};
