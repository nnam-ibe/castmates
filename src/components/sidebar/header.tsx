"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const Header = () => {
  const searchParams = useSearchParams();

  return (
    <header>
      <div className="h-14 text-white py-2 flex items-center gap-2">
        <span className="md:hidden">
          <IconButton
            variant="ghost"
            aria-label="Open Search Menu"
            icon={<HamburgerIcon />}
          />
        </span>
        <Link href={`/?${searchParams}`}>
          <h1 className="text-xl font-bold">Castmates</h1>
        </Link>
      </div>
    </header>
  );
};
