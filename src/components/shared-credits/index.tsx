"use client";

import { getCombinedCredits } from "@/app/actions";
import { MovieCard } from "@/components/movie-card";
import { type CombinedCredits } from "@/service/people/types";
import { Center, Text } from "@chakra-ui/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Loading } from "./loading";
import {SearchDrawer} from "@/components/search-drawer";

function getSharedCredits(credits: CombinedCredits["cast"][]) {
  if (credits.length < 1) {
    throw new Error("Need at least one credit list");
  }

  if (credits.length === 1) {
    const ids = new Set(credits[0].map((c) => c.id));
    return Array.from(ids);
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

export const SharedCredits = () => {
  const searchParams = useSearchParams();
  const disabledList = searchParams.getAll("f").map((id) => parseInt(id, 10));
  const allPeople = searchParams.getAll("p").map((id) => parseInt(id, 10));
  const people = allPeople.filter((id) => !disabledList.includes(id));

  const creditQueries = useQueries({
    queries: people.map((person) => {
      return {
        queryKey: ["person-credit", person],
        queryFn: () => getCombinedCredits(person),
      };
    }),
  });

  const isSharedCreditsEnabled =
    people.length > 0 && creditQueries.every((q) => q.isSuccess);
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

  if (people.length == 0) {
    return (
      <Center className="flex flex-1">
        <div>
          <Text>Search for people to get started</Text>
          <SearchDrawer />
        </div>
      </Center>
    );
  }

  if (!isSharedCreditsEnabled) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {sharedCreditsQuery.data?.map((id) => {
        const details = creditQueries[0].data!.cast.find((c) => c.id === id);
        if (!details) return null;

        return <MovieCard key={details.id} movie={details} />;
      }) ?? "No shared credits"}
    </div>
  );
};
