import React, { useState, useContext } from "react";
import { Button,Text,Flex,Grid } from "@chakra-ui/react";
import VideoPagination from "../UI/Pagination";
import SingleVideo from "./SingleVideo";
import VideoContext from "../../context/video-context";
const Videos = ({ type }) => {
  const {
    vimeoStoredVideos,
    ytStoredVideos,
    clearVimeoStoredVideos,
    clearYtStoredVideos,
    listView,
    videosPerPage,
  } = useContext(VideoContext);
  const [isReversed, setIsReversed] = useState(false);
  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let favouriteVideos;
  let displayVideo;
  let videosLink;

  const handleReverse = () => {
    setIsReversed((prev) => !prev);

    if (type == "YOUTUBE") {
      ytStoredVideos.reverse();
    } else if (type === "VIMEO") {
      vimeoStoredVideos.reverse();
    }
  };

  //pagination
  let currentVideos;
  const indexOfLastVid = currentPage * videosPerPage;
  const indexOfFirstVid = indexOfLastVid - videosPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (type == "YOUTUBE") {
    videosLink = ytStoredVideos;
  }

  if (type == "VIMEO") {
    videosLink = vimeoStoredVideos;
  }

  currentVideos = videosLink.slice(indexOfFirstVid, indexOfLastVid);
  favouriteVideos = videosLink.filter((video) => video.isFav == true);
  displayVideo = currentVideos.map((video) => {
    return (
      <SingleVideo
        key={video.id}
        type={video.type}
        id={video.id}
        addedAt={video.addedAt}
        isFav={video.isFav}
      />
    );
  });

  return (
    <Flex direction='column' justify='center'>
      <Flex align='center' justify='center' gap={4} marginY={8} >
        {
          <Button
            colorScheme="blue"
            fontSize={{sm:12, lg:16}}
            onClick={() => {
              setShowOnlyFav((prev) => !prev);
            }}
          >
            {!showOnlyFav ? "Show Favourite Videos" : "Show All Videos"}
          </Button>
        }
        <Button colorScheme="blue"  onClick={handleReverse} fontSize={{sm:12, lg:16}}>
          {!isReversed ? "Sort by oldest" : "Sort by newest"}
        </Button>
        {type == "VIMEO" && (
          <Button onClick={clearVimeoStoredVideos} colorScheme="red" fontSize={{sm:12, lg:16}}>
            Clear All
          </Button>
        )}
        {type == "YOUTUBE" && (
          <Button onClick={clearYtStoredVideos} colorScheme="red" fontSize={{sm:12, lg:16}}>
            Clear All
          </Button>
        )}
      </Flex>

      <Grid templateColumns={!listView && ['1fr','null','repeat(2, 1fr)','repeat(4, 1fr)']} gap={4} >
        {!showOnlyFav && displayVideo}
        {showOnlyFav &&
          favouriteVideos.map((video) => {
            return (
              <SingleVideo
                key={video.id}
                type={video.type}
                id={video.id}
                addedAt={video.addedAt}
                isFav={video.isFav}
              />
            );
          })}
      </Grid>

      {!showOnlyFav && (
        <VideoPagination
          itemsPerPage={videosPerPage}
          totalItems={
            type == "YOUTUBE" ? ytStoredVideos.length : vimeoStoredVideos.length
          }
          paginate={paginate}
        />
      )}

      {showOnlyFav && (
        <VideoPagination
          itemsPerPage={videosPerPage}
          totalItems={favouriteVideos.length}
          paginate={paginate}
        />
      )}

      {!favouriteVideos.length && !currentVideos.length && (
        <Text align='center'>
          Your library is empty! Please add some videos.
        </Text>
      )}
    </Flex>
  );
};

export default Videos;
