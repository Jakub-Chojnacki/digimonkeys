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
const LibraryActionButtons = () => {
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
    <>
      <Button
        colorScheme="blue"
        fontSize={{ sm: 12, lg: 16 }}
        onClick={() => {
          setShowOnlyFav((prev) => !prev);
          setCurrentPage(1);
        }}
      >
        {!showOnlyFav ? "Show Favourite Videos" : "Show All Videos"}
      </Button>

      <Button
        colorScheme="blue"
        onClick={handleReverse}
        fontSize={{ sm: 12, lg: 16 }}
      >
        {!isVideoOrderReversed ? "Sort by oldest" : "Sort by newest"}
      </Button>

      <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
        <PopoverTrigger>
          <Button
            onClick={() => setShowPopover(true)}
            colorScheme="red"
            fontSize={{ sm: 12, lg: 16 }}
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
    </>
  );
};

export default LibraryActionButtons;
