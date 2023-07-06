import { MediaAnimeList } from "@/graphql/queries-types";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading } from "@chakra-ui/react";

const HomeHeading = ({
  isBulkMode,
  selectedAnime,
  handleAddCollection,
  onOpenAddAnime,
}: {
  isBulkMode: boolean;
  selectedAnime: (MediaAnimeList | undefined)[];
  handleAddCollection: () => void;
  onOpenAddAnime: () => void;
}) => {
  return (
    <Flex
      w="full"
      justifyContent="space-between"
      flexDir={{ base: "column", md: "row" }}
      alignItems="center"
    >
      <Heading size="lg" mb="4">
        Anime List
      </Heading>
      <Flex gap="8px">
        <Button
          w={{ base: "full", md: "fit-content" }}
          size="sm"
          borderRadius="8px"
          colorScheme="teal"
          leftIcon={!isBulkMode ? <SmallAddIcon fontSize="20px" /> : undefined}
          onClick={handleAddCollection}
        >
          {isBulkMode ? "Cancel" : "Add to collection"}
        </Button>
        {isBulkMode && (
          <Button
            w={{ base: "full", md: "fit-content" }}
            size="sm"
            borderRadius="8px"
            colorScheme="teal"
            onClick={onOpenAddAnime}
            isDisabled={Boolean(!selectedAnime.length)}
          >
            Done
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default HomeHeading;
