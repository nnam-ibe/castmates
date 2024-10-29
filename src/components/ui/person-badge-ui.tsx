import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

type PersonBadge = {
  id: number;
  name: string;
  status: "pending" | "error" | "success";
  checked: boolean;
  handleRemove: () => void;
  handleCheckedChange: (checked: boolean) => void;
};

export const PersonBadgeUI = (props: PersonBadge) => {
  const { id, name, status, checked, handleCheckedChange, handleRemove } =
    props;

  return (
    <span
      key={id}
      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
    >
      {status === "pending" ? (
        <Skeleton className="w-36 h-[22px]" />
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={checked}
              onCheckedChange={handleCheckedChange}
            />
            <Label htmlFor="airplane-mode">{name}</Label>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-blue-200 rounded-full"
          >
            <Trash2 size="15" />
          </button>
        </>
      )}
    </span>
  );
};
