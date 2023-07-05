import { useAppContext } from "@/context/app-provider";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ModalDeleteAnime = ({
  collectionId,
  animeName,
  id,
  title,
  isOpen,
  onClose,
}: {
  collectionId: string;
  animeName: string;
  id: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { action } = useAppContext();

  const handleRemove = React.useCallback(() => {
    action.removeAnime(id, collectionId);
    onClose();
  }, [action.removeAnime, id, collectionId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={{ base: "14px", md: "16px" }}>
            Are you sure want to delete{" "}
            <Text as="span" color="pink.300">
              {animeName}
            </Text>{" "}
            <Text as="span">?</Text>
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="pink" mr={3} onClick={handleRemove}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteAnime;
