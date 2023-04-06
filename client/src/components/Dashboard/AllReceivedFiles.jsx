import React, { useState } from "react";
import {
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
import { dummyReceivedFilesData } from "../../data";
import Pagination from "../Pagination/Pagination";

const AllSharedFiles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyReceivedFilesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination =
    dummyReceivedFilesData.length > itemsPerPage ? true : false;
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
              <Th fontSize="xl">Shared By</Th>
            </Tr>
          </Thead>

          <Tbody>
            {dummyReceivedFilesData.length === 0 ? (
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
                  <Td>{`${data.sharedBy.slice(0, 16)}....${data.sharedBy.slice(
                    -8
                  )}`}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={dummyReceivedFilesData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </TabPanel>
  );
};

export default AllSharedFiles;
