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
  Text,
} from "@chakra-ui/react";
import { dummySharedFilesData } from "../../data";
import Pagination from "../Pagination/Pagination";

const AllSharedFiles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummySharedFilesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination =
    dummySharedFilesData.length > itemsPerPage ? true : false;
  return (
    <TabPanel>
      <TableContainer>
        <Table size="md" border="1px" borderColor="gray.200">
          <Thead>
            <Tr>
              <Th paddingY="1em" fontSize="xl">
                File Name
              </Th>
              <Th fontSize="xl">File Hash</Th>
              <Th fontSize="xl">Shared With</Th>
              <Th fontSize="xl">Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dummySharedFilesData.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't shared any file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <Tr key={i}>
                  <Td>{data.fileName}</Td>

                  <Td>{`${data.fileHash.slice(0, 25)}....${data.fileHash.slice(
                    -8
                  )}`}</Td>
                  <Td>{`${data.sharedWith.slice(
                    0,
                    16
                  )}....${data.sharedWith.slice(-8)}`}</Td>

                  <Td>
                    <Button
                      colorScheme="teal"
                      backgroundColor="black"
                      size="lg"
                      _hover={{
                        backgroundColor: "blackAlpha.800",
                      }}
                    >
                      Unshare File
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
          totalItems={dummySharedFilesData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </TabPanel>
  );
};

export default AllSharedFiles;
