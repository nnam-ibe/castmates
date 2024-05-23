import { Center, Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <Center className="flex h-dvh">
      <Spinner size="xl" />
    </Center>
  );
}
