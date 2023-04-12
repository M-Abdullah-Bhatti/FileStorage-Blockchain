import React, { useState, useEffect } from "react";
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import UnshareFileModal from "../../components/Modals/UnshareFileModal";
import { ethers } from "ethers";
import JSEncrypt from "jsencrypt";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const AllSharedFiles = () => {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sharedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = sharedFiles.length > itemsPerPage ? true : false;

  useEffect(() => {
    const fetchAllMySharedFiles = async () => {
      // Connect to the contract using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      // Call the getAllMyUploadedFiles() function and retrieve the files
      const files = await contract.getAllMySharedFiles();

      console.log("sharedFiles: ", files);
      // Set the files state variable
      setSharedFiles(files);
    };

    fetchAllMySharedFiles();
  }, []);

  return (
    <Box paddingY="10" paddingX="4em" minHeight={"90vh"}>
      <Text
        mb={"2"}
        fontSize="5xl"
        textAlign="center"
        textTransform="uppercase"
        textColor="#0d8775"
        fontFamily="auto"
      >
        Dashboard
      </Text>

      <Text
        mb={"5"}
        fontSize="3xl"
        textAlign="center"
        textTransform="uppercase"
        textColor="#0d8775"
        fontFamily="auto"
      >
        All My Shared Files
      </Text>

      {/* Tables */}

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
            {sharedFiles.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't shared any file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <>
                  <UnshareFileModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    fileId={Number(data.fileId)}
                  />
                  <Tr key={i}>
                    <Td>{data?.name}</Td>
                    <Td>{`${data?.hash?.slice(0, 25)}....${data?.hash?.slice(
                      -8
                    )}`}</Td>
                    <Td>{`${data?.sharedWith?.slice(
                      0,
                      16
                    )}....${data?.sharedWith?.slice(-8)}`}</Td>
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
                        Unshare File
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
          totalItems={sharedFiles.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default AllSharedFiles;
