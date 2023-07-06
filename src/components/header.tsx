import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import BaseContainer from "./base-container";

const HEADER_MENU = [
  { title: "Home", link: "/" },
  { title: "Collection", link: "/collection" },
  { title: "Github", link: "https://github.com/dzakiizza/anime-app" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <HStack
      h="20"
      justify="center"
      position="fixed"
      top="0"
      right="0"
      left="0"
      backdropFilter="auto"
      backdropBlur="8px"
      zIndex={999}
      bg="blackAlpha.400"
    >
      <BaseContainer>
        <HStack
          p={{ base: "0", lg: "4" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link href={"/"}>
            <Heading
              bgGradient="linear(to-r, teal.400, green.400)"
              bgClip="text"
            >
              Anime App
            </Heading>
          </Link>
          <Flex gap="16px" display={{ base: "none", md: "flex" }}>
            {HEADER_MENU.map((item, idx) => (
              <Link href={item.link} key={idx}>
                <Box
                  border="1px solid"
                  borderColor={
                    router.pathname === item.link ? "#38B2AC" : "transparent"
                  }
                  p="8px"
                  borderRadius="8px"
                  _hover={{ cursor: "pointer" }}
                >
                  <Text
                    bgGradient={
                      idx % 2 === 0
                        ? "linear(to-r, teal.600, green.300)"
                        : "linear(to-r, teal.300, green.600)"
                    }
                    bgClip="text"
                    fontWeight="semibold"
                  >
                    {item.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Flex>
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="menu-button"
            borderColor="teal.300"
            icon={<HamburgerIcon color="teal.300" />}
            variant="outline"
            onClick={onOpen}
          />
        </HStack>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody mt="40px">
              <VStack gap="2" w="full">
                {HEADER_MENU.map((item, idx) => (
                  <Box
                    key={idx}
                    w="full"
                    borderRadius="8px"
                    _hover={{ bg: "gray.500" }}
                    border="1px solid"
                    borderColor={
                      router.pathname === item.link ? "#38B2AC" : "transparent"
                    }
                  >
                    <Link href={item.link} onClick={onClose}>
                      <Text
                        p="8px"
                        _hover={{ cursor: "pointer" }}
                        fontWeight="semibold"
                      >
                        {item.title}
                      </Text>
                    </Link>
                  </Box>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </BaseContainer>
    </HStack>
  );
};

export default Header;
