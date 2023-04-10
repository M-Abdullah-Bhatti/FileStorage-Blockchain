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
  Link,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import { ethers } from "ethers";
import SetFileForSaleModal from "../Modals/SetFileForSaleModal";
import Pagination from "../Pagination/Pagination";

const AllUploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = files.length > itemsPerPage ? true : false;
  console.log({ itemsPerPage }, { indexOfLastItem }, { currentItems });

  useEffect(() => {
    const fetchAllMyUploadedFiles = async () => {
      // Connect to the contract using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      // Call the getAllMyUploadedFiles() function and retrieve the files
      const files = await contract.getAllMyUploadedFiles();

      // Set the files state variable
      setFiles(files);

      console.log("files: ", files);
    };

    fetchAllMyUploadedFiles();
  }, []);

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
              <Th fontSize="xl">File Price</Th>
              <Th fontSize="xl">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't uploaded any file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <>
                  <SetFileForSaleModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    fileId={data.fileId}
                  />

                  <Tr key={i}>
                    <Td>{data.name}</Td>
                    <Td>
                      <Link
                        fontWeight="light"
                        fontSize="md"
                        href={`https://gateway.pinata.cloud/ipfs/${data.hash}`}
                        isExternal
                      >
                        {data.hash.slice(0, 20) + "..." + data.hash.slice(-20)}{" "}
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Td>

                    <Td>{`${ethers.utils.formatEther(data.price)} ETH`}</Td>
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
                </>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={files.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </TabPanel>
  );
};

export default AllUploadedFiles;
