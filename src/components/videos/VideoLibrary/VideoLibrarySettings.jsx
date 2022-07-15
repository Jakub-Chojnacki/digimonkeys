import React, { useContext } from 'react';
import { Button, Text, Flex } from '@chakra-ui/react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CgMenuGridR } from 'react-icons/cg';

import ConfirmationModal from '../../UI/Modals/ConfirmationModal';
import VideoContext from '../../../context/video-context';

const VideoLibrarySettings = () => {

  const {
    toggleListDisplay,
    toggleTileDisplay,
    listView,
    loadDemo,
    clearStoredVideos,
  } = useContext(VideoContext);

  const loadDemoConfirmationModalText = (
    <>
      <Text fontSize={['14', '16', '16', '18']}>
        Are you sure you want to load demo videos?
      </Text>
      <Text fontSize={12} color="red.400">
        IT WILL OVERWRITE YOUR VIDEOS!!!
      </Text>
    </>
  );

  const deleteConfirmationModalText = (
    <>
      <Text align="center" fontSize="20">
        Are you sure you want to delete ALL videos?
      </Text>
    </>
  );

  return (
    <Flex gap={2} direction="row">
      <Flex gap={1}>
        <Button
          colorScheme={!listView ? 'blue' : 'gray'}
          onClick={toggleTileDisplay}
        >
          <CgMenuGridR />
        </Button>
        <Button
          colorScheme={listView ? 'blue' : 'gray'}
          onClick={toggleListDisplay}
        >
          <AiOutlineUnorderedList />
        </Button>
      </Flex>
      <Flex align="start" direction="column">
        <ConfirmationModal
          buttonText="Load Demo Videos"
          buttonColorScheme="blue"
          confirmationText={loadDemoConfirmationModalText}
          confirmationAction={loadDemo}
        />
      </Flex>
      <ConfirmationModal
        buttonText="Delete All"
        buttonColorScheme="blue"
        confirmationText={deleteConfirmationModalText}
        confirmationAction={clearStoredVideos}
      />
    </Flex>
  );
  
};

export default VideoLibrarySettings;
