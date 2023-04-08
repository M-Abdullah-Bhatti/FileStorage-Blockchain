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

export default function UploadFile() {
  const [buttonText, setButtonText] = useState("Upload File");
  const [hashSuccess, setHashSuccess] = useState(false);

  const handleUploadFile = () => {
    setHashSuccess(true);
    setButtonText("Wait for few seconds to get the hash");
  };

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
              <Input type="text" />
            </FormControl>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea size="md" minHeight="10em" />
            </FormControl>
            <FormControl id="file">
              <Input type="file" p={1} mb={2} />
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
                onClick={handleUploadFile}
                isDisabled={hashSuccess}
              >
                {buttonText}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
