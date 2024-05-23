import { GenreMapping, imgBasePath } from "@/lib/constants";
import { type CombinedCredits } from "@/service/people/types";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

type MovieProps = {
  movie: CombinedCredits["cast"][number];
};
export const Movie = (props: MovieProps) => {
  const { movie } = props;

  let title = movie.title ?? movie.name;
  if (movie.release_date)
    title += ` (${new Date(movie.release_date).getFullYear()})`;

  return (
    <Flex gap="2">
      <Image
        boxSize="150px"
        objectFit="contain"
        src={`${imgBasePath}${movie.poster_path}`}
        alt={title}
        className="min-w-[100px] max-w-[100px]"
      />
      <Box p="2">
        <Heading size="md">{title}</Heading>
        <Text noOfLines={3} fontSize="md">
          {movie.overview}
        </Text>
        <Stack direction="row">
          {movie.genre_ids.map((id) => (
            <Badge key={id} colorScheme="blue">
              {GenreMapping[id as keyof typeof GenreMapping] ?? "-"}
            </Badge>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};
