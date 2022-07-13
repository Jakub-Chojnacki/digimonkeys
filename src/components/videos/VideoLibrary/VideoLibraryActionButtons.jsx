import React, { useContext, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import VideoContext from '../../../context/video-context';
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
const VideoLibraryActionButtons = () => {
  const [showPopover, setShowPopover] = useState(false);
  const handleSubmitConfirmation = () => {
    clearStoredVideos();
    setShowPopover(false);
  };
  const {
    clearStoredVideos,
    setShowOnlyFav,
    setCurrentPage,
    showOnlyFav,
    storedVideos,
    isVideoOrderReversed,
    setIsVideoOrderReversed,
  } = useContext(VideoContext);
  const handleReverse = () => {
    setIsVideoOrderReversed((prev) => !prev);
    storedVideos.reverse();
  };
  return (
    <Flex gap={2}>
      <Button
        colorScheme={!showOnlyFav ? 'gray' : 'blue'}
        fontSize={['8', '12', '16']}
        onClick={() => {
          setShowOnlyFav((prev) => !prev);
          setCurrentPage(1);
        }}
      >
        <Icon as={!showOnlyFav ? AiOutlineStar : AiFillStar} marginRight={2}/> Only Show
        Favourite Videos
      </Button>

      <Button
        colorScheme="blue"
        onClick={handleReverse}
        fontSize={['8', '12', '16']}
      >
        {!isVideoOrderReversed ? 'Sort by oldest' : 'Sort by newest'}
      </Button>

      <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
        <PopoverTrigger>
          <Button
            onClick={() => setShowPopover(true)}
            colorScheme="blue"
            fontSize={['8', '12', '16']}
          >
            Clear All
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            <Text fontSize={16}>Are you sure you want to clear videos?</Text>
            <Flex marginTop={4} align="center" justify="space-around">
              <Button colorScheme="green" onClick={handleSubmitConfirmation}>
                Yes
              </Button>
              <Button colorScheme="red" onClick={() => setShowPopover(false)}>
                No
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default VideoLibraryActionButtons;
