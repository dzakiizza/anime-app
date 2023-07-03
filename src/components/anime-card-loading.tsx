import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const AnimeCardLoading = () => (
  <Card h={{ base: "330px", md: "390px" }}>
    <CardBody p="0">
      <Skeleton borderTopRadius="8px" h={{ base: "220px", md: "280px" }} />
      <SkeletonText
        padding="4"
        mt="4"
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
      />
    </CardBody>
  </Card>
);

export default AnimeCardLoading;
