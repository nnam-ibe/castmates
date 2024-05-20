"use client";

import { useSearchParams } from "next/navigation";
import { SelectedPerson } from "./selected-person";
import { VStack } from "@chakra-ui/react";

export const SelectedList = () => {
  const searchParams = useSearchParams();
  const people = searchParams.getAll("p");

  return (
    <VStack spacing="1rem" className="pt-4">
      {people.map((pid) => {
        const id = Number(pid);
        return <SelectedPerson key={id} id={id} />;
      })}
    </VStack>
  );
};
