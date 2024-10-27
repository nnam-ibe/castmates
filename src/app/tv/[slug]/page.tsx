import { MediaDetails } from "@/components/media-details";
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

  return <MediaDetails media={series} />;
};

export default SeriesDetailsPage;
