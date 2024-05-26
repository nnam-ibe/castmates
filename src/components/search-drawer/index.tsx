"use client";

import { searchPeople } from "@/app/actions";
import { AddIcon } from "@chakra-ui/icons";
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
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useRef, useState } from "react";
import { ResultList } from "./result-list";

export const SearchDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: people } = useQuery({
    queryKey: ["people", debouncedQuery],
    queryFn: () => searchPeople(debouncedQuery),
    staleTime: 0,
    enabled: debouncedQuery.length >= 3,
    initialData: [],
  });

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        ref={btnRef.current}
        colorScheme="teal"
        onClick={onOpen}
        className="w-full"
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
