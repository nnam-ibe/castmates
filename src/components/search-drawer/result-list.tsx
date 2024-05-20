import { type Person } from "@/service/people/types";
import { VStack } from "@chakra-ui/react";
import { PersonResult } from "./person";

type ResultListProps = {
  people: Person[];
};

export const ResultList = (props: ResultListProps) => {
  const { people } = props;
  return (
    <VStack spacing="1rem" className="overflow-auto">
      {people.map((person) => (
        <PersonResult
          key={person.id}
          name={person.name}
          profile_path={person.profile_path}
        />
      ))}
    </VStack>
  );
};
