import { QuestionIcon } from "@chakra-ui/icons";
import { Card, CardBody, VStack, Heading, Flex, Text } from "@chakra-ui/react";

const EmptyState = ({ title, message }: { title: string; message: string }) => (
  <Card w="full">
    <CardBody display="flex" flexDir="column" alignItems="center" gap="8px">
      <QuestionIcon fontSize="40px" />
      <VStack>
        <Heading size="lg">{title}</Heading>
        <Flex gap="12px" alignItems="center">
          <Text>{message}</Text>
        </Flex>
      </VStack>
    </CardBody>
  </Card>
);

export default EmptyState;
