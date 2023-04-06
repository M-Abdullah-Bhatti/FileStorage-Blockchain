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

const CardComponent = ({ data, onOpen }) => {
  return (
    <Card>
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="-1em"
      >
        <Heading fontFamily="sans-serif" size="md">
          {" "}
          File id # {data.fileId}
        </Heading>
        <Tooltip label="Share File" placement="auto">
          <Button onClick={onOpen}>
            <Icon as={BsFillShareFill} boxSize={6} />
          </Button>
        </Tooltip>
      </CardHeader>
      <CardBody>
        <Text fontFamily="sans-serif" textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Name:{" "}
          </Text>
          {data.name}
        </Text>
        <Text fontFamily="sans-serif" textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Description:{" "}
          </Text>
          {data.description}
        </Text>

        <Text fontFamily="sans-serif" textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Owner:{" "}
          </Text>
          {`${data.owner.slice(0, 16)}....${data.owner.slice(-4)}`}
        </Text>

        <Text
          fontWeight="bold"
          fontSize="lg"
          fontFamily="sans-serif"
          textAlign="left"
          marginBottom="0.5em"
        >
          {" "}
          View:{" "}
          <Link
            fontWeight="light"
            fontSize="md"
            href="https://chakra-ui.com"
            isExternal
          >
            {data.link} <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text fontFamily="sans-serif" textAlign="left">
          <Text fontWeight="bold" fontSize="lg" display="inline">
            {" "}
            Price:{" "}
          </Text>
          {data.price} ETH
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
