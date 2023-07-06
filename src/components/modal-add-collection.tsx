import { useAppContext } from "@/context/app-provider";
import { useFormCollection } from "@/hooks/useFormCollection";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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

const ModalAddCollection = ({
  title,
  isOpen,
  onClose,
  footerMessage,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  footerMessage?: string;
}) => {
  const { collectionList, action } = useAppContext();
  const { val, setVal, error } = useFormCollection(collectionList);
  const toast = useToast();

  const closeModal = () => {
    onClose();
    setVal("");
  };

  const handleAdd = React.useCallback(() => {
    action.addCollection(val);
    closeModal();
    toast({
      title: "Success",
      description:
        "A new collection has been added",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  }, [action.addCollection, error, val]);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={!!error}>
            <FormLabel>Collection name</FormLabel>
            <Input
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
              }}
            />
            <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter flexDir="column" gap="8px" alignItems="flex-start">
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleAdd}
            w="full"
            isDisabled={error !== "" || val === ""}
          >
            Submit
          </Button>
          {footerMessage && <Text fontSize="12px">{footerMessage}</Text>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddCollection;
