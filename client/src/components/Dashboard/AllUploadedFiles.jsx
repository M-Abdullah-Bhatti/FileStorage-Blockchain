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
import { useNavigate } from "react-router-dom";

const AllUploadedFiles = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = files.length > itemsPerPage ? true : false;

  const [hash, setHash] = useState("");
  const [fileContent, setFileContent] = useState("");

  // const getOriginalHash = async () => {
  //   let encryptor = new JSEncrypt({ default_key_size: 2048 });

  //   console.log("******************");

  //   // files.forEach(async (item, index) => {
  //   // console.log("This time this console: ", hash);

  //   files.forEach(async (item, index) => {
  //     // console.log("item.hash");
  //     console.log("files hash: ", item.hash);
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/hash/getPrivateKey",
  //       {
  //         hashvalue: item.hash,
  //       }
  //     );

  //     // console.log(data.privateKey);
  //     encryptor.setPrivateKey(data.privateKey);
  //     let decrypted = encryptor.decrypt(item.hash);
  //     console.log(decrypted);

  //     // ====================================================

  //     // item.hash = decrypted;
  //   });

  //   // await axios
  //   //   .get("http://localhost:5000/api/hash/getPrivateKey", {
  //   //     hashvalue: files.hash,
  //   //   })
  //   //   .then((res) => {
  //   //     console.log("000000");
  //   //     console.log("res: ", res);
  //   //   })

  //   //   .catch((err) => console.log(err.response.data.message));
  //   // console.log("data: ", data);

  //   // console.log("pk: ", data.privateKey);
  //   // });
  // };

  const click = async (hash) => {
    console.log("click");
    let encryptor = new JSEncrypt({ default_key_size: 2048 });

    const { data } = await axios.post(
      "http://localhost:5000/api/hash/getPrivateKey",
      {
        hashvalue: hash,
      }
    );
    // console.log(data.privateKey);

    encryptor.setPrivateKey(data.privateKey);
    let decrypted = encryptor.decrypt(hash);
    console.log(decrypted);
    window.open(decrypted, "_blank");
  };
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

      console.log("files:============================== ");
      console.log("files: ", files);
      // files.forEach(async (item, index) => {
      //   console("item.hash");
      // });
      // console.log("files hash: ", files.hash);
    };

    fetchAllMyUploadedFiles();
    // getOriginalHash();
  }, []);

  // useEffect(() => {
  //   const getOriginalHash = async () => {
  //     let encryptor = new JSEncrypt({ default_key_size: 2048 });

  //     let hashvalue =
  //       "T6ENg4nH3gG3Itojvy5fLGrXQnoXSB/zFnUmDEKpfmEfol8iN/TZaKNfNeo7IiyXip+7HH9fk3jQoobSsE+K/v1htFL6hqOImhRtCbEZJu4bY77LLaaAywYP4lYlNPcANOMnE2+ETJlS5oQNL4ROUe5y5uYi++km/GjlwbjwNFYpiL4d/BJUXBMaNspEJYMZqP7m0t3GG/+w4d27qsrUSkwlWWqr8slGecbrClT1yDxX2AnZIb+/5fHDDfPnrLxAAN9CVOGPYeryhSuiXRHqX39K20ajmo0D5eBkcgcraDCJOXnHABgAl36ey43V4CqdZyhFx+jbHCOhcYjr52taxA==";
  // const { data } = await axios.post(
  //   "http://localhost:5000/api/hash/getPrivateKey",
  //   {
  //     hashvalue: hashvalue,
  //   }
  // );
  // console.log(data.privateKey);

  // encryptor.setPrivateKey(data.privateKey);
  // let decrypted = encryptor.decrypt(hashvalue);
  // console.log(decrypted);
  //     // console.log(`https://gateway.pinata.cloud/ipfs/${decrypted}`);
  //   };

  //   getOriginalHash();
  // }, []);

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
                        onClick={() => click(data.hash)}
                        // href={`https://gateway.pinata.cloud/ipfs/${data.hash}`}
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
                        onClick={DownloadFile}
                        colorScheme="teal"
                        backgroundColor="green"
                        size="lg"
                        _hover={{
                          backgroundColor: "blackAlpha.800",
                        }}
                      >
                        Download
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
