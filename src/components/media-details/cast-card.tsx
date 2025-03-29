import { Card, CardContent } from "@/components/ui/card";
import { imgBasePath } from "@/lib/constants";
import type { MovieDetails } from "@/service/movies/types";
import type { TvDetails } from "@/service/tv/types";
import Image from "next/image";

type CastCardProps = {
  cast:
    | MovieDetails["credits"]["cast"][number]
    | TvDetails["credits"]["cast"][number];
};

export const CastCard = (props: CastCardProps) => {
  const { cast } = props;
  return (
    <Card key={cast.id} className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <Image
          id="cast-profile-image"
          src={`${imgBasePath}${cast.profile_path}`}
          alt=""
          className="w-full h-64 sm:w-32 sm:h-32 object-cover"
          width={128}
          height={128}
        />
        <CardContent className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="font-semibold text-lg">{cast.name}</h3>
          </div>
          <p className="text-gray-600 font-medium mb-2">as {cast.character}</p>
        </CardContent>
      </div>
    </Card>
  );
};
