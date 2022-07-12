import React, { useState, useContext } from "react";
import { Text, Flex, Grid } from "@chakra-ui/react";
import Pagination from "../UI/Navigation/videoPagination";
import SingleVideo from "./SingleVideo";
import VideoContext from "../../context/video-context";
import LibraryActionButtons from "../UI/LibraryActionButtons";
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
  let favouriteVideos = storedVideos.filter((video) => video.isFav == true)
  let currentFavVideos = favouriteVideos.slice(indexOfFirstVid, indexOfLastVid);
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

  let displayFavouriteVideos = currentFavVideos.map((video) => {
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
        <LibraryActionButtons />
      </Flex>

      <Grid
        templateColumns={
          !listView && ["1fr", "null", "repeat(2, 1fr)", "repeat(4, 1fr)"]
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

      {!favouriteVideos.length && !currentVideos.length && (
        <Text align="center">
          Your library is empty! Please add some videos.
        </Text>
      )}
    </Flex>
  );
};

export default Videos;
