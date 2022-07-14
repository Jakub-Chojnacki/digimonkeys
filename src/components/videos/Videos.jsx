import React, { useContext } from "react";
import { Text, Flex, Grid } from "@chakra-ui/react";

import Pagination from "../UI/Pagination/Pagination";
import SingleVideo from "./SingleVideo/SingleVideo";
import VideoContext from "../../context/video-context";

const Videos = () => {

  const {
    listView,
    videosPerPage,
    storedVideos,
    showOnlyFav,
    currentPage,
    setCurrentPage,
  } = useContext(VideoContext);

  const indexOfLastVid = currentPage * videosPerPage;
  const indexOfFirstVid = indexOfLastVid - videosPerPage;

  let currentVideos = storedVideos.slice(indexOfFirstVid, indexOfLastVid);

  let favouriteVideos = storedVideos.filter((video) => video.isFav == true);
  let currentFavVideos = favouriteVideos.slice(indexOfFirstVid, indexOfLastVid);

  let libraryIsEmpty = !favouriteVideos.length && !currentVideos.length;
  
  let displayVideo = currentVideos.map((video) => {
    const {id,addedAt,isFav,isVimeo,isYt}= video 
    return (
      <SingleVideo
        key={id}
        id={id}
        addedAt={addedAt}
        isFav={isFav}
        isVimeo={isVimeo}
        isYt={isYt}
      />
    );
  });

  let displayFavouriteVideos = currentFavVideos.map((video) => {
    const {id,addedAt,isFav,isVimeo,isYt}= video 
    return (
      <SingleVideo
        key={id}
        id={id}
        addedAt={addedAt}
        isFav={isFav}
        isVimeo={isVimeo}
        isYt={isYt}
      />
    );
  });

  return (

    <Flex direction="column" justify="center">
      <Grid
        templateColumns={
          !listView && ["1fr", "1fr", "repeat(2, 1fr)", "repeat(4, 1fr)"]
        }
        gap={4}
      >
        {!showOnlyFav && displayVideo}

        {showOnlyFav && displayFavouriteVideos}

      </Grid>
      {!showOnlyFav && (
        <Pagination
          currentPage={currentPage}
          totalCount={storedVideos.length}
          pageSize={videosPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {showOnlyFav && (
        <Pagination
          currentPage={currentPage}
          totalCount={favouriteVideos.length}
          pageSize={videosPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {libraryIsEmpty && (
        <Text align="center">
          Your library is empty! Please add some videos.
        </Text>
      )}
    </Flex>
  
  );
};

export default Videos;
