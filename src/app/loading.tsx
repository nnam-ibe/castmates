import { Center, Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center className="flex h-dvh">
      <Stack>
        <Skeleton height="150px" />
        <Skeleton height="150px" />
        <Skeleton height="150px" />
      </Stack>
    </Center>
  );
}
