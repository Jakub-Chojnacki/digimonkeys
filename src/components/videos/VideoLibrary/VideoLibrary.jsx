import React from 'react';
import { Container, Box, Grid } from '@chakra-ui/react';

import VideoLibrarySettings from './VideoLibrarySettings';
import VideoLibraryActionButtons from './VideoLibraryActionButtons';
import Videos from '../Videos';

const VideoLibrary = () => {

  return (
    <Container maxW="1200px" marginY={6}>
      <Grid alignItems="center" gap={4}  templateColumns={{lg:"repeat(2, 1fr)"}}>
        <VideoLibrarySettings />
        <VideoLibraryActionButtons />
      </Grid>
      <Box marginY={6}>
        <Videos />
      </Box>
    </Container>
  );
  
};

export default VideoLibrary;
