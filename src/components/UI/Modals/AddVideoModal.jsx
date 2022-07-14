import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from '@chakra-ui/react';

import AddVideo from '../../videos/AddVideo';

const AddVideoModal = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme={'green'} onClick={onOpen}>
        Add a new Video
      </Button>
      <Modal
        size={['xs', 'md', 'xl']}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody paddingY={16}>
            <Text marginLeft={4} marginBottom={2} fontWeight="bold">
              Input the link/id below:
            </Text>

            <AddVideo />
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  );
};

export default AddVideoModal;
