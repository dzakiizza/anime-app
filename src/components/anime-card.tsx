import { MediaAnimeList } from "@/graphql/queries-types";
import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Flex,
  HStack,
  Tag,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

const AnimeCard = ({
  coverImage,
  title,
  averageScore,
  seasonYear,
}: Pick<
  MediaAnimeList,
  "averageScore" | "coverImage" | "seasonYear" | "title"
>) => {
  const heightImage = useBreakpointValue({ base: 220, md: 280 });
  const scaleVal = useBreakpointValue({ base: "scale(1)", sm: "scale(1.1)" });

  return (
    <Card
      _hover={{
        transform: scaleVal,
        zIndex: 99,
        cursor: "pointer",
      }}
      transition="all 0.5s ease-in-out"
      boxShadow={
        "0px 0px 6px -2px rgba(0, 0, 0, 0.12), 0px 8px 24px -4px rgba(0, 0, 0, 0.08)"
      }
      w="100%"
      h="100%"
    >
      <CardBody p="0" borderRadius="8px">
        <Flex h={heightImage} pos="relative" w="100%">
          <Image
            style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            alt="anime-cover"
            src={coverImage.large}
            fill
          />
        </Flex>

        <HStack px="4" pt="4" justify="space-between" alignItems="center">
          <Tag
            size={"sm"}
            variant="solid"
            colorScheme="teal"
            justifyContent="center"
          >
            {seasonYear}
          </Tag>
          <Flex alignItems="center" gap="2">
            <StarIcon color="yellow.400" />
            <Text
              textAlign="center"
              noOfLines={2}
              fontSize={{ base: "11px", md: "12px", lg: "14px" }}
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
};

export default AnimeCard;
