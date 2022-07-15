import React, { useContext } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Flex, Icon, Button } from '@chakra-ui/react';

import VideoContext from '../../../context/video-context';;

const VideoLibraryActionButtons = () => {

  const {
    setShowOnlyFav,
    setCurrentPage,
    showOnlyFav,
    storedVideos,
    isVideoOrderReversed,
    setIsVideoOrderReversed,
  } = useContext(VideoContext);

  const handleReverseVideos = () => {
    setIsVideoOrderReversed((prev) => !prev);
    storedVideos.reverse();
  };

  const handleToggleOnlyFav = () => {
    setShowOnlyFav((prev) => !prev);
    setCurrentPage(1);
  };

  return (

    <Flex gap={2} justify={{ md: 'end' }}>
      <Button
        colorScheme="blue"
        onClick={handleReverseVideos}
        fontSize={['8', '12','12', '16']}
      >
        {!isVideoOrderReversed ? 'Sort by oldest' : 'Sort by newest'}
      </Button>
      
       <Button
        colorScheme={!showOnlyFav ? 'gray' : 'green'}
        fontSize={['8', '12','12', '16']}
        onClick={handleToggleOnlyFav}
      >
        <Icon as={!showOnlyFav ? AiOutlineStar : AiFillStar} marginRight={2} />{' '}
        Only Show Favourite Videos
      </Button>
    </Flex>

  );
};

export default VideoLibraryActionButtons;
