import React, { useContext } from 'react';
import { Text, Flex, Grid } from '@chakra-ui/react';

import Pagination from '../UI/Pagination/Pagination';
import SingleVideo from './SingleVideo/SingleVideo';
import VideoContext from '../../context/video-context';

const VideosDisplay = () => {
  
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
    const { id, addedAt, isFav, isVimeo, isYt } = video;
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
    const { id, addedAt, isFav, isVimeo, isYt } = video;
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
          !listView && ['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']
        }
        gap={8}
      >
        {!showOnlyFav && displayVideo}
        
        {showOnlyFav && displayFavouriteVideos}
      </Grid>

      {libraryIsEmpty && (
        <Text align="center">
          Your library is empty! Please add some videos.
        </Text>
      )}

      {(!showOnlyFav && !libraryIsEmpty) && (
        <Pagination
          currentPage={currentPage}
          totalCount={storedVideos.length}
          pageSize={videosPerPage}
          changePage={(page) => setCurrentPage(page)}
        />
      )}

      {(showOnlyFav && !libraryIsEmpty) && (
        <Pagination
          currentPage={currentPage}
          totalCount={favouriteVideos.length}
          pageSize={videosPerPage}
          changePage={(page) => setCurrentPage(page)}
        />
      )}
    </Flex>
  );

};

export default VideosDisplay;
