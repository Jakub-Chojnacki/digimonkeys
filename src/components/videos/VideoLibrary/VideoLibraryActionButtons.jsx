import React, { useContext } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import {
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react';

import VideoContext from '../../../context/video-context';
import ConfirmationModal from '../../UI/ConfirmationModal';

const VideoLibraryActionButtons = () => {
 
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
      <ConfirmationModal buttonText="Clear All" buttonColorScheme="blue" confirmationText={"Are you sure you want to clear videos?"} confirmationAction={clearStoredVideos} />
    </Flex>
  );
};

export default VideoLibraryActionButtons;
