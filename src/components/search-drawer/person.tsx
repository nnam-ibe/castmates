import { imgBasePath } from "@/lib/constants";
import { Avatar, Box } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

type PersonResultProps = {
  id: number;
  name: string;
  profile_path?: string;
};

export const PersonResult = (props: PersonResultProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const _id = props.id.toString();
  const isDisabled = searchParams.has("p", _id);

  const updateSearchParams = useCallback(() => {
    if (searchParams.has("p", _id)) return;
    const params = new URLSearchParams(searchParams);
    params.append("p", _id);

    const newQuery = params.toString();
    router.push(`${pathname}?${newQuery}`);
  }, [searchParams, _id, router, pathname]);

  return (
    <Box
      as="button"
      _hover={{ bg: "#ebedf0" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      _disabled={{ bg: "#DCDCDC", transform: "none" }}
      className={twMerge(
        "flex justify-start items-center w-full gap-4",
        isDisabled ? "cursor-not-allowed" : ""
      )}
      px={2}
      onClick={updateSearchParams}
      disabled={isDisabled}
    >
      <Avatar
        name={props.name}
        src={`${imgBasePath}${props.profile_path}`}
        size="lg"
      />
      {props.name}
    </Box>
  );
};
