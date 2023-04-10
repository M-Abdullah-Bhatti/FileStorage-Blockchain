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
  Text,
} from "@chakra-ui/react";
import { dummySharedFilesData } from "../../data";
import Pagination from "../Pagination/Pagination";

import FileStorageMarketplace from "../../FileStorageMarketplace.json";
import { ethers } from "ethers";

const AllSharedFiles = () => {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
            {sharedFiles.length === 0 ? (
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
                  <Td>{`${data?.sharedWith?.slice(
                    0,
                    16
                  )}....${data?.sharedWith?.slice(-8)}`}</Td>
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

// currentItems.map((data, i) => (
//   <Tr key={i}>
//     <Td>{data?.fileName}</Td>

//     <Td>{`${data?.fileHash?.slice(
//       0,
//       25
//     )}....${data.fileHash.slice(-8)}`}</Td>
//     <Td>{`${data?.sharedWith?.slice(
//       0,
//       16
//     )}....${data?.sharedWith?.slice(-8)}`}</Td>

//     <Td>
//       <Button
//         colorScheme="teal"
//         backgroundColor="black"
//         size="lg"
//         _hover={{
//           backgroundColor: "blackAlpha.800",
//         }}
//       >
//         Unshare File
//       </Button>
//     </Td>
//   </Tr>
// ))

//----------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TabPanel,
//   TableContainer,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Text,
// } from "@chakra-ui/react";
// import Pagination from "../Pagination/Pagination";

// import FileStorageMarketplace from "../../FileStorageMarketplace.json";
// import { ethers } from "ethers";

// const AllSharedFiles = () => {
//   const [sharedFiles, setSharedFiles] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = sharedFiles.slice(indexOfFirstItem, indexOfLastItem);
//   const showPagination = sharedFiles.length > itemsPerPage;

//   useEffect(() => {
//     const fetchAllMySharedFiles = async () => {
//       // Connect to the contract using ethers.js
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(
//         FileStorageMarketplace.address,
//         FileStorageMarketplace.abi,
//         signer
//       );

//       // Call the getAllMyUploadedFiles() function and retrieve the files
//       const files = await contract.getAllMySharedFiles();

//       console.log("sharedFiles: ", files);
//       // Set the files state variable
//       setSharedFiles(files);
//     };

//     fetchAllMySharedFiles();
//   }, []);

//   return (
//     <TabPanel>
//       <TableContainer>
//         <Table size="md" border="1px" borderColor="gray.200">
//           <Thead>
//             <Tr>
//               <Th paddingY="1em" fontSize="xl">
//                 File Name
//               </Th>
//               <Th fontSize="xl">File Hash</Th>
//               <Th fontSize="xl">Shared With</Th>
//               <Th fontSize="xl">Action</Th>
//             </Tr>
//           </Thead>

//           <Tbody>
//             {sharedFiles.length === 0 ? (
//               <Tr>
//                 <Text fontSize="3xl" textAlign="center" paddingY={10}>
//                   You haven't shared any file
//                 </Text>
//               </Tr>
//             ) : (
//               currentItems.map((data, i) => (
//                 <Tr key={i}>
//                   <Td>{data?.fileName}</Td>

//                   <Td>{`${data?.fileHash?.slice(
//                     0,
//                     25
//                   )}....${data?.fileHash?.slice(-8)}`}</Td>
//                   <Td>{`${data?.sharedWith?.slice(
//                     0,
//                     16
//                   )}....${data?.sharedWith?.slice(-8)}`}</Td>

//                   <Td>
//                     <Button
//                       colorScheme="blue"
//                       size="sm"
//                       // onClick={() => downloadFile(data.fileHash)}
//                     >
//                       Download
//                     </Button>
//                   </Td>
//                 </Tr>
//               ))
//             )}
//           </Tbody>
//         </Table>
//       </TableContainer>
//       {showPagination && (
//         <Pagination
//           itemsPerPage={itemsPerPage}
//           totalItems={sharedFiles.length}
//           paginate={setCurrentPage}
//           currentPage={currentPage}
//         />
//       )}
//     </TabPanel>
//   );
// };

// export default AllSharedFiles;
