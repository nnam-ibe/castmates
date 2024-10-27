import MovieDetailsPage from "@/app/movie/[slug]/page";
import { CastCard } from "@/components/media-details/cast-card";
import { Badge } from "@/components/ui/badge";
import { imgBasePath } from "@/lib/constants";
import type { MovieDetails } from "@/service/movies/types";
import type { TvDetails } from "@/service/tv/types";
import { Calendar, Clock, Film, Star, Tag } from "lucide-react";
import Image from "next/image";

type MediaDetailProps = {
  media: MovieDetails | TvDetails;
};

export const MediaDetails = (props: MediaDetailProps) => {
  const { media } = props;

  let title = "";
  let year = "";
  let runtime = "";
  if (isMovie(media)) {
    title = media.title ?? "";
    runtime = media.runtime?.toString() ?? "";
    year = media.release_date
      ? new Date(media.release_date).getFullYear().toString()
      : "";
  } else {
    title = media.name ?? "";
    year = media.first_air_date
      ? new Date(media.first_air_date).getFullYear().toString()
      : "";
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/3">
          <Image
            src={`${imgBasePath}${media.poster_path}`}
            alt=""
            className="rounded-lg shadow-lg w-full"
            width={250}
            height={400}
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>

          <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{year}</span>
            </div>
            {runtime && (
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{`${runtime} mins`}</span>
              </div>
            )}
            {media.vote_average && (
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500" />
                <span>{media.vote_average}/10</span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={20} />
              <h2 className="text-xl font-semibold">Genres</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {media.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary" className="text-sm">
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{media.overview}</p>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Film size={24} />
          Cast
        </h2>

        <div className="flex flex-col gap-4">
          {media.credits.cast.map((cast) => (
            <CastCard cast={cast} key={cast.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

function isMovie(media: MovieDetails | TvDetails): media is MovieDetails {
  return media.mediaType === "movie";
}
