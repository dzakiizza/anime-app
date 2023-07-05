import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const CollectionCard = ({
  mode = "edit",
  item,
  openModalAction,
}: {
  mode?: "edit" | "display";
  item: Record<string, any>;
  openModalAction?: (
    collectionId: string,
    collectionName: string,
    variant: "edit" | "remove"
  ) => void;
}) => {
  const heightImage = useBreakpointValue({ base: 220, md: 280 });
  const scaleVal = useBreakpointValue({ base: "scale(1)", sm: "scale(1.1)" });

  return (
    <Card>
      <CardBody
        p="0"
        borderRadius="8px"
        bg="gray.700"
        _hover={{
          transform: scaleVal,
          zIndex: 99,
          cursor: "pointer",
        }}
        transition="all 0.5s ease-in-out"
        display="flex"
        flexDir="column"
        justifyContent="space-between"
      >
        <Link href={`/collection/${item.id}`}>
          {item.animeList.length ? (
            <Flex h={heightImage} pos="relative" w="100%">
              <Image
                style={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                alt="anime-cover"
                src={item.animeList[0].coverImage.large}
                fill
              />
            </Flex>
          ) : (
            <Flex
              borderTopRadius="8px"
              h={heightImage}
              pos="relative"
              w="100%"
              bgGradient={`linear(to-r, teal.400, ${
                item.color || "green.400"
              })`}
            />
          )}
          <Flex p="4" w="full" justifyContent="center">
            <Text
              noOfLines={2}
              fontSize="16px"
              fontWeight="600"
              textAlign="left"
            >
              {item.name}
            </Text>
          </Flex>
        </Link>
        {mode === "edit" && (
          <VStack px="4" pb="4" gap="16px">
            <VStack w="full">
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                w="full"
                onClick={() => {
                  if (openModalAction) {
                    openModalAction(item.id, item.name, "remove");
                  }
                }}
              >
                Remove
              </Button>
              <Button
                size="sm"
                w="full"
                leftIcon={<EditIcon />}
                onClick={() => {
                  if (openModalAction) {
                    openModalAction(item.id, item.name, "edit");
                  }
                }}
              >
                Edit
              </Button>
            </VStack>
          </VStack>
        )}
      </CardBody>
    </Card>
  );
};

export default CollectionCard;
