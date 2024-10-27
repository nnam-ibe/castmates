import { searchPeople } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { SearchResult } from "./search-result";

/**
 TODO: add genre filter
 **/
export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: people } = useQuery({
    queryKey: ["people", debouncedQuery],
    queryFn: () => searchPeople(debouncedQuery),
    staleTime: 0,
    enabled: debouncedQuery.length >= 3,
    initialData: [],
  });

  const clearSearchQuery = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for an actor..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {debouncedQuery && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {people.map((person) => (
            <SearchResult
              key={person.id}
              id={person.id}
              name={person.name}
              profile_path={person.profile_path}
              clearSearchQuery={clearSearchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
