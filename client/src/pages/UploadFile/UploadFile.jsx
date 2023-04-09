import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { create } from "ipfs-http-client";
import JSEncrypt from "jsencrypt";

import { fromByteArray } from "base64-js";
import { useEthereum } from "../../customHooks/useEthereum";

const projectId = "2NeEZqOeOOi9fQgDL6VoIMwKIZY";
const projectSecret = "b4ae65044a6e29c52c4091bf29a976b2";
const auth =
  "Basic " +
  fromByteArray(new TextEncoder().encode(`${projectId}:${projectSecret}`));

// const auth =
//   "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default function UploadFile() {
  let encryptor = new JSEncrypt({ default_key_size: 2048 });
  let encryptedHash;

  let publicKey, privateKey;

  // const [buttonText, setButtonText] = useState("Upload File");
  // const [hashSuccess, setHashSuccess] = useState(false);
  // const [ipfsHash, setIpfsHash] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  // const [isLoading, setIsLoading] = useState(false);
  const { contract } = useEthereum();
  const [fileInfo, setFileInfo] = useState({
    name: "",
    description: "",
    ipfsHash: "",
  });

  const handleFileUpload = async () => {
    try {
      const added = await ipfs.add(selectedFile);
      fileInfo.ipfsHash = added.path;
      setFileInfo({
        ...fileInfo,
        ipfsHash: `https://gateway.pinata.cloud/ipfs/${fileInfo.ipfsHash}`,
      });
      console.log("done");
      console.log(`https://gateway.pinata.cloud/ipfs/${fileInfo.ipfsHash}`);

      // let gasLimit = await contract.estimateGas.uploadFile(
      //   fileInfo.name,
      //   fileInfo.description,
      //   "fileInfo.ipfsHash"
      // );

      //   // First get both public and private Keys
      // console.log("---- ", encryptor.getKey());
      publicKey = encryptor.getPublicKey();
      privateKey = encryptor.getPrivateKey();

      // console.log("publicKey ", publicKey);
      // console.log("privateKey ", privateKey);
      // localStorage.setItem("privateKey", privateKey);

      // console.log("sdaasd");
      // get encrypted hash which need to be stored in blockchain
      encryptor.setPublicKey(publicKey);
      encryptedHash = encryptor.encrypt(fileInfo.ipfsHash);
      // console.log(encrypted);

      const tx = await contract.uploadFile(
        fileInfo.name,
        fileInfo.description,
        encryptedHash
        // { gasLimit: 800000 }
        // { gasLimit: gasLimit }
      );
      await tx.wait();
      console.log("File uploaded successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleChange = async (e) => {
  //   setHashSuccess(true);
  //   setButtonText("Wait for few seconds to get the hash");
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  //   const added = await ipfs.add(file);
  //   const ipHash = added.path;
  //   setIpfsHash(`https://gateway.pinata.cloud/ipfs/${ipHash}`);
  //   console.log("done");
  //   console.log(`https://gateway.pinata.cloud/ipfs/${ipHash}`);
  // };
  // const handleUploadFile = async () => {
  //   console.log("upload called");
  // };

  // const handle = async () => {
  //   // First get both public and private Keys
  //   console.log("---- ", encryptor.getKey());
  //   publicKey = encryptor.getPublicKey();
  //   privateKey = encryptor.getPrivateKey();

  //   console.log("publicKey ", publicKey);
  //   console.log("privateKey ", privateKey);
  //   // localStorage.setItem("privateKey", privateKey);

  //   // console.log("sdaasd");
  //   // get encrypted hash which need to be stored in blockchain
  //   encryptor.setPublicKey(publicKey);
  //   encrypted = encryptor.encrypt(ipfsHash);
  //   console.log(encrypted);

  //   // store this encrypted hash in blockchain:

  //   // store encrypted hash and privateKey in mongodb via api
  // };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      flexDirection={"column"}
      fontFamily="auto"
      paddingTop={6}
      bg="#f2fffe"
    >
      <Text
        fontSize="5xl"
        textColor="#0d8775"
        textAlign="center"
        textTransform="uppercase"
      >
        Upload your File
      </Text>
      <Stack spacing={8} mx={"auto"} minW={"md"} pt={3} pb={10} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xl"}
          border="2px"
          borderColor="gray.200"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  setFileInfo({ ...fileInfo, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                size="md"
                minHeight="10em"
                onChange={(e) =>
                  setFileInfo({ ...fileInfo, description: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="file">
              <Input
                type="file"
                p={1}
                mb={2}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                marginX="auto"
                backgroundColor="black"
                textColor="white"
                width="100%"
                fontSize="lg"
                paddingY="1.4em"
                _hover={{
                  backgroundColor: "blackAlpha.800",
                }}
                onClick={handleFileUpload}
                // isDisabled={hashSuccess}
              >
                {/* {buttonText} */}
                Upload File
              </Button>
              {/* <Button onClick={get}>Do work</Button> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
