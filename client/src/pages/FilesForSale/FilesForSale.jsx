import React from "react";
import CardsSection from "../../components/FilesForSale/CardsSection";
import { Box, Text } from "@chakra-ui/react";

const FilesForSale = () => {
  return (
    <Box backgroundColor="#f5f5f5" paddingTop="3em">
      <Text fontSize="5xl" textAlign="center" textTransform="uppercase">
        Files for sale
      </Text>
      <CardsSection isHomePage={false} />
    </Box>
  );
};

export default FilesForSale;
