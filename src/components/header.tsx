import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack
      h="20"
      justify="center"
      position="fixed"
      top="0"
      right="0"
      left="0"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      backdropFilter="auto"
      backdropBlur="8px"
      zIndex={999}
    >
      <Flex width={{ base: "90%", md: "80%" }} justifyContent={"space-between"}>
        <Link href={"/"}>
          <Heading color="teal.400">Anime List</Heading>
        </Link>
        {/* <IconButton
          aria-label={"toggle-mode"}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          color="teal.400"
          background={"transparent"}
          onClick={toggleColorMode}
        /> */}
      </Flex>
    </HStack>
  );
};

export default Header;
