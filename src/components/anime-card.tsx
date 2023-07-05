import { MediaAnimeList } from "@/graphql/queries-types";
import { CheckCircleIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Tag,
  Text,
  VStack,
  useBreakpointValue,
  Circle,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const AnimeCard = ({
  mode = "display",
  data,
  selectedAnime,
  onOpenRemoveModal,
  handleSelect,
}: { data: Partial<MediaAnimeList> } & {
  mode?: "display" | "edit" | "bulk";
  selectedAnime?: (MediaAnimeList | undefined)[];
  onOpenRemoveModal?: (id: number, animeName: string) => void;
  handleSelect?: (
    data: MediaAnimeList,
    isSelected: boolean,
    id: number | undefined
  ) => void;
}) => {
  const heightImage = useBreakpointValue({ base: 220, md: 280 });
  const scaleVal = useBreakpointValue({ base: "scale(1)", sm: "scale(1.1)" });
  const router = useRouter();

  const handleRedirect = React.useCallback(() => {
    router.push(`/anime-detail/${data.id}`);
  }, [router.push, data.id]);

  const isSelected = React.useMemo(() => {
    return Boolean(selectedAnime?.find((item) => item?.id === data.id));
  }, [selectedAnime, data.id]);

  const handleClick = React.useCallback(() => {
    if (mode === "bulk") {
      if (handleSelect) {
        handleSelect(data as MediaAnimeList, isSelected, data.id);
      }
    } else {
      handleRedirect();
    }
  }, [mode, data, isSelected]);

  return (
    <Card
      _hover={{
        transform: scaleVal,
        zIndex: 99,
        cursor: "pointer",
      }}
      transition="all 0.5s ease-in-out"
      boxShadow={
        "0px 0px 6px -2px rgba(0, 0, 0, 0.12), 0px 8px 24px -4px rgba(0, 0, 0, 0.08)"
      }
      w="100%"
    >
      <CardBody p="0" borderRadius="8px">
        <VStack justifyContent="space-between" h="100%">
          <Box w="full" onClick={handleClick}>
            <Flex h={heightImage} pos="relative" w="100%">
              <Image
                style={{
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                alt="anime-cover"
                src={data?.coverImage?.large || ""}
                fill
              />
              {mode === "bulk" && (
                <Circle
                  size="40px"
                  bg="white"
                  color="teal.300"
                  pos="absolute"
                  zIndex="99"
                  right="8px"
                  top="8px"
                >
                  {isSelected && <CheckCircleIcon fontSize="32px" />}
                </Circle>
              )}
            </Flex>

            <HStack px="4" pt="4" justify="space-between" alignItems="center">
              <Tag
                size={"sm"}
                variant="solid"
                colorScheme="teal"
                justifyContent="center"
              >
                {data.seasonYear}
              </Tag>
              <Flex alignItems="center" gap="2">
                <StarIcon color="yellow.400" />
                <Text
                  textAlign="center"
                  noOfLines={2}
                  fontSize={{ base: "11px", md: "12px", lg: "14px" }}
                  fontWeight="600"
                >
                  {data.averageScore} / 100
                </Text>
              </Flex>
            </HStack>
            <HStack p="4">
              <Text noOfLines={3} fontSize="14px" fontWeight="600">
                {data?.title?.romaji}
              </Text>
            </HStack>
          </Box>
          {mode === "edit" && (
            <VStack px="4" pb="4" gap="16px" w="full">
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                w="full"
                onClick={() => {
                  if (onOpenRemoveModal) {
                    onOpenRemoveModal(data.id || 0, data?.title?.romaji || "");
                  }
                }}
              >
                Remove
              </Button>
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AnimeCard;
