import React, { useState, useEffect } from "react";
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

import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import { ethers } from "ethers";

const AllSharedFiles = () => {
  const [recievedFiles, setRecievedFiles] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recievedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = recievedFiles.length > itemsPerPage ? true : false;

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
      const files = await contract.getAllMyReceivedFiles();

      console.log("recieved files: ", files);
      // Set the files state variable
      setRecievedFiles(files);
    };

    fetchAllMySharedFiles();
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
              <Th fontSize="xl">Shared By</Th>
            </Tr>
          </Thead>

          <Tbody>
            {recievedFiles.length === 0 ? (
              <Tr>
                <Text fontSize="3xl" textAlign="center" paddingY={10}>
                  You haven't shared any file
                </Text>
              </Tr>
            ) : (
              currentItems.map((data, i) => (
                <Tr key={i}>
                  <Td>{data?.name}</Td>
                  <Td>{`${data?.hash?.slice(0, 25)}....${data?.hash?.slice(
                    -8
                  )}`}</Td>

                  <Td>{`${data?.owner?.slice(0, 16)}....${data?.owner?.slice(
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

{
  /* currentItems.map((data, i) => (
                <Tr key={i}>
                  <Td>{data.fileName}</Td>

                  <Td>{`${data.fileHash.slice(0, 25)}....${data.fileHash.slice(
                    -8
                  )}`}</Td>
                  <Td>{`${data.sharedBy.slice(0, 16)}....${data.sharedBy.slice(
                    -8
                  )}`}</Td>
                </Tr>
              )) */
}
export default AllSharedFiles;
