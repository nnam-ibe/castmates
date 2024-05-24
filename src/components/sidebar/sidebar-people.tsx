"use client";

import { VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { SidebarPerson } from "./sidebar-person";

export const SidebarPeople = () => {
  const searchParams = useSearchParams();
  const people = searchParams.getAll("p");

  return (
    <VStack spacing="1rem" className="pt-4">
      {people.map((pid) => {
        const id = Number(pid);
        return <SidebarPerson key={id} id={id} />;
      })}
    </VStack>
  );
};
