import AnimeDetailLoading from "@/components/anime-detail-loading";
import BaseContainer from "@/components/base-container";
import { GET_ANIME_DETAILS } from "@/graphql/queries";
import { MediaAnimeDetail } from "@/graphql/queries-types";
import { graphqlClient } from "@/lib/client";
import { ApolloError } from "@apollo/client";
import {
  Badge,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import sanitizeHtml from "sanitize-html";

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
  if (error) null;

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
          gap="24px"
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
                “{sanitizeHtml(data.Media.description)}”
              </Text>
            </VStack>
          </VStack>
        </Flex>
      )}
    </BaseContainer>
  );
};

export default DetailAnimePage;
