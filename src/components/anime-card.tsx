import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  HStack,
  Tag,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { MediaAnimeList } from "@/graphql/queries-types";

const AnimeCard = ({
  coverImage,
  title,
  averageScore,
  seasonYear,
}: Pick<
  MediaAnimeList,
  "averageScore" | "coverImage" | "seasonYear" | "title"
>) => (
  <Card
    _hover={{
      transform: "scale(1.1)",
      zIndex: 99,
      cursor: "pointer",
    }}
    transition="all 0.5s ease-in-out"
    boxShadow={
      "0px 0px 6px -2px rgba(0, 0, 0, 0.12), 0px 8px 24px -4px rgba(0, 0, 0, 0.08)"
    }
    maxW="200px"
  >
    <CardBody p="0" borderRadius="8px">
      <Image
        borderTopRadius="8px"
        alt="anime-cover"
        src={coverImage.large}
        w="100%"
        h={{ base: "220px", md: "280px" }}
      />
      <HStack px="4" pt="4" justify="space-between" alignItems="center">
        <Tag size={"sm"} variant="solid" colorScheme="teal">
          {seasonYear}
        </Tag>
        <Flex alignItems="center" gap="2">
          <StarIcon color="yellow.400" />
          <Text
            noOfLines={1}
            fontSize={{ base: "12px", lg: "14px" }}
            fontWeight="600"
          >
            {averageScore} / 100
          </Text>
        </Flex>
      </HStack>
      <HStack p="4">
        <Text noOfLines={3} fontSize="14px" fontWeight="600">
          {title.romaji}
        </Text>
      </HStack>
    </CardBody>
  </Card>
);

export default AnimeCard;
