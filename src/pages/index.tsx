import AnimeCard from "@/components/anime-card";
import AnimeCardLoading from "@/components/anime-card-loading";
import BaseContainer from "@/components/base-container";
import ErrorState from "@/components/error-state";
import HomeHeading from "@/components/home-heading";
import Pagination from "@/components/pagination";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { useAppContext } from "@/context/app-provider";
import { GET_ANIME_LIST } from "@/graphql/queries";
import { AnimeListResponse, MediaAnimeList } from "@/graphql/queries-types";
import { useQuery } from "@apollo/client";
import { VStack, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const ModalAddAnime = dynamic(() => import("@/components/modal-add-anime"));
const ModalAddCollection = dynamic(() => import("@/components/modal-add-collection"));


export default function Home() {
  const { collectionList } = useAppContext();
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

  const [isBulkMode, setBulkMode] = React.useState(false);
  const [selectedAnime, setSelectedAnime] = React.useState<
    Partial<MediaAnimeList[]>
  >([]);

  const resetBulk = () => {
    setBulkMode(false);
    setSelectedAnime([]);
  };

  const handleSelect = React.useCallback(
    (data: MediaAnimeList, isSelected: boolean, id: number | undefined) => {
      if (!isSelected) {
        setSelectedAnime((prev) => [...prev, data]);
      } else {
        setSelectedAnime((prev) => [...prev.filter((item) => item?.id !== id)]);
      }
    },
    []
  );

  const handleAddCollection = React.useCallback(() => {
    if (collectionList.length) {
      setBulkMode(!isBulkMode);
      setSelectedAnime([]);
    } else {
      onOpenAddCollection();
    }
  }, [collectionList, isBulkMode]);

  const handleOnClickPaginate = React.useCallback(
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

  const {
    isOpen: isOpenAddCollection,
    onOpen: onOpenAddCollection,
    onClose: onCloseAddCollection,
  } = useDisclosure();

  const {
    isOpen: isOpenAddAnime,
    onOpen: onOpenAddAnime,
    onClose: onCloseAddAnime,
  } = useDisclosure();

  if (error) return <ErrorState />;

  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="24">
      <VStack p={{ base: "0", lg: "4" }} w="full">
        <HomeHeading
          isBulkMode={isBulkMode}
          selectedAnime={selectedAnime}
          onOpenAddAnime={onOpenAddAnime}
          handleAddCollection={handleAddCollection}
        />
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
                <AnimeCard
                  key={item.id}
                  data={item}
                  mode={isBulkMode ? "bulk" : "display"}
                  handleSelect={handleSelect}
                  selectedAnime={selectedAnime}
                />
              ))}
            </SimpleGridWrapper>
            <Pagination pageCount={pageCount} onClick={handleOnClickPaginate} />
          </VStack>
        )}
      </VStack>
      <ModalAddCollection
        isOpen={isOpenAddCollection}
        onClose={onCloseAddCollection}
        title="New Collection"
        footerMessage="You dont have a collection yet. Set a new collection first"
      />
      <ModalAddAnime
        isOpen={isOpenAddAnime}
        onClose={onCloseAddAnime}
        resetBulk={resetBulk}
        data={selectedAnime}
        footerMessage="The anime that has been added can not remove from this modal"
        mode="bulk"
      />
    </BaseContainer>
  );
}
