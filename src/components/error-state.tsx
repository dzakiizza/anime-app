import { WarningIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, Heading, Flex, Text } from "@chakra-ui/react";
import BaseContainer from "./base-container";

const ErrorState = () => (
  <BaseContainer pt={{ base: "32", md: "40" }}>
    <Card>
      <CardBody display="flex" flexDir="column" alignItems="center" gap="8px">
        <WarningIcon fontSize="40px" />
        <VStack>
          <Heading>Error</Heading>
          <Flex gap="12px" alignItems="center">
            <Text>Sorry, There is an error in this page </Text>
            <Text fontSize="32px">🙁</Text>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  </BaseContainer>
);

export default ErrorState;
