"use client";

import { imgBasePath } from "@/lib/constants";
import { type Cast as MovieCast } from "@/service/movies/types";
import { type Cast as SeriesCast } from "@/service/tv/types";
import { Card, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type CastCreditProps = {
  credit: MovieCast | SeriesCast;
};

export const CastCredit = (props: CastCreditProps) => {
  const { credit } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const toast = useToast();

  const handleAddPerson = useCallback(() => {
    const _id = credit.id.toString();
    if (searchParams.has("p", _id)) {
      toast({
        title: `${credit.name} already added to search`,
        status: "info",
        isClosable: true,
      });
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.append("p", _id);

    const newQuery = params.toString();
    const newUrl = `${pathname}?${newQuery}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    toast({
      title: `Added ${credit.name} to search`,
      status: "success",
      isClosable: true,
    });
  }, [searchParams, credit.id, credit.name, toast, pathname]);

  return (
    <Card direction={{ base: "column", sm: "row" }}>
      <Image
        className="cursor-pointer"
        objectFit="cover"
        src={`${imgBasePath}${credit.profile_path}`}
        alt={credit.name}
        boxSize="150px"
        fallbackSrc="https://via.placeholder.com/150"
        onClick={handleAddPerson}
      />
      <div className="p-3">
        <Heading size="sm">{credit.name}</Heading>
        <Text>{credit.character}</Text>
      </div>
    </Card>
  );
};
