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
  useToast,
} from "@chakra-ui/react";
import React from "react";

const ModalAddAnime = ({
  data,
  isOpen,
  collectionInfo,
  onClose,
  resetBulk,
  footerMessage,
  mode = "single",
}: {
  data: MediaAnimeList | (MediaAnimeList | undefined)[];
  collectionInfo?: CollectionList[];
  isOpen: boolean;
  onClose: () => void;
  resetBulk?: () => void;
  footerMessage?: string;
  mode?: "single" | "bulk";
}) => {
  const { collectionList, action } = useAppContext();
  const toast = useToast();
  const selectedList = React.useMemo(() => {
    if (collectionInfo) {
      return collectionInfo.map((item) => item.name);
    } else {
      return [];
    }
  }, [collectionInfo]);

  const [selectedCollection, setSelectedCollecation] =
    React.useState<(string | number)[]>(selectedList);

  const [isDirty, setIsDirty] = React.useState(false);

  const showToast = () => {
    toast({
      title: "Success",
      description:
        "Anime has been added. Check the selected collection to see the anime",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  const handleSubmit = React.useCallback(() => {
    if (mode === "single") {
      action.addAnime(selectedCollection, data as MediaAnimeList);
      onClose();
      showToast();
    } else {
      action.addBulkAnime(selectedCollection, data as MediaAnimeList[]);
      if (resetBulk) resetBulk();
      onClose();
      setSelectedCollecation([]);
      showToast();
    }
  }, [
    mode,
    action.addAnime,
    action.addBulkAnime,
    selectedCollection,
    data,
    isDirty,
  ]);

  React.useEffect(() => {
    if (JSON.stringify(selectedCollection) === JSON.stringify(selectedList)) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  }, [selectedList, selectedCollection]);

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
            onClick={handleSubmit}
            isDisabled={!isDirty}
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
