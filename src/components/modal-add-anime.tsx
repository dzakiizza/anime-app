import { useAppContext } from "@/context/app-provider";
import { MediaAnimeDetail, MediaAnimeList } from "@/graphql/queries-types";
import { useFormCollection } from "@/hooks/useFormCollection";
import { CloseIcon } from "@chakra-ui/icons";
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
  Heading,
  VStack,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";

const ModalAddAnime = ({
  name,
  data,
  isOpen,
  collectionInfo,
  onClose,
}: {
  name?: string;
  data: MediaAnimeList;
  collectionInfo: Record<string, any>[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { collectionList, action } = useAppContext();
  const selectedList = collectionInfo.map((item) => item.name);

  const [selectedCollection, setSelectedCollecation] =
    React.useState<(string | number)[]>(selectedList);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Add anime</ModalHeader>

        <ModalBody>
          <VStack
            mt={{ base: "8px", md: "16px" }}
            alignItems="flex-start"
            gap="12px"
          >
            <Heading size="sm">Available collection:</Heading>
            <CheckboxGroup
              colorScheme="teal"
              onChange={(item) => {
                setSelectedCollecation(item);
              }}
              value={selectedCollection}
            >
              {collectionList.map((item, idx) => (
                <Checkbox
                  key={idx}
                  value={item.name}
                  isReadOnly={selectedList.includes(item.name)}
                >
                  {item.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </VStack>
        </ModalBody>

        <ModalFooter flexDir="column" gap="8px" alignItems="flex-start">
          <Button
            colorScheme="teal"
            mr={3}
            w="full"
            onClick={() => {
              action.addAnime(selectedCollection, data);
              onClose();
            }}
          >
            Submit
          </Button>
          <Text fontSize="12px">
            The anime that has been added can not remove from this modal
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddAnime;
