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
import { dummyUnsharedFilesData } from "../../data";
import Pagination from "../Pagination/Pagination";
import DeleteFileModal from "../Modals/DeleteFileModal";

const AllUnsharedFiles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyUnsharedFilesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination =
    dummyUnsharedFilesData.length > itemsPerPage ? true : false;

  return (
    <TabPanel>
      <DeleteFileModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
            {dummyUnsharedFilesData.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't got any unshared file
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
                      colorScheme="red"
                      size="lg"
                      _hover={{
                        backgroundColor: "red.400",
                      }}
                    >
                      Delete File
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
          totalItems={dummyUnsharedFilesData.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </TabPanel>
  );
};

export default AllUnsharedFiles;
