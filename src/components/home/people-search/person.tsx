import { getPerson } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type PersonProps = {
  id: number;
};

export const Person = (props: PersonProps) => {
  const { id } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: person, status } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
  });

  const handleRemove = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("p", id.toString());
    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
  };

  return (
    <span
      key={id}
      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
    >
      {status === "pending" ? (
        <Skeleton className="w-36 h-6" />
      ) : (
        <>
          {person?.name}
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-blue-200 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        </>
      )}
    </span>
  );
};
