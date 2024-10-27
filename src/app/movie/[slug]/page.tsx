import { MediaDetails } from "@/components/media-details";
import { getMovie } from "./actions";

const MovieDetailsPage = async ({
  params,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const movieId = parseInt(params.slug, 10);
  if (isNaN(movieId)) {
    return <div>Invalid movie id</div>;
  }
  const movie = await getMovie(movieId);

  return <MediaDetails media={movie} />;
};

export default MovieDetailsPage;
