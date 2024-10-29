import { PersonBadge } from "@/components/lib/person-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "./search-bar";

export const PeopleSearch = () => {
  const searchParams = useSearchParams();
  const people = searchParams.getAll("p").map((id) => parseInt(id, 10));
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Select People
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {people.map((personId) => (
            <PersonBadge key={personId} id={personId} />
          ))}
        </div>

        {people.length < 10 && <SearchBar />}
      </CardContent>
    </Card>
  );
};
