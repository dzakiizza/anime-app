import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Flex,
  VStack,
  Button,
  Heading,
  Badge,
  Tag,
  Text,
  Image,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import CollectionCard from "./collection-card";
import SimpleGridWrapper from "./simple-grid-wrapper";
import { MediaAnimeDetail } from "@/graphql/queries-types";
import { CollectionList } from "@/context/app-provider";

const AnimeDetailContent = ({
  data,
  collectionList,
  collectionInfo,
  onOpenAddAnime,
  onOpenAddCollection
}: {
  data: MediaAnimeDetail;
  collectionList: CollectionList[];
  collectionInfo: CollectionList[];
  onOpenAddAnime: () => void;
  onOpenAddCollection: () => void;
}) => (
  <Flex
    w="full"
    p="4"
    bg="blackAlpha.300"
    borderRadius="16px"
    gap={{ base: "16px", md: "24px" }}
    flexDir={{ base: "column", lg: "row" }}
  >
    <Image
      src={data.Media.coverImage.extraLarge || ""}
      alt={"anime-detail-image"}
      h={{ base: "full", lg: "600px" }}
      w={{ base: "full", lg: "400px" }}
    />
    <VStack gap="40px" alignItems="flex-start">
      <VStack alignItems="flex-start" gap="8px">
        <Button
          size="sm"
          onClick={collectionList.length ? onOpenAddAnime : onOpenAddCollection}
          borderRadius="8px"
          colorScheme="teal"
          leftIcon={<SmallAddIcon fontSize="20px" />}
        >
          Add to collection
        </Button>
        <Heading>{data.Media.title.romaji}</Heading>
        <Flex gap="16px">
          <Badge variant="subtle" colorScheme="teal" fontSize="lg">
            {data.Media.format}
          </Badge>
          <Badge variant="subtle" colorScheme="yellow" fontSize="lg">
            {data.Media.averageScore} / 100
          </Badge>
          <Badge variant="subtle" colorScheme="green" fontSize="lg">
            {data.Media.episodes} episodes
          </Badge>
        </Flex>
      </VStack>

      <VStack gap="8px">
        <Flex width="full" gap="12px" flexWrap="wrap">
          {data.Media.genres.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Flex>
        <Text fontStyle="italic" px={{ base: 3, lg: 0 }} pt={5}>
          “{parse(`${data.Media.description}`)}”
        </Text>
        {collectionInfo.length && (
          <>
            <Heading size="md">Collection Info</Heading>

            <SimpleGridWrapper columns={{ base: 2, md: 3 }}>
              {collectionInfo.map((item) => (
                <CollectionCard key={item.name} item={item} mode="display" />
              ))}
            </SimpleGridWrapper>
          </>
        )}
      </VStack>
    </VStack>
  </Flex>
);

export default AnimeDetailContent;
