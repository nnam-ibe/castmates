import { getPerson } from "@/app/actions";
import { imgBasePath } from "@/lib/constants";
import { CloseIcon } from "@chakra-ui/icons";
import { Avatar, Button, Skeleton, Switch, Tooltip } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type SelectedPersonProps = {
  id: number;
};
export const SidebarPerson = ({ id }: SelectedPersonProps) => {
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

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams);
    if (isChecked) {
      params.delete("f", id.toString());
    } else {
      params.append("f", id.toString());
    }
    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
  };

  const isLoaded = status === "success";
  const filteredList = searchParams.getAll("f").map((id) => parseInt(id, 10));
  const isChecked = !filteredList.includes(id);

  return (
    <div className="flex w-full items-center justify-between">
      <Skeleton
        isLoaded={isLoaded}
        className="flex w-full items-center justify-between"
      >
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Avatar
              name={person?.name}
              src={`${imgBasePath}${person?.profile_path}`}
              size="lg"
            />
            {person?.name}
          </div>
          <div className="flex items-center justify-end gap-4 ">
            <Switch
              id="isFiltered"
              isChecked={isChecked}
              onChange={handleFilter}
            />
            <Button
              variant="outline"
              onClick={handleRemove}
              rightIcon={<CloseIcon />}
            >
              Remove
            </Button>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
