import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Flex,
} from '@chakra-ui/react';

const PlayerModal = ({ id, hideModal, showModal, isYt, isVimeo }) => {

  const [loadingVideo, setLoadingVideo] = useState(true);

  let modalVideoLink;

  if (isYt) {
    modalVideoLink = `https://www.youtube.com/watch?v=${id}`;
  }

  if (isVimeo) {
    modalVideoLink = `https://vimeo.com/${id}`;
  }

  return (
    <Modal
      size={['xs', 'md', 'md', '2xl']}
      isOpen={showModal}
      onClose={hideModal}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent backgroundColor="gray.200">
        <ModalCloseButton />
        <ModalBody p={10}>
          <Flex align="center" justify="center">
            {loadingVideo && (
              <Spinner
                thickness="6px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
            <ReactPlayer
              controls
              url={modalVideoLink}
              width={loadingVideo ? '0px' : '100%'}
              display={loadingVideo ? 'none' : 'block'}
              onReady={() => setLoadingVideo(false)}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlayerModal;
