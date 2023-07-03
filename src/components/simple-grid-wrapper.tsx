import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import React from "react";

const SimpleGridWrapper: React.FC<React.PropsWithChildren<SimpleGridProps>> = ({
  children,
  ...props
}) => {
  return (
    <SimpleGrid
      my="4"
      gap={{ base: "4", lg: "8" }}
      columns={{ base: 2, md: 3, lg: 4, xl: 5 }}
      w="full"
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};

export default SimpleGridWrapper;
