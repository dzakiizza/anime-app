import AnimeCard from "@/components/anime-card";
import AnimeCardLoading from "@/components/anime-card-loading";
import BaseContainer from "@/components/base-container";
import Pagination from "@/components/pagination";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { GET_ANIME_LIST } from "@/graphql/queries";
import { AnimeListResponse } from "@/graphql/queries-types";
import { useQuery } from "@apollo/client";
import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Image,
  HStack,
  Tag,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

export default function Home() {
  const { loading, error, data, fetchMore } = useQuery<AnimeListResponse>(
    GET_ANIME_LIST,
    {
      variables: { page: 1, perPage: 10 },
    }
  );

  const pageCount = React.useMemo(() => {
    if (data) {
      return data.Page.pageInfo.lastPage;
    }
    return 0;
  }, [data]);

  const handleOnClick = React.useCallback(
    (e: { selected: number }) => {
      fetchMore({
        variables: { page: e.selected + 1, perPage: 10 },
        updateQuery: (_prevResult, { fetchMoreResult }) => {
          return fetchMoreResult;
        },
      });
    },
    [fetchMore]
  );

  if (error) return null;
  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="4">
      <VStack p={{ base: "0", lg: "4" }} w="full">
        <Heading size="lg" mb="4">
          Top Anime List
        </Heading>
        {loading ? (
          <VStack gap="4" h="full" w="full">
            <SimpleGridWrapper>
              {[...Array(10)].map((index) => (
                <AnimeCardLoading key={index} />
              ))}
            </SimpleGridWrapper>
          </VStack>
        ) : (
          <VStack gap="4" h="full" w="full">
            <SimpleGridWrapper>
              {data?.Page.media.map((item) => (
                <AnimeCard
                  key={item.id}
                  averageScore={item.averageScore}
                  coverImage={item.coverImage}
                  seasonYear={item.seasonYear}
                  title={item.title}
                />
              ))}
            </SimpleGridWrapper>
            <Pagination pageCount={pageCount} onClick={handleOnClick} />
          </VStack>
        )}
      </VStack>
    </BaseContainer>
  );
}
