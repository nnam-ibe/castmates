import { Badge } from "@/components/ui/badge";
import { GenreMapping, imgBasePath } from "@/lib/constants";
import { MediaDetails, PersonDetail } from "@/service/people/types";
import Image from "next/image";
import Link from "next/link";

type MediaCardProps = {
  details: MediaDetails;
  people: PersonDetail[];
  params: string;
};

export const MediaCard = (props: MediaCardProps) => {
  const { details, people, params } = props;
  return (
    <Link href={`/${details.mediaType}/${details.id}?${params}`}>
      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Image
              src={`${imgBasePath}${details.posterPath}`}
              className="w-24 h-36 rounded-md object-cover"
              alt={""}
              width={72}
              height={72}
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{details.title}</h3>
                <p className="text-gray-600">{details.year}</p>
                <div className="flex gap-2">
                  {details.genreIds.map((genreId) => {
                    return (
                      <Badge key={genreId}>
                        {GenreMapping[genreId] ?? "-"}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {Object.keys(details.characters).map((_id) => {
                const personId = Number(_id);
                const personDetails = people.find((per) => per.id === personId);
                if (!personDetails) return;

                return (
                  <div key={personId} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full">
                      <Image
                        src={`${imgBasePath}${personDetails.profile_path}`}
                        alt={personDetails.name}
                        className="w-8 h-8 rounded-full object-cover"
                        width={32}
                        height={32}
                      />
                    </div>
                    <span className="font-medium">{personDetails.name}</span>
                    <span className="text-gray-600">
                      as {details.characters[personId]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
