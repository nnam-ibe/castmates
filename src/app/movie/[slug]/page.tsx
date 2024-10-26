import { CastCredit } from "@/components/cast-credit";
import { imgBasePath } from "@/lib/constants";
import { Badge, Heading, Image, Stack, Text } from "@chakra-ui/react";
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

  const title = movie.title;
  let titleWithYear = `${title}`;
  if (movie.release_date) {
    titleWithYear += ` (${new Date(movie.release_date).getFullYear()})`;
  }

  return (
    <div className="flex flex-col gap-4 p-12">
      <div className="flex gap-4">
        <Image
          src={`${imgBasePath}${movie.poster_path}`}
          alt={`${title} Poster`}
          borderRadius="lg"
          boxSize="250"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <div className="flex flex-col gap-4">
          <Heading>{titleWithYear}</Heading>
          <Text>{movie.overview}</Text>
          <Stack direction="row">
            {movie.genres.map((genre) => (
              <Badge colorScheme="blue" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </Stack>
        </div>
      </div>
      <div>
        <Heading size="lg" className="pb-4">
          Cast
        </Heading>
        <div className="flex flex-col gap-4 overflow-x-scroll">
          {movie.credits.cast.map((cast) => (
            <CastCredit key={cast.id} credit={cast} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
