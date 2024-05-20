import { getPerson } from "@/app/actions";
import { imgBasePath } from "@/lib/constants";
import { Avatar, CloseButton, Skeleton, Tooltip } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SelectedPersonProps = {
  id: number;
};
export const SelectedPerson = ({ id }: SelectedPersonProps) => {
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
  const isLoaded = status === "success";

  return (
    <div className="flex w-full items-center justify-between">
      <Skeleton
        isLoaded={isLoaded}
        className="flex w-full items-center justify-between"
      >
        <div className="flex gap-2 items-center">
          <Avatar
            name={person?.name}
            src={`${imgBasePath}${person?.profile_path}`}
            size="lg"
          />
          {person?.name}
        </div>
        <Tooltip label="Remove" aria-label="Remove">
          <CloseButton onClick={handleRemove} />
        </Tooltip>
      </Skeleton>
    </div>
  );
};
