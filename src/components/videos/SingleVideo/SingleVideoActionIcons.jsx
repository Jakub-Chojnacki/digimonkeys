import React, { useContext} from 'react';
import { AiOutlineStar, AiFillStar, AiFillEye } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import {
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react';

import VideoContext from '../../../context/video-context';
import ConfirmationModal from '../../UI/Modals/ConfirmationModal';

const SingleVideoActionIcons = ({ id, isFav, openVideoModal }) => {
  const { deleteVideoHandler, toggleFavHandler } = useContext(VideoContext);

  return (

    <Flex align="center" justify="space-between" fontSize={20} width="100%">
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
            fontSize={22}
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
            fontSize={24}
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
            fontSize={24}
          />
        </Button>
      )}
    </Flex>

  );
};

export default SingleVideoActionIcons;
