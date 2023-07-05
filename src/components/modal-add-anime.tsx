import { CollectionList, useAppContext } from "@/context/app-provider";
import { MediaAnimeList } from "@/graphql/queries-types";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ModalAddAnime = ({
  data,
  isOpen,
  collectionInfo,
  onClose,
  footerMessage,
}: {
  data: MediaAnimeList;
  collectionInfo: CollectionList[];
  isOpen: boolean;
  onClose: () => void;
  footerMessage?: string;
}) => {
  const { collectionList, action } = useAppContext();
  const selectedList = React.useMemo(() => {
    return collectionInfo.map((item) => item.name);
  }, [collectionInfo]);

  const [selectedCollection, setSelectedCollecation] =
    React.useState<(string | number)[]>(selectedList);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedCollecation(selectedList);
      }}
      size="xl"
    >
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
          {footerMessage && <Text fontSize="12px">{footerMessage}</Text>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddAnime;
