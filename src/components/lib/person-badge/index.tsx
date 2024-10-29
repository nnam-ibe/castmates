import { getPerson } from "@/app/actions";
import { PersonBadgeUI } from "@/components/ui/person-badge-ui";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type PersonProps = {
  id: number;
};

export const PersonBadge = (props: PersonProps) => {
  const { id } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const filteredList = searchParams.getAll("f").map((id) => parseInt(id, 10));
  const checked = !filteredList.includes(id);

  const { data: person, status } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
  });

  const handleRemove = () => {
    const _id = id.toString();
    if (!searchParams.has("p", _id)) return;

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

  const handleCheckedChange = (checked: boolean) => {
    let verb;
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.delete("f", id.toString());
      verb = "added";
    } else {
      verb = "filtered";
      params.append("f", id.toString());
    }
    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);

    toast(`${person?.name} ${verb}`, {
      duration: 3000,
      action: {
        label: "Undo",
        onClick: () => router.back(),
      },
    });
  };

  return (
    <PersonBadgeUI
      id={id}
      name={person?.name ?? ""}
      status={status}
      checked={checked}
      handleRemove={handleRemove}
      handleCheckedChange={handleCheckedChange}
    />
  );
};
