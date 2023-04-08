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
import AllReceivedFiles from "../../components/Dashboard/AllReceivedFiles";

const Dashboard = () => {
  return (
    <Box paddingY="10" paddingX="4em" minHeight={"90vh"}>
      <Text
        mb={"5"}
        fontSize="5xl"
        textAlign="center"
        textTransform="uppercase"
        textColor="#0d8775"
        fontFamily="auto"
      >
        Dashboard
      </Text>
      <Tabs isLazy isFitted position="relative" variant="unstyled">
        <TabList paddingY={1} bg={"#e1fffd"}>
          <Tab fontSize={"xl"}>My Uploaded Files</Tab>
          <Tab fontSize={"xl"}>My Shared Files</Tab>
          <Tab fontSize={"xl"}>My Unshared Files</Tab>
          <Tab fontSize={"xl"}>My Received Files</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />
        <TabPanels>
          {/* //  First Panel Component */}
          <AllUploadedFiles />

          {/* //  Second Panel Component */}
          <AllSharedFiles />
          {/* //  Third Panel Component */}
          <AllUnsharedFiles />
          {/* //  Fourth Panel Component */}
          <AllReceivedFiles />
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
