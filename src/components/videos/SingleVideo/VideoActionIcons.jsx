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

const VideoActionIcons = ({ id, isFav, openVideoModal }) => {
  const [showPopover, setShowPopover] = useState(false);
  const { deleteVideoHandler, toggleFavHandler } = useContext(VideoContext);

  return (
    <Flex align="center" justify="space-around" fontSize={20} width="100%">
      <Button
        onClick={openVideoModal}
        _hover={{
          background: 'white',
        }}
      >
        <Icon
          as={AiFillEye}
          cursor="pointer"
          data-test-name="watch"
          fontSize={24}
        />
      </Button>
      <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
        <PopoverTrigger>
          <Button
            onClick={() => setShowPopover(true)}
            _hover={{
              background: 'white',
            }}
          >
            <Icon
              as={FaTrashAlt}
              cursor="pointer"
              data-test-name="delete"
              fontSize={20}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            <Text fontSize={16}>
              Are you sure you want to delete this video?
            </Text>
            <Flex marginTop={4} align="center" justify="space-around">
              <Button
                colorScheme="green"
                onClick={() => deleteVideoHandler(id)}
              >
                Yes
              </Button>
              <Button colorScheme="red" onClick={() => setShowPopover(false)}>
                No
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {isFav ? (
        <Button
          onClick={() => toggleFavHandler(id, isFav)}
          _hover={{
            background: 'white',
          }}
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
          _hover={{
            background: 'white',
          }}
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
