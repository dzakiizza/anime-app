import { useAppContext } from "@/context/app-provider";
import { useFormCollection } from "@/hooks/useFormCollection";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

const ModalEditCollection = ({
  collectionId,
  collectionName,
  title,
  isOpen,
  onClose,
}: {
  collectionId: string;
  collectionName: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isFieldTouched, setIsFieldTouched] = React.useState(false);
  const { collectionList, action } = useAppContext();
  const { val, setVal, error } = useFormCollection(
    collectionList,
    collectionName
  );

  const closeModal = () => {
    setIsFieldTouched(false);
    onClose();
  };

  const handleEdit = () => {
    if (!error && val !== "") {
      action.editCollection(collectionId, val);
      closeModal();
    } else {
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        setVal(collectionName);
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={!!error && isFieldTouched}>
            <FormLabel>Collection name</FormLabel>
            <Input
              value={val}
              onChange={(e) => {
                setVal(e.target.value);
              }}
              onFocus={() => {
                setIsFieldTouched(true);
              }}
            />
            <FormErrorMessage fontSize={"xs"}>{error}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleEdit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditCollection;
