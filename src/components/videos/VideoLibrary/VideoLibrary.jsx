import React from 'react';
import { Container, Box, Grid } from '@chakra-ui/react';

import VideoLibrarySettings from './VideoLibrarySettings';
import VideoLibraryActionButtons from './VideoLibraryActionButtons';
import VideosDisplay from '../VideosDisplay';

const VideoLibrary = () => {

  return (
    <Container maxW="1200px" marginY={6}>
      <Grid alignItems="center" gap={4}  templateColumns={{md:"repeat(2, 1fr)"}}>
        <VideoLibrarySettings />
        <VideoLibraryActionButtons />
      </Grid>
      <Box marginY={6}>
        <VideosDisplay />
      </Box>
    </Container>
  );
  
};

export default VideoLibrary;
