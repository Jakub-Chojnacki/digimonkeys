import React, { useContext,useState } from "react";
import VideoContext from "../../context/video-context";
import {Button } from "@chakra-ui/react";
const LibraryActionButtons = () => {
  const { clearStoredVideos, setShowOnlyFav, setCurrentPage, showOnlyFav,storedVideos,isVideoOrderReversed,setIsVideoOrderReversed } =
    useContext(VideoContext);
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

      <Button
        onClick={clearStoredVideos}
        colorScheme="red"
        fontSize={{ sm: 12, lg: 16 }}
      >
        Clear All
      </Button>
    </>
  );
};

export default LibraryActionButtons;
