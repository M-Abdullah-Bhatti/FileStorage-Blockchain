import React, { useState, useEffect } from "react";
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

import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import { ethers } from "ethers";

const AllUnsharedFiles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);

  const [unSharedFiles, setUnSharedFiles] = useState([]);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = unSharedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = unSharedFiles.length > itemsPerPage ? true : false;

  useEffect(() => {
    const fetchAllMyUnSharedFiles = async () => {
      // Connect to the contract using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      // Call the getAllMyUploadedFiles() function and retrieve the files
      const files = await contract.getAllMyUnSharedFiles();

      console.log("unSharedFiles: ", files);
      // Set the files state variable
      setUnSharedFiles(files);
    };

    fetchAllMyUnSharedFiles();
  }, []);

  return (
    <TabPanel>
      {/* <DeleteFileModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        fileId={unSharedFiles.fileId}
      /> */}
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
            {unSharedFiles.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't got any unshared file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <>
                  <DeleteFileModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    fileId={data.fileId}
                  />
                  <Tr key={i}>
                    <Td>{data.name}</Td>
                    <Td>{`${data?.hash?.slice(0, 25)}....${data?.hash?.slice(
                      -8
                    )}`}</Td>
                    {/* <Td>{`${data?.sharedWith?.slice(
                    0,
                    16
                  )}....${data?.sharedWith?.slice(-8)}`}</Td> */}
                    <Td>{Number(data.price)}</Td>
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
                </>
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
