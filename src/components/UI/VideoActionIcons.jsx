import React, { useContext, useState } from "react";
import VideoContext from "../../context/video-context";
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
} from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar, AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
const VideoActionIcons = ({ id,isFav,openVideoModal }) => {
  const [showPopover, setShowPopover] = useState(false);
  const { deleteVideoHandler, toggleFavHandler } =
    useContext(VideoContext);
  return (
    <Flex align="center" justify="space-around" fontSize={24}>
      <Icon
        as={AiFillEye}
        cursor="pointer"
        data-test-name="watch"
        onClick={openVideoModal}
      />{" "}
      <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)} >
        <PopoverTrigger>
          <Button onClick={() => setShowPopover(true)}>
            <Icon as={FaTrashAlt} cursor="pointer" data-test-name="delete" />
          </Button>
        </PopoverTrigger>
        <PopoverContent >
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody >
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
        <Icon
          as={AiFillStar}
          cursor="pointer"
          data-test-name="fav"
          onClick={() => toggleFavHandler(id, isFav)}
        />
      ) : (
        <Icon
          as={AiOutlineStar}
          cursor="pointer"
          data-test-name="notFav"
          onClick={() => toggleFavHandler(id, isFav)}
        />
      )}
    </Flex>
  );
};

export default VideoActionIcons;
