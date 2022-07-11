import React, { useState, useContext } from "react";
import { Button, Text, Flex, Grid } from "@chakra-ui/react";
import VideoPagination from "../UI/Pagination";
import SingleVideo from "./SingleVideo";
import VideoContext from "../../context/video-context";
const Videos = () => {
  const {
    clearStoredVideos,
    listView,
    videosPerPage,
    storedVideos,
    showOnlyFav,
    setShowOnlyFav,
  } = useContext(VideoContext);
  const [isReversed, setIsReversed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleReverse = () => {
    setIsReversed((prev) => !prev);
    storedVideos.reverse();
  };

  const indexOfLastVid = currentPage * videosPerPage;
  const indexOfFirstVid = indexOfLastVid - videosPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let currentVideos = storedVideos.slice(indexOfFirstVid, indexOfLastVid);
  let favouriteVideos = storedVideos.filter((video) => video.isFav == true);
  let displayVideo = currentVideos.map((video) => {
    return (
      <SingleVideo
        key={video.id}
        id={video.id}
        addedAt={video.addedAt}
        isFav={video.isFav}
        isVimeo={video.isVimeo}
        isYt={video.isYt}
      />
    );
  });

  return (
    <Flex direction="column" justify="center">
      <Flex align="center" justify="center" gap={4} marginY={8}>
        {
          <Button
            colorScheme="blue"
            fontSize={{ sm: 12, lg: 16 }}
            onClick={() => {
              setShowOnlyFav((prev) => !prev);
            }}
          >
            {!showOnlyFav ? "Show Favourite Videos" : "Show All Videos"}
          </Button>
        }
        <Button
          colorScheme="blue"
          onClick={handleReverse}
          fontSize={{ sm: 12, lg: 16 }}
        >
          {!isReversed ? "Sort by oldest" : "Sort by newest"}
        </Button>

        <Button
          onClick={clearStoredVideos}
          colorScheme="red"
          fontSize={{ sm: 12, lg: 16 }}
        >
          Clear All
        </Button>
      </Flex>

      <Grid
        templateColumns={
          !listView && ["1fr", "null", "repeat(2, 1fr)", "repeat(4, 1fr)"]
        }
        gap={4}
      >
        {!showOnlyFav && displayVideo}
        {showOnlyFav &&
          favouriteVideos.map((video) => {
            return (
              <SingleVideo
                key={video.id}
                id={video.id}
                addedAt={video.addedAt}
                isFav={video.isFav}
                isVimeo={video.isVimeo}
                isYt={video.isYt}
              />
            );
          })}
      </Grid>

      {showOnlyFav && (
        <VideoPagination
          itemsPerPage={videosPerPage}
          totalItems={favouriteVideos.length}
          paginate={paginate}
        />
      )}

      {!favouriteVideos.length && !currentVideos.length && (
        <Text align="center">
          Your library is empty! Please add some videos.
        </Text>
      )}
    </Flex>
  );
};

export default Videos;
