import BaseContainer from "@/components/base-container";
import CollectionCard from "@/components/collection-card";
import EmptyState from "@/components/empty-state";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { useAppContext } from "@/context/app-provider";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import dynamic from "next/dynamic";

const ModalDeleteCollection = dynamic(
  () => import("@/components/modal-delete-collection")
);
const ModalAddCollection = dynamic(
  () => import("@/components/modal-add-collection")
);
const ModalEditCollection = dynamic(
  () => import("@/components/modal-edit-collection")
);

const CollectionPage = () => {
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
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
  const { collectionList } = useAppContext();
  const [selected, setSelected] = React.useState({
    collectionId: "",
    collectionName: "",
  });

  const handleOpenModal = (
    collectionId: string,
    collectionName: string,
    variant: "edit" | "remove"
  ) => {
    setSelected({ collectionId, collectionName });
    if (variant === "remove") {
      onOpenRemove();
    } else {
      onOpenEdit();
    }
  };

  return (
    <BaseContainer pt={{ base: "32", md: "40" }}>
      <VStack gap="12px" alignItems="center" p={{ base: "0", lg: "4" }}>
        <Flex
          w="full"
          justifyContent="space-between"
          alignItems="center"
          mb="5"
        >
          <Heading size="lg">Collection List</Heading>

          <IconButton
            onClick={onOpenAdd}
            bgGradient="linear(to-r, teal.600, green.300)"
            icon={<SmallAddIcon fontSize="24px" />}
            size={{ base: "sm", md: "md" }}
            aria-label={"add-collection"}
          />
        </Flex>
        {collectionList.length ? (
          <SimpleGridWrapper>
            {collectionList.map((item) => (
              <CollectionCard
                key={item.name}
                openModalAction={handleOpenModal}
                item={item}
              />
            ))}
          </SimpleGridWrapper>
        ) : (
          <EmptyState
            title="No collection"
            message="You do not have a collection yet"
          />
        )}
      </VStack>
      <ModalAddCollection
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        title="Add a collection"
      />
      <ModalDeleteCollection
        collectionName={selected.collectionName}
        collectionId={selected.collectionId}
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        title="Remove a collection"
      />
      <ModalEditCollection
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        title="Edit name"
        collectionName={selected.collectionName}
        collectionId={selected.collectionId}
      />
    </BaseContainer>
  );
};

export default CollectionPage;
