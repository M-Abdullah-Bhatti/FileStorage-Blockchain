import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ShareFileModal from "../Modals/ShareFileModal";
import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import CardComponent from "./CardComponent";

export default function CardsSection({ isHomePage }) {
  const [sharedFiles, setSharedFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;
  // const currentItems = sharedFiles.slice(indexOfFirstItem, indexOfLastItem);

  // console.log({ itemsPerPage }, { indexOfLastItem }, { currentItems });

  const showPagination = sharedFiles.length > itemsPerPage ? true : false;

  useEffect(() => {
    const fetchGetFilesForSale = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      const sharedFiles = await contract.getFilesForSale();
      console.log("Shared Files  " + sharedFiles);

      // Set the files state variable
      setSharedFiles(sharedFiles);
    };

    fetchGetFilesForSale();
  }, []);

  currentItems = sharedFiles?.slice(3, 8);
  console.log("Currentee " + currentItems);
  return (
    <>
      {sharedFiles.length === 0 ? (
        <Box
          minHeight={"60vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize="4xl">Sorry, there's no file for sale right now</Text>
        </Box>
      ) : (
        <Box paddingBottom={10}>
          <SimpleGrid
            spacing={10}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            paddingTop={12}
            paddingBottom={5}
            paddingX="10em"
            backgroundColor="#f2fffe"
          >
            {isHomePage
              ? currentItems.slice(0, 3).map((data, i) => (
                  <Box>
                    {/* <ShareFileModal
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      fileId={data.fileId}
                    /> */}
                    {/* <CardComponent
                      fileId={data.fileId}
                      fileName={data.name}
                      fileDescription={data.description}
                      // fileOwner={data.owner.toString()}
                      // fileHash={data.hash}
                      // filePrice={ethers.utils
                      //   .formatEther(data.price)
                      //   .toString()}
                      onOpen={onOpen}
                    /> */}
                    {/* <Text>
                      fileId={data.fileId}
                      fileName={data.name}
                      fileDescription={data.description}
                    </Text> */}
                  </Box>
                ))
              : currentItems.map((data, i) => (
                  <>
                    <ShareFileModal
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      fileId={data.fileId}
                    />
                    {/* <CardComponent
                      fileId={data.fileId}
                      fileName={data.name}
                      fileDescription={data.description}
                      // fileOwner={data.owner.toString()}
                      // fileHash={data.hash.}
                      // filePrice={ethers.utils
                      //   .formatEther(data.price)
                      //   .toString()}
                      onOpen={onOpen}
                    /> */}
                    <Text key={i}>
                      fileId={data.fileId}
                      {/* fileName={data.name}
                    // {/* fileDescription={data.description}  */}
                    </Text>
                  </>
                ))}
          </SimpleGrid>

          {!isHomePage && showPagination && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={sharedFiles.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Box>
      )}
    </>
  );
}
