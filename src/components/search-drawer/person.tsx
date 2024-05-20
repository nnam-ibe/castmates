import { imgBasePath } from "@/lib/constants";
import { Avatar, Box } from "@chakra-ui/react";

type PersonResultProps = {
  name: string;
  profile_path?: string;
};

export const PersonResult = (props: PersonResultProps) => {
  return (
    <Box
      as="button"
      _hover={{ bg: "#ebedf0" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      className="flex justify-start items-center w-full gap-4"
      px={2}
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
