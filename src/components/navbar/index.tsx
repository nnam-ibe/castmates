"use client";
import { PersonBadge } from "@/components/lib/person-badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const Navbar = () => {
  const searchParams = useSearchParams();
  const allPeople = searchParams.getAll("p").map((id) => parseInt(id, 10));

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0">
      <div className="mx-auto flex items-center justify-between">
        <a
          href={`/?${searchParams}`}
          className="text-blue-600 hover:text-blue-800"
        >
          <Home className="w-6 h-6" />
        </a>

        <div className="hidden md:flex gap-2 overflow-x-auto flex-grow mx-4">
          {allPeople.map((personId) => (
            <PersonBadge key={personId} id={personId} />
          ))}
        </div>

        <div className="text-sm text-gray-500 flex md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button disabled={allPeople.length === 0}>
                {allPeople.length} selected
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              {allPeople.length === 0 && <span>No one selected</span>}
              <div className="grid gap-4">
                {allPeople.map((personId) => (
                  <PersonBadge key={personId} id={personId} />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
