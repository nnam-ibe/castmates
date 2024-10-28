"use client";
import { getPerson } from "@/app/actions";
import { useQueries } from "@tanstack/react-query";
import { Home, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const disabledList = searchParams.getAll("f").map((id) => parseInt(id, 10));
  const allPeople = searchParams.getAll("p").map((id) => parseInt(id, 10));
  const peopleIds = allPeople.filter((id) => !disabledList.includes(id));

  const peopleQueries = useQueries({
    queries: peopleIds.map((personId) => {
      return {
        queryKey: ["person", personId],
        queryFn: () => getPerson(personId),
      };
    }),
  });

  const people = peopleQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data);

  const removePerson = (id: number) => {
    const _id = id.toString();
    if (!searchParams.has("p", _id)) return;

    const person = people.find((per) => per.id === id);
    const params = new URLSearchParams(searchParams);
    params.delete("p", _id);

    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
    toast(`${person?.name} removed`, {
      action: {
        label: "Undo",
        onClick: () => router.back(),
      },
    });
  };

  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0">
      <div className="mx-auto flex items-center justify-between">
        <a
          href={`/?${searchParams}`}
          className="text-blue-600 hover:text-blue-800"
        >
          <Home className="w-6 h-6" />
        </a>

        <div className="flex gap-2 overflow-x-auto flex-grow mx-4">
          {people.map((person) => (
            <div
              key={person.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              <span>{person.name}</span>
              <button
                onClick={() => removePerson(person.id)}
                className="hover:text-blue-600"
                aria-label={`Remove ${person}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-500">{people.length} selected</div>
      </div>
    </nav>
  );
};

export default Navbar;
