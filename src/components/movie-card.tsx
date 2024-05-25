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
          fallbackSrc="https://via.placeholder.com/150"
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
    <div className="flex flex-1 flex-col gap-2 pl-2 w-full">
      <Skeleton size="md" />
      <Skeleton height="15" rounded="md" />
      <Skeleton height="15px" rounded="md" />
      <Skeleton height="15px" rounded="md" marginRight="5rem" />
      <Stack direction="row">
        <Skeleton height="20px" width="50px" rounded="md" />
        <Skeleton height="20px" width="50px" rounded="md" />
        <Skeleton height="20px" width="50px" rounded="md" />
      </Stack>
    </div>
  </Flex>
);
