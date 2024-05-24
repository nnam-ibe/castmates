import { GenreMapping, imgBasePath } from "@/lib/constants";
import { type CombinedCredits } from "@/service/people/types";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type MovieProps = {
  movie: CombinedCredits["cast"][number];
};
export const MovieCard = (props: MovieProps) => {
  const searchParams = useSearchParams();
  const { movie } = props;

  let title = movie.title ?? movie.name;
  if (movie.release_date)
    title += ` (${new Date(movie.release_date).getFullYear()})`;

  const params = new URLSearchParams(searchParams);
  const link = `/${movie.media_type}/${movie.id}?${params}`;

  return (
    <Flex gap="2">
      <Link href={link}>
        <Image
          boxSize="150px"
          objectFit="contain"
          src={`${imgBasePath}${movie.poster_path}`}
          alt={title}
          className="min-w-[100px] max-w-[100px]"
        />
      </Link>
      <Box p="2">
        <Link href={link}>
          <Heading size="md">{title}</Heading>
        </Link>
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

export const MovieCardSkeleton = () => (
  <Flex gap="2">
    <Skeleton
      boxSize="150px"
      objectFit="contain"
      className="min-w-[100px] max-w-[100px]"
    />
    <Box p="2">
      <Skeleton size="md" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" paddingRight="5rem" />
      <Stack direction="row">
        <Skeleton width="50px" />
        <Skeleton width="50px" />
        <Skeleton width="50px" />
      </Stack>
    </Box>
  </Flex>
);
