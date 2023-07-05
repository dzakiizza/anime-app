import AnimeDetailLoading from "@/components/anime-detail-loading";
import BaseContainer from "@/components/base-container";
import CollectionCard from "@/components/collection-card";
import ErrorState from "@/components/error-state";
import ModalAddAnime from "@/components/modal-add-anime";
import ModalAddCollection from "@/components/modal-add-collection";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { useAppContext } from "@/context/app-provider";
import { GET_ANIME_DETAILS } from "@/graphql/queries";
import { MediaAnimeDetail, MediaAnimeList } from "@/graphql/queries-types";
import { graphqlClient } from "@/lib/client";
import { ApolloError } from "@apollo/client";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export const getServerSideProps: GetServerSideProps<
  {
    data: MediaAnimeDetail;
  } & {
    loading?: boolean;
    error?: ApolloError | null;
  }
> = async ({ params }) => {
  const { loading, error, data } = await graphqlClient.query<MediaAnimeDetail>({
    query: GET_ANIME_DETAILS,
    variables: { id: params?.id },
  });
  const err = typeof error === "undefined" ? null : error;
  return {
    props: {
      data,
      loading,
      error: err,
    },
  };
};

const DetailAnimePage = ({
  data,
  loading,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { collectionList } = useAppContext();
  const {
    isOpen: isOpenAddAnime,
    onOpen: onOpenAddAnime,
    onClose: onCloseAddAnime,
  } = useDisclosure();
  const {
    isOpen: isOpenAddCollection,
    onOpen: onOpenAddCollection,
    onClose: onCloseAddCollection,
  } = useDisclosure();
  const cardData: MediaAnimeList = {
    title: data.Media.title,
    id: data.Media.id,
    averageScore: data.Media.averageScore,
    seasonYear: data.Media.seasonYear,
    coverImage: data.Media.coverImage,
  };
  const collectionInfo = React.useMemo(() => {
    return collectionList.filter((item) =>
      item.animeList.find(
        (anime: Partial<MediaAnimeList>) =>
          anime?.title?.romaji === data.Media.title.romaji
      )
    );
  }, [collectionList]);

  if (error) {
    return <ErrorState />;
  }

  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="4">
      {loading ? (
        <AnimeDetailLoading />
      ) : (
        <Flex
          w="full"
          p="4"
          bg="blackAlpha.300"
          borderRadius="16px"
          gap={{ base: "16px", md: "24px" }}
          flexDir={{ base: "column", md: "row" }}
        >
          <Image
            src={data.Media.coverImage.extraLarge || ""}
            alt={"anime-detail-image"}
            h={{ base: "full", md: "600px" }}
            w={{ base: "full", md: "400px" }}
          />
          <VStack gap="40px" alignItems="flex-start">
            <VStack alignItems="flex-start" gap="8px">
              <Button
                size="sm"
                onClick={
                  collectionList.length ? onOpenAddAnime : onOpenAddCollection
                }
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
                      <CollectionCard
                        key={item.name}
                        item={item}
                        mode="display"
                      />
                    ))}
                  </SimpleGridWrapper>
                </>
              )}
            </VStack>
          </VStack>
        </Flex>
      )}
      <ModalAddAnime
        isOpen={isOpenAddAnime}
        onClose={onCloseAddAnime}
        data={cardData}
        collectionInfo={collectionInfo}
        footerMessage="The anime that has been added can not remove from this modal"
      />
      <ModalAddCollection
        isOpen={isOpenAddCollection}
        onClose={onCloseAddCollection}
        title="New Collection"
        footerMessage="You dont have a collection yet. Set a new collection first"
      />
    </BaseContainer>
  );
};

export default DetailAnimePage;
