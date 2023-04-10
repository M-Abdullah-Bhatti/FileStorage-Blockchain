import {
  Card,
  CardHeader,
  Heading,
  Tooltip,
  Button,
  Icon,
  CardBody,
  Link,
  Text,
  CardFooter,
} from "@chakra-ui/react";
import { BsFillShareFill } from "react-icons/bs";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const CardComponent = (props) => {
  // console.log("Props.dataaaaaaaaaaa" + props.data.fileId);
  const {
    onOpen,
    fileId,
    fileName,
    fileDescription,
    fileOwner,
    fileHash,
    filePrice,
  } = props;

  return (
    <Card>
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="-1em"
      >
        <Heading fontFamily="auto" size="md">
          {" "}
          File id # {fileId}
        </Heading>
        <Tooltip label="Share File" placement="auto">
          <Button onClick={onOpen}>
            <Icon as={BsFillShareFill} boxSize={6} />
          </Button>
        </Tooltip>
      </CardHeader>
      <CardBody>
        <Text textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Name:{" "}
          </Text>
          {fileName}
        </Text>
        <Text fontFamily="auto" textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Description:{" "}
          </Text>
          {fileDescription}
        </Text>

        <Text fontFamily="auto" textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Owner:{" "}
          </Text>
          abalfalfnasl
          {/* {`${fileOwner.slice(0, 16)}....${fileOwner.slice(-4)}`} */}
        </Text>

        <Text
          fontWeight="bold"
          fontSize="lg"
          fontFamily="auto"
          textAlign="left"
          marginBottom="0.5em"
        >
          {" "}
          View:{" "}
          <Link
            fontWeight="light"
            fontSize="md"
            href={`https://gateway.pinata.cloud/ipfs/${fileHash}`}
            isExternal
          >
            {/* {fileHash.slice(0, 15) + "..." + fileHash.slice(-10)}{" "} */}
            abdjadajfbafbafbafbakbfas
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text fontFamily="auto" textAlign="left">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Price:{" "}
          </Text>
          lnladd
          {/* {filePrice} ETH */}
        </Text>
      </CardBody>
      <CardFooter>
        <Button
          marginX="auto"
          backgroundColor="black"
          textColor="white"
          width="100%"
          paddingY="1.4em"
          _hover={{
            backgroundColor: "blackAlpha.800",
          }}
        >
          Buy File
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
