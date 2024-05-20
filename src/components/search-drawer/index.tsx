"use client";

import { searchPeople } from "@/app/actions";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useRef, useState } from "react";
import { ResultList } from "./result-list";

export const SearchDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: people } = useQuery({
    queryKey: ["people", debouncedQuery],
    queryFn: () => searchPeople(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    initialData: [],
  });

  return (
    <>
      <Button
        leftIcon={<SearchIcon />}
        ref={btnRef.current}
        colorScheme="teal"
        onClick={onOpen}
      >
        Add an actor
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef.current}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search for an actor</DrawerHeader>

          <DrawerBody
            className="flex flex-col gap-4 px-0"
            paddingInlineStart={0}
            paddingInlineEnd={0}
          >
            <div className="p-6">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="lg"
                placeholder="Tom Hanks..."
                autoFocus
              />
            </div>
            <ResultList people={people} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Select</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
