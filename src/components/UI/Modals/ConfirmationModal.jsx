import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

const ConfirmationModal = ({
  buttonText,
  buttonColorScheme,
  confirmationText,
  confirmationAction,
}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ConfirmAction = () => {
    confirmationAction();
    onClose();
  };
  
  return (
    
    <Box>
      <Button fontSize={['9','12', '16','16']} colorScheme={buttonColorScheme} onClick={onOpen}>
        {buttonText}
      </Button>
      <Modal
        size={['xs', 'md']}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent backgroundColor="gray.200">
          <ModalCloseButton />
          <ModalBody p={10}>
            <Flex align="center" justify="center" direction="column">
              {confirmationText}
              <Flex marginTop={6} align="center" justify="space-around" gap={6} w="100%">
                <Button colorScheme="green" onClick={ConfirmAction}>
                  Yes
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  No
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  );
};

export default ConfirmationModal;
