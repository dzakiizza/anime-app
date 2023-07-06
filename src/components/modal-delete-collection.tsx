import { useAppContext } from "@/context/app-provider";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const ModalDeleteCollection = ({
  collectionName,
  collectionId,
  title,
  isOpen,
  onClose,
}: {
  collectionName: string;
  collectionId: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { action } = useAppContext();
  const toast = useToast();
  const handleRemove = React.useCallback(() => {
    action.removeCollection(collectionId);
    onClose();
    toast({
      title: "Success",
      description: "A collection has been deleted",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  }, [action.removeCollection, collectionId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="4px">
            <Text>Are you sure want to delete</Text>
            <Text color="pink.300">{collectionName}</Text>
            <Text>?</Text>
          </Flex>
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

export default ModalDeleteCollection;
