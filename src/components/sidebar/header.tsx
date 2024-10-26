"use client";

import { SearchDrawer } from "@/components/search-drawer";
import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { SidebarPeople } from "./sidebar-people";

export const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header>
        <div className="h-14 text-white py-2 flex items-center gap-2">
          <span className="h-fit md:hidden">
            <IconButton
              variant="subtle"
              aria-label="Open Search Menu"
              icon={<SearchIcon />}
              onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            />
          </span>
          <Link href={`/?${searchParams}`}>
            <h1 className="text-xl font-bold">Castmates</h1>
          </Link>
        </div>
      </header>
      <div
        className={twMerge(
          "gap-4 flex-col",
          isOpen ? "flex" : "hidden md:flex"
        )}
      >
        <SidebarPeople />
        <SearchDrawer />
      </div>
    </>
  );
};
