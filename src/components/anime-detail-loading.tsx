import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const AnimeDetailLoading = () => (
  <Flex
    w="full"
    p="4"
    bg="gray.700"
    borderRadius="16px"
    gap="24px"
    flexDir={{ base: "column", md: "row" }}
  >
    <Skeleton h="600px" w={{ base: "full", md: "400px" }} />
    <SkeletonText
      padding="4"
      noOfLines={6}
      spacing="4"
      skeletonHeight="2"
      w="100%"
    />
  </Flex>
);

export default AnimeDetailLoading;
