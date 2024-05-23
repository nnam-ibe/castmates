"use client";

import { getCombinedCredits } from "@/app/actions";
import { Movie } from "@/components/movie";
import { type CombinedCredits } from "@/service/people/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Loading } from "./loading";

function getSharedCredits(credits: CombinedCredits["cast"][]) {
  if (credits.length < 2) {
    throw new Error("Need at least two credits to compare");
  }

  const creditSets = credits.map((credit) => new Set(credit.map((c) => c.id)));
  const sharedCredits = creditSets[0];

  for (let i = 1; i < creditSets.length; i++) {
    const currentSet = creditSets[i];
    sharedCredits.forEach((id) => {
      if (!currentSet.has(id)) {
        sharedCredits.delete(id);
      }
    });
  }

  return Array.from(sharedCredits);
}

export const Credits = () => {
  const searchParams = useSearchParams();
  const people = searchParams.getAll("p").map((id) => parseInt(id, 10));

  const creditQueries = useQueries({
    queries: people.map((person) => {
      return {
        queryKey: ["person-credit", person],
        queryFn: () => getCombinedCredits(person),
      };
    }),
  });

  const isSharedCreditsEnabled =
    people.length >= 2 && creditQueries.every((q) => q.isSuccess);
  const sharedCreditsQuery = useQuery({
    queryKey: ["shared-credits", ...people],
    queryFn: () => {
      const creditsArray: CombinedCredits["cast"][] = [];
      creditQueries.forEach((q) => {
        const data = q.data!;
        creditsArray.push(data.cast);
      });

      return getSharedCredits(creditsArray);
    },
    enabled: isSharedCreditsEnabled,
  });

  if (!isSharedCreditsEnabled || !sharedCreditsQuery.data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {sharedCreditsQuery.data?.map((id) => {
        const details = creditQueries[0].data!.cast.find((c) => c.id === id);
        if (!details) return null;

        return <Movie key={details.id} movie={details} />;
      }) ?? "No shared credits"}
    </div>
  );
};
