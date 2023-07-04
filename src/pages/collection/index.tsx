import BaseContainer from "@/components/base-container";
import EmptyState from "@/components/empty-state";
import ModalCollection from "@/components/modal-collection";
import SimpleGridWrapper from "@/components/simple-grid-wrapper";
import { useAppContext } from "@/context/app-provider";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

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
  const { collectionList } = useAppContext();
  const heightImage = useBreakpointValue({ base: 220, md: 280 });
  const [selected, setSelected] = React.useState("");
  
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
            icon={<CloseIcon transform={"rotate(45deg)"} />}
            size={{ base: "sm", md: "md" }}
            aria-label={"add-collection"}
          />
        </Flex>
        {collectionList.length ? (
          <SimpleGridWrapper>
            {collectionList.map((item, idx) => (
              <Card key={idx}>
                <CardBody p="0" borderRadius="8px">
                  <Flex
                    borderTopRadius="8px"
                    h={heightImage}
                    pos="relative"
                    w="100%"
                    bgGradient={`linear(to-r, teal.400, ${
                      item.color || "green.400"
                    })`}
                  />
                  <VStack p="4" gap="16px">
                    <Text
                      noOfLines={2}
                      fontSize="16px"
                      fontWeight="600"
                      textAlign="left"
                    >
                      {item.name}
                    </Text>
                    <VStack w="full">
                      <Button
                        size="sm"
                        w="full"
                        onClick={() => {
                          setSelected(item.name);
                          onOpenRemove();
                        }}
                      >
                        Remove
                      </Button>
                      <Button size="sm" w="full">
                        Edit
                      </Button>
                    </VStack>
                  </VStack>
                </CardBody>{" "}
              </Card>
            ))}
          </SimpleGridWrapper>
        ) : (
          <EmptyState
            title="No collection"
            message="You do not have a collection yet"
          />
        )}
      </VStack>
      <ModalCollection
        variant="add"
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        title="Add a collection"
      />
      <ModalCollection
        name={selected}
        variant="remove"
        isOpen={isOpenRemove}
        onClose={onCloseRemove}
        title="Remove a collection"
      />
    </BaseContainer>
  );
};

export default CollectionPage;
