"use client";

import { MediaResults } from "./media-results";
import { PageHeading } from "./page-heading";
import { PeopleSearch } from "./people-search";

export const SharedCredits = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <PageHeading />
      <PeopleSearch />
      <MediaResults />
    </div>
  );
};
