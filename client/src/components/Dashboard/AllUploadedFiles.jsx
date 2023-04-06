import React, { useState } from "react";
import {
  Button,
  TabPanel,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { dummyUploadedFilesData } from "../../data";
import SetFileForSaleModal from "../Modals/SetFileForSaleModal";
import Pagination from "../Pagination/Pagination";

const AllUploadedFiles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyUploadedFilesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination =
    dummyUploadedFilesData.length > itemsPerPage ? true : false;

  return (
    <TabPanel>
      <SetFileForSaleModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <TableContainer>
        <Table size="md" border="1px" borderColor="gray.200">
          <Thead>
            <Tr>
              <Th paddingY="1em" fontSize="xl">
                File Name
              </Th>
              <Th fontSize="xl">File Hash</Th>
              <Th fontSize="xl">File Price</Th>
              <Th fontSize="xl">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyUploadedFilesData.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't uploaded any file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <Tr key={i}>
                  <Td>{data.fileName}</Td>
                  <Td>{data.fileHash}</Td>
                  <Td>{data.filePrice}</Td>
                  <Td>
                    <Button
                      onClick={onOpen}
                      colorScheme="teal"
                      backgroundColor="black"
                      size="lg"
                      _hover={{
                        backgroundColor: "blackAlpha.800",
                      }}
                    >
                      Set File For Sale
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={dummyUploadedFilesData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </TabPanel>
  );
};

export default AllUploadedFiles;
