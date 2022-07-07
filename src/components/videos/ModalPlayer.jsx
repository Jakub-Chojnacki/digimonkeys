import React from "react";
import ReactPlayer from "react-player";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const PlayerModal = ({ type, id, hideModal,showModal }) => {
  let modalLink;
  if (type === "YOUTUBE") {
    modalLink = `https://www.youtube.com/watch?v=${id}`;
  } else if (type === "VIMEO") {
    modalLink = `https://vimeo.com/${id}`;
  }

  return (
      <Modal size={['xs','xs','md','2xl']} isOpen={showModal} onClose={hideModal} motionPreset='slideInBottom'  isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={10}>
            <ReactPlayer controls url={modalLink} width="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default PlayerModal;
