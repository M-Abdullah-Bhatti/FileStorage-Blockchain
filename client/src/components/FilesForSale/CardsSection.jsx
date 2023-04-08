import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ShareFileModal from "../Modals/ShareFileModal";
import { dummyCardsData } from "../../data";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import CardComponent from "./CardComponent";

export default function CardsSection({ isHomePage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyCardsData.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = dummyCardsData.length > itemsPerPage ? true : false;

  return (
    <>
      {dummyCardsData.length === 0 ? (
        <Box
          minHeight={"60vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize="4xl">Sorry, there's no file for sale right now</Text>
        </Box>
      ) : (
        <Box paddingBottom={10}>
          <ShareFileModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          <SimpleGrid
            spacing={10}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            paddingTop={12}
            paddingBottom={5}
            paddingX="10em"
            backgroundColor="#f2fffe"
          >
            {isHomePage
              ? currentItems
                  .slice(0, 3)
                  .map((data, i) => (
                    <CardComponent data={data} key={i} onOpen={onOpen} />
                  ))
              : currentItems.map((data, i) => (
                  <CardComponent data={data} key={i} onOpen={onOpen} />
                ))}
          </SimpleGrid>

          {!isHomePage && showPagination && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={dummyCardsData.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Box>
      )}
    </>
  );
}
