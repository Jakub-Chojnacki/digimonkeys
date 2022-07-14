import React, { useContext } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Flex, Icon, Button } from '@chakra-ui/react';

import VideoContext from '../../../context/video-context';
import ConfirmationModal from '../../UI/Modals/ConfirmationModal';

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

  const handleReverseVideos = () => {
    setIsVideoOrderReversed((prev) => !prev);
    storedVideos.reverse();
  };

  const handleToggleOnlyFav = () => {
    setShowOnlyFav((prev) => !prev);
    setCurrentPage(1);
  };

  return (

    <Flex gap={2} justify={{ lg: 'end' }}>
      <Button
        colorScheme={!showOnlyFav ? 'gray' : 'green'}
        fontSize={['8', '12', '16']}
        onClick={handleToggleOnlyFav}
      >
        <Icon as={!showOnlyFav ? AiOutlineStar : AiFillStar} marginRight={2} />{' '}
        Only Show Favourite Videos
      </Button>

      <Button
        colorScheme="blue"
        onClick={handleReverseVideos}
        fontSize={['8', '12', '16']}
      >
        {!isVideoOrderReversed ? 'Sort by oldest' : 'Sort by newest'}
      </Button>
      <ConfirmationModal
        buttonText="Delete All"
        buttonColorScheme="blue"
        confirmationText={'Are you sure you want to delete ALL videos?'}
        confirmationAction={clearStoredVideos}
      />
    </Flex>

  );
};

export default VideoLibraryActionButtons;
