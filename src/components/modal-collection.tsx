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
  Flex,
  Text,
} from "@chakra-ui/react";

const ModalCollection = ({
  name,
  title,
  variant,
  isOpen,
  onClose,
}: {
  name?: string;
  title: string;
  variant: "add" | "remove" | "edit";
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { collectionList, action } = useAppContext();
  const { val, setVal, error } = useFormCollection(collectionList);
  const handleAdd = () => {
    if (!error && val !== "") {
      action.addCollection(val);
      onClose();
      setVal("");
    }
  };
  const handleRemove = () => {
    onClose();
    if (name) action.removeCollection(name);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {variant === "add" && (
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
          )}
          {variant === "remove" && (
            <Flex gap="4px">
              <Text>Are you sure want to delete</Text>
              <Text color="pink.300">{name}</Text>
              <Text>?</Text>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          {variant === "add" && (
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              Submit
            </Button>
          )}
          {variant === "remove" && (
            <Button colorScheme="pink" mr={3} onClick={handleRemove}>
              Remove
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCollection;
