import AnimeDetailContent from "@/components/anime-detail-content";
import AnimeDetailLoading from "@/components/anime-detail-loading";
import BaseContainer from "@/components/base-container";
import ErrorState from "@/components/error-state";
import ModalAddAnime from "@/components/modal-add-anime";
import ModalAddCollection from "@/components/modal-add-collection";
import { useAppContext } from "@/context/app-provider";
import { GET_ANIME_DETAILS } from "@/graphql/queries";
import { MediaAnimeDetail, MediaAnimeList } from "@/graphql/queries-types";
import { graphqlClient } from "@/lib/client";
import { ApolloError } from "@apollo/client";
import {
  useDisclosure
} from "@chakra-ui/react";
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
        <AnimeDetailContent
          data={data}
          collectionList={collectionList}
          collectionInfo={collectionInfo}
          onOpenAddAnime={onOpenAddAnime}
          onOpenAddCollection={onOpenAddCollection}
        />
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
