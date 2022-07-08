import React from "react";
import VideoLibrary from "../videos/VideoLibrary";
import AddVideo from "../videos/AddVideo";
import { Flex, Container } from "@chakra-ui/react";
const Layout = () => {
  return (
    <Flex direction="column" padding={8} gap={4} align="center">
      <AddVideo/>
      <Container as='main' maxW='1200px'>
        <VideoLibrary />
      </Container>
    </Flex>
  );
};

export default Layout;
