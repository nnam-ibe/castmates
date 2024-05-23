"use client";
import { Center, Button, VStack, Heading } from "@chakra-ui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Center className="flex h-dvh">
      <VStack>
        <Heading>{error.message}</Heading>
        <Button colorScheme="red" onClick={() => reset()}>
          Try again!
        </Button>
      </VStack>
    </Center>
  );
}
