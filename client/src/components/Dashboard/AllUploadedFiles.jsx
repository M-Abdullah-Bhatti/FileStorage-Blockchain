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
import ShareFileModal from "../Modals/ShareFileModal";
import JSEncrypt from "jsencrypt";

import Pagination from "../Pagination/Pagination";

import axios from "axios";

const AllUploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = files.length > itemsPerPage ? true : false;

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
      // console.log("files: ", files.hash);
    };

    fetchAllMyUploadedFiles();
    getOriginalHash();
  }, []);

  const getOriginalHash = async (hash) => {
    let encryptor = new JSEncrypt({ default_key_size: 2048 });

    console.log("============");

    // files.forEach(async (item, index) => {
    //   console.log("This time this console: ", hash);
    //   await axios
    //     .get("http://localhost:5000/api/hash/getPrivateKey", {
    //       hashvalue:
    //         "Q02Pi3MAJyDdwE7VyDDCQFGlwY6JOEVDHTWGjJu7TwybhRJXUt7oh9LH22mmctoOhgChUaDa8mtFMGKdSysQq7dztfAYvN/nlyLMR4dSVBQpKyyALN5zdovcv8NFYazfGUdl0QI6E1DXR3XR4IXwN+/bMBSnrya/d7hLNKrTXFtdjqZH+jJq/M11QO8qj2j0iZDt5N/3BGH7QFaMxZbYaWhu1GpwfPQnP+cRC7QLwBUANUWHw6OEXepTpcf+cCHBkIDxP2jQR9sQgGwR5vUOPloSo4g9gOlXJgYsfwD5df34N/mw0swARf1XgxHadZE/GXUVeGZzbWkmUnUaJONOEg==",
    //     })
    //     .then((res) => console.log(res))

    //     .catch((err) => console.log(err.response.data.message));
    //   // console.log("data: ", data);

    //   // console.log("pk: ", data.privateKey);
    // });

    // const privateKey = localStorage.getItem("privateKey");
    // const encrypthash = localStorage.getItem("encrypthash");
  };

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

                  {/* <ShareFileModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    fileId={data.fileId}
                  /> */}

                  <Tr key={i}>
                    <Td>{data.name}</Td>
                    <Td>
                      <Link
                        fontWeight="light"
                        fontSize="md"
                        href={`https://gateway.pinata.cloud/ipfs/${data.hash}`}
                        isExternal
                      >
                        {/* {getOriginalHash(data.hash)} */}
                        {data.hash.slice(0, 20) +
                          "..." +
                          data.hash.slice(-20)}{" "}
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
                        marginX={"10px"}
                        _hover={{
                          backgroundColor: "blackAlpha.800",
                        }}
                      >
                        Set File For Sale
                      </Button>
                      {/* My work */}
                      {/* <Button
                        onClick={onOpen}
                        colorScheme="teal"
                        backgroundColor="green"
                        size="lg"
                        _hover={{
                          backgroundColor: "blackAlpha.800",
                        }}
                      >
                        Share My file
                      </Button> */}

                      {/* Exit my work */}
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
