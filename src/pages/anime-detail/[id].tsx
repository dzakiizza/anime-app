import AnimeDetailLoading from "@/components/anime-detail-loading";
import BaseContainer from "@/components/base-container";
import ErrorState from "@/components/error-state";
import { GET_ANIME_DETAILS } from "@/graphql/queries";
import { MediaAnimeDetail, MediaAnimeList } from "@/graphql/queries-types";
import { graphqlClient } from "@/lib/client";
import { ApolloError } from "@apollo/client";
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
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import parse from "html-react-parser";
import ModalAddAnime from "@/components/modal-add-anime";
import { useAppContext } from "@/context/app-provider";
import { CloseIcon } from "@chakra-ui/icons";

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
  if (error || loading) {
    return {
      props: {
        data,
        loading,
        error: err,
      },
    };
  }
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cardData: MediaAnimeList = {
    title: data.Media.title,
    id: data.Media.id,
    averageScore: data.Media.averageScore,
    seasonYear: data.Media.seasonYear,
    coverImage: data.Media.coverImage,
  };
  if (error) {
    return <ErrorState />;
  }

  const collectionInfo = collectionList.filter((item) =>
    item.animeList.find(
      (anime: MediaAnimeList) => anime.title.romaji === data.Media.title.romaji
    )
  );

  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="4">
      {loading ? (
        <AnimeDetailLoading />
      ) : (
        <Flex
          w="full"
          p="4"
          bg="gray.700"
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
                onClick={onOpen}
                borderRadius="8px"
                colorScheme="teal"
                leftIcon={<CloseIcon transform="rotate(45deg)" fontSize="10px" />}
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
            </VStack>
          </VStack>
        </Flex>
      )}
      <ModalAddAnime
        isOpen={isOpen}
        onClose={onClose}
        data={cardData}
        collectionInfo={collectionInfo}
      />
    </BaseContainer>
  );
};

export default DetailAnimePage;
