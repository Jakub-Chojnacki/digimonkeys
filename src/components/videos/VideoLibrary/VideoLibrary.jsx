import React, { useContext } from 'react';
import { Container, Flex, Box, Grid } from '@chakra-ui/react';

import VideoLibrarySettings from './VideoLibrarySettings';
import VideoLibraryActionButtons from './VideoLibraryActionButtons';
import VideoContext from '../../../context/video-context';
import Videos from '../Videos';

const VideoLibrary = () => {
  
  const { showOnlyFav } = useContext(VideoContext);
  return (
    <Container maxW="1200px" marginY={6}>
      <Grid align="center" gap={4}>
        <VideoLibrarySettings />
        <VideoLibraryActionButtons />
      </Grid>
      <Box>
        <Flex align="center" justify="center" gap={4} marginY={4}></Flex>
        <Videos />
      </Box>
    </Container>
  );
};

export default VideoLibrary;
