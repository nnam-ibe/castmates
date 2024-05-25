import { CastCredit } from "@/components/cast-credit";
import { imgBasePath } from "@/lib/constants";
import { Badge, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { getSeriesDetails } from "./action";

const SeriesDetailsPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const seriesId = parseInt(params.slug, 10);
  if (isNaN(seriesId)) {
    return <div>Invalid series id</div>;
  }
  const series = await getSeriesDetails(seriesId);

  const title = series.name ?? "";
  let titleWithYear = `${title}`;
  if (series.first_air_date) {
    titleWithYear += ` (${new Date(series.first_air_date).getFullYear()})`;
  }

  return (
    <div className="flex flex-col gap-4 p-12">
      <div className="flex gap-4">
        <Image
          src={`${imgBasePath}${series.poster_path}`}
          alt={`${title} Poster`}
          borderRadius="lg"
          boxSize="250"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <div className="flex flex-col gap-4">
          <Heading>{titleWithYear}</Heading>
          <Text>{series.overview}</Text>
          <Stack direction="row">
            {series.genres?.map((genre) => (
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
          {series.credits?.cast?.map((cast) => (
            <CastCredit key={cast.id} credit={cast} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
