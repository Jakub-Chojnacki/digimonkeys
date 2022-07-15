import React from 'react';
import { Flex, Container } from '@chakra-ui/react';

import VideoLibrary from '../videos/VideoLibrary/VideoLibrary';
import AddVideo from '../videos/AddVideo'

const Layout = () => {

  return (
    <Flex as="main" direction="column" align="center">
      <AddVideo/>
      <Container maxW="1200px" paddingX={['0', '6', '8']}>
        <VideoLibrary />
      </Container>
    </Flex>
  );
  
};

export default Layout;
