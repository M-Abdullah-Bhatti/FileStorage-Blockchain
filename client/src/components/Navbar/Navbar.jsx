import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";

const Links = [
  {
    linkText: "Dashboard",
    linkUrl: "/dashboard",
  },
  {
    linkText: "Upload File",
    linkUrl: "/uploadfile",
  },
  {
    linkText: "Files For Sale",
    linkUrl: "/filesforsale",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="#fdfdfd" px={"5em"} boxShadow="sm">
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontFamily="auto"
          fontSize={"lg"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              fontWeight="bold"
              fontSize={{ base: "sm", md: "3xl" }}
              marginRight="1em"
            >
              <Link to="/">DFS System </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((data) => (
                <NavLink key={data.linkUrl} data={data} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <NavButtons isMobileScreen={false} />

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                marginLeft="0.5em"
              >
                <Avatar size={"lg"} src={"/profile.png"} />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((data) => (
                <NavLink key={data.linkUrl} data={data} />
              ))}

              <NavButtons isMobileScreen={true} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
