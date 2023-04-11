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
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import JSEncrypt from "jsencrypt";

import { fromByteArray } from "base64-js";
import FileStorageMarketplace from "../../FileStorageMarketplace.json";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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

// const getOriginalHash = async (hash) => {
// let encryptor = new JSEncrypt({ default_key_size: 2048 });

//   console.log("============");

export default function UploadFile() {
  useEffect(() => {
    const getOriginalHash = async () => {
      let encryptor = new JSEncrypt({ default_key_size: 2048 });

      let hashvalue =
        "T6ENg4nH3gG3Itojvy5fLGrXQnoXSB/zFnUmDEKpfmEfol8iN/TZaKNfNeo7IiyXip+7HH9fk3jQoobSsE+K/v1htFL6hqOImhRtCbEZJu4bY77LLaaAywYP4lYlNPcANOMnE2+ETJlS5oQNL4ROUe5y5uYi++km/GjlwbjwNFYpiL4d/BJUXBMaNspEJYMZqP7m0t3GG/+w4d27qsrUSkwlWWqr8slGecbrClT1yDxX2AnZIb+/5fHDDfPnrLxAAN9CVOGPYeryhSuiXRHqX39K20ajmo0D5eBkcgcraDCJOXnHABgAl36ey43V4CqdZyhFx+jbHCOhcYjr52taxA==";
      const { data } = await axios.post(
        "http://localhost:5000/api/hash/getPrivateKey",
        {
          hashvalue: hashvalue,
        }
      );
      console.log(data.privateKey);

      encryptor.setPrivateKey(data.privateKey);
      let decrypted = encryptor.decrypt(hashvalue);
      console.log(decrypted);
      // console.log(`https://gateway.pinata.cloud/ipfs/${decrypted}`);
    };

    getOriginalHash();
  }, []);

  const navigate = useNavigate();
  let encryptor = new JSEncrypt({ default_key_size: 2048 });
  let encryptedHash;

  let publicKey, privatekey;

  const [selectedFile, setSelectedFile] = useState();
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
      console.log(`https://gateway.pinata.cloud/ipfs/${fileInfo.ipfsHash}`);

      console.log("dsfdsf: ", fileInfo);

      //   // First get both public and private Keys
      publicKey = encryptor.getPublicKey();
      privatekey = encryptor.getPrivateKey();

      // get encrypted hash which need to be stored in blockchain
      encryptor.setPublicKey(publicKey);
      encryptedHash = encryptor.encrypt(
        `https://gateway.pinata.cloud/ipfs/${fileInfo.ipfsHash}`
      );

      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(
      //   FileStorageMarketplace.address,
      //   FileStorageMarketplace.abi,
      //   signer
      // );

      // const tx = await contract.uploadFile(
      //   fileInfo.name,
      //   fileInfo.description,
      //   encryptedHash
      // );
      // await tx.wait();

      await axios
        .post("http://localhost:5000/api/hash", {
          hashvalue: encryptedHash,
          privatekey: privatekey,
        })
        .then((res) => {
          console.log(res);

          toast.success("File Uploaded Successfully");
          navigate("/dashboard");
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
              >
                Upload File
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
