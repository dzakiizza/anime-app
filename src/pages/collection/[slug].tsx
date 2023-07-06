import AnimeCard from "@/components/anime-card";
import BaseContainer from "@/components/base-container";
import EmptyState from "@/components/empty-state";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { useAppContext } from "@/context/app-provider";
import { EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const ModalEditCollection = dynamic(
  () => import("@/components/modal-edit-collection")
);
const ModalDeleteAnime = dynamic(
  () => import("@/components/modal-delete-anime")
);

const CollectionPageDetail = () => {
  const router = useRouter();
  const collectionId = router.query.slug || "";
  const { collectionList } = useAppContext();
  const [selectedAnime, setAnimeSelected] = React.useState({
    id: 0,
    animeName: "",
  });

  const collection = React.useMemo(() => {
    return collectionList.find((item) => item.id === collectionId);
  }, [collectionList, collectionId]);

  const {
    isOpen: isOpenRemove,
    onOpen: onOpenRemove,
    onClose: onCloseRemove,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const handleOpenRemoveModal = (id: number, animeName: string) => {
    setAnimeSelected({ id, animeName });
    onOpenRemove();
  };

  if (!router.isReady || !collection) return null;

  return (
    <BaseContainer pt={{ base: "32", md: "40" }} pb="24">
      <VStack p={{ base: "0", lg: "4" }} w="full">
        <Flex gap="8px" alignItems="center" mb="4">
          <Heading size="lg">{collection.name}</Heading>
          <IconButton
            icon={<EditIcon />}
            colorScheme="teal"
            aria-label={"edit-collection"}
            variant="ghost"
            onClick={onOpenEdit}
          />
        </Flex>
        <VStack gap="4" h="full" w="full">
          {collection?.animeList?.length ? (
            <SimpleGridWrapper justifyContent={"center"}>
              {collection?.animeList.map((item) => (
                <AnimeCard
                  key={item.id}
                  data={item}
                  mode="edit"
                  onOpenRemoveModal={handleOpenRemoveModal}
                />
              ))}
            </SimpleGridWrapper>
          ) : (
            <EmptyState
              title="No anime added"
              message="You have not added any anime into this collection yet"
            />
          )}
        </VStack>
      </VStack>
      <ModalDeleteAnime
        animeName={selectedAnime.animeName}
        id={selectedAnime.id}
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        title="Remove anime"
        collectionId={collection.id}
      />
      <ModalEditCollection
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        title="Edit name"
        collectionName={collection.name}
        collectionId={collection.id}
      />
    </BaseContainer>
  );
};

export default CollectionPageDetail;
