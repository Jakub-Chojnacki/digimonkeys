import React from "react";
import { Flex, Container } from "@chakra-ui/react";

import VideoLibrary from "../videos/VideoLibrary/VideoLibrary";
import AddVideo from "../videos/AddVideo";

const Layout = () => {
  return (
    <Flex direction="column" align="center">
       <Container as='main' maxW='1200px' paddingX={['0','6','8']}>
        <VideoLibrary />
      </Container>
      <AddVideo/>
    </Flex>
  );
};

export default Layout;
