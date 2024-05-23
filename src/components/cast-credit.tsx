import { imgBasePath } from "@/lib/constants";
import { type MovieDetails } from "@/service/movies/types";
import { Card, Heading, Image, Text } from "@chakra-ui/react";

type CastCreditProps = {
  credit: MovieDetails["credits"]["cast"][number];
};

export const CastCredit = (props: CastCreditProps) => {
  const { credit } = props;

  return (
    <Card direction={{ base: "column", sm: "row" }}>
      <Image
        objectFit="cover"
        src={`${imgBasePath}${credit.profile_path}`}
        alt={credit.name}
        boxSize="150px"
      />
      <div className="p-3">
        <Heading size="sm">{credit.name}</Heading>
        <Text>{credit.character}</Text>
      </div>
    </Card>
  );
};
