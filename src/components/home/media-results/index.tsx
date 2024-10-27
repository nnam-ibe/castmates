import { getPerson, getSharedCredits } from "@/app/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Film } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { MediaCard } from "./media-card";

export const MediaResults = () => {
  const searchParams = useSearchParams();
  const disabledList = searchParams.getAll("f").map((id) => parseInt(id, 10));
  const allPeople = searchParams.getAll("p").map((id) => parseInt(id, 10));
  const peopleIds = allPeople.filter((id) => !disabledList.includes(id));
  const params = new URLSearchParams(searchParams);

  const peopleQueries = useQueries({
    queries: peopleIds.map((personId) => {
      return {
        queryKey: ["person", personId],
        queryFn: () => getPerson(personId),
      };
    }),
  });

  const isSharedCreditsEnabled = peopleIds.length > 0;

  const sharedCreditsQuery = useQuery({
    queryKey: ["shared-credits", ...peopleIds],
    queryFn: () => {
      return getSharedCredits(peopleIds);
    },
    enabled: isSharedCreditsEnabled,
  });

  const people = peopleQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Film className="w-5 h-5" />
          Filmography Comparisons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {sharedCreditsQuery.data?.map((details) => (
            <MediaCard
              key={details.id}
              details={details}
              people={people}
              params={searchParams.toString()}
            />
          ))}
          {sharedCreditsQuery.data?.length === 0 && (
            <Alert>
              <AlertDescription>
                No shared movies found between these actors.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
