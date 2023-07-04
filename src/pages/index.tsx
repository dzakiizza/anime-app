import AnimeCard from "@/components/anime-card";
import AnimeCardLoading from "@/components/anime-card-loading";
import BaseContainer from "@/components/base-container";
import Pagination from "@/components/pagination";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { GET_ANIME_LIST } from "@/graphql/queries";
import { AnimeListResponse } from "@/graphql/queries-types";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Text, Heading, VStack, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  CloseIcon,
  InfoIcon,
  WarningIcon,
  WarningTwoIcon,
  InfoOutlineIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import ErrorState from "@/components/error-state";

export default function Home() {
  const { loading, error, data, fetchMore } = useQuery<AnimeListResponse>(
    GET_ANIME_LIST,
    {
      variables: { page: 0, perPage: 10 },
      fetchPolicy: "cache-and-network",
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

  if (error) return <ErrorState />;

  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="4">
      <VStack p={{ base: "0", lg: "4" }} w="full">
        <Heading size="lg" mb="4">
          Top Anime List
        </Heading>
        {loading ? (
          <VStack gap="4" h="full" w="full">
            <SimpleGridWrapper>
              {[...Array(10)].map((_items, index) => (
                <AnimeCardLoading key={index} />
              ))}
            </SimpleGridWrapper>
          </VStack>
        ) : (
          <VStack gap="4" h="full" w="full">
            <SimpleGridWrapper justifyContent={"center"}>
              {data?.Page.media.map((item) => (
                <Link
                  key={item.id}
                  href={`/anime-detail/${item.id}`}
                  style={{ width: "100%" }}
                >
                  <AnimeCard
                    key={item.id}
                    averageScore={item.averageScore}
                    coverImage={item.coverImage}
                    seasonYear={item.seasonYear}
                    title={item.title}
                  />
                </Link>
              ))}
            </SimpleGridWrapper>
            <Pagination pageCount={pageCount} onClick={handleOnClick} />
          </VStack>
        )}
      </VStack>
    </BaseContainer>
  );
}
