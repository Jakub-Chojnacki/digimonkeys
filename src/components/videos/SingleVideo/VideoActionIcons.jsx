import React, { useContext, useState } from 'react';
import { AiOutlineStar, AiFillStar, AiFillEye } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import {
  Flex,
  Icon,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';

import VideoContext from '../../../context/video-context';
import ConfirmationModal from '../../UI/ConfirmationModal';

const VideoActionIcons = ({ id, isFav, openVideoModal }) => {
  const [showPopover, setShowPopover] = useState(false);
  const { deleteVideoHandler, toggleFavHandler } = useContext(VideoContext);

  return (
    <Flex align="center" justify="space-around" fontSize={20} width="100%">
      <Button
        onClick={openVideoModal}
        colorScheme="gray"
      >
        <Icon
          as={AiFillEye}
          cursor="pointer"
          data-test-name="watch"
          fontSize={24}
        />
      </Button>

        <ConfirmationModal
          buttonText={<Icon
            as={FaTrashAlt}
            cursor="pointer"
            data-test-name="delete"
            fontSize={20}
            background="none"
          />}
          buttonColorScheme="gray"
          confirmationText={"Are you sure you want to delete this video?"}
          confirmationAction={() => deleteVideoHandler(id)}
        />
      {isFav ? (
        <Button
          onClick={() => toggleFavHandler(id, isFav)}
          colorScheme="gray"
        >
          <Icon
            as={AiFillStar}
            cursor="pointer"
            data-test-name="fav"
            fontSize={20}
          />
        </Button>
      ) : (
        <Button
          onClick={() => toggleFavHandler(id, isFav)}
          colorScheme="gray"
        >
          <Icon
            as={AiOutlineStar}
            cursor="pointer"
            data-test-name="notFav"
            fontSize={20}
          />
        </Button>
      )}
    </Flex>
  );
};

export default VideoActionIcons;
