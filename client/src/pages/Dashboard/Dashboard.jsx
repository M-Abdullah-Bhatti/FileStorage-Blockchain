import React from "react";
import {
  Box,
  Tabs,
  TabIndicator,
  TabList,
  Tab,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import AllUploadedFiles from "../../components/Dashboard/AllUploadedFiles";
import AllSharedFiles from "../../components/Dashboard/AllSharedFiles";
import AllUnsharedFiles from "../../components/Dashboard/AllUnsharedFiles";

const Dashboard = () => {
  return (
    <Box paddingY="10" paddingX="4em" minHeight={"90vh"}>
      <Text
        fontSize="4xl"
        mb={"5"}
        textAlign="center"
        textTransform="uppercase"
      >
        Dashboard
      </Text>
      <Tabs isLazy isFitted position="relative" variant="unstyled">
        <TabList paddingY={1} bg={"gray.100"}>
          <Tab fontSize={"xl"}>My Uploaded Files</Tab>
          <Tab fontSize={"xl"}>My Shared Files</Tab>
          <Tab fontSize={"xl"}>My Unshared Files</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />
        <TabPanels>
          {/* //  First Panel Component */}
          <AllUploadedFiles />

          {/* //  Second Panel Component */}
          <AllSharedFiles />
          {/* //  Third Panel Component */}
          <AllUnsharedFiles />
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
