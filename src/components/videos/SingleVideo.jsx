import React, { useContext, useState } from "react";
import useFetchVideo from "../../hooks/useFetchVideo";
import { AiOutlineStar, AiFillStar, AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import VideoContext from "../../context/video-context";
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import ModalPlayer from "./ModalPlayer";
const SingleVideo = ({ type, id, addedAt, isFav }) => {
  const { res } = useFetchVideo(type, id);
  const {
    ytStoredVideos,
    vimeoStoredVideos,
    setYtStoredVideos,
    setVimeoStoredVideos,
    listView,
    deleteVideoHandler,
  } = useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);

  const showVideoHandler = () => {
    setShowModal(true);
  };
  const toggleFavHandler = () => {
    if (type === "YOUTUBE") {
      setYtStoredVideos(
        ytStoredVideos.map((item) => {
          if (item.id === id) {
            let stored = JSON.parse(localStorage.getItem("ytVideos"));
            stored.map((item) => {
              if (item.id == id) {
                item.isFav = !item.isFav;
                const newStorage = JSON.stringify(stored, {
                  ...item,
                  isFav: !isFav,
                });
                localStorage.setItem("ytVideos", newStorage);
              }
            });
            return {
              ...item,
              isFav: !item.isFav,
            };
          }
          return item;
        })
      );
    } else if (type === "VIMEO") {
      setVimeoStoredVideos(
        vimeoStoredVideos.map((item) => {
          if (item.id === id) {
            let stored = JSON.parse(localStorage.getItem("vimeoVideos"));
            stored.map((item) => {
              if (item.id == id) {
                item.isFav = !item.isFav;
                const newStorage = JSON.stringify(stored, {
                  ...item,
                  isFav: !isFav,
                });
                localStorage.setItem("vimeoVideos", newStorage);
              }
            });
            return {
              ...item,
              isFav: !item.isFav,
            };
          }
          return item;
        })
      );
    }
  };

  let displayVideoData = <p>Loading...</p>;
  const icons = (
    <Flex
      align="center"
      justify="space-around"
      fontSize={24}
    >
      <Icon
        as={AiFillEye}
        cursor="pointer"
        data-test-name="watch"
        onClick={showVideoHandler}
      />{" "}
      <Icon
        as={FaTrashAlt}
        cursor="pointer"
        data-test-name="delete"
        onClick={() => deleteVideoHandler(type, id)}
      />{" "}
      {isFav ? (
        <Icon
          as={AiFillStar}
          cursor="pointer"
          data-test-name="fav"
          onClick={toggleFavHandler}
        />
      ) : (
        <Icon
          as={AiOutlineStar}
          cursor="pointer"
          data-test-name="notFav"
          onClick={toggleFavHandler}
        />
      )}
    </Flex>
  );

  // if and else if  breaks DRY principles but it's more readable this way
  if (res && type === "YOUTUBE") {
    const items = res.data.items[0];
    displayVideoData = (
      <Flex direction={listView ? "row" : "column"} width='100%'>
        <Image
          cursor="pointer"
          src={items.snippet.thumbnails.high.url}
          onClick={showVideoHandler}
        />
        <Flex direction='column' justify='space-between' flexGrow='3'>
          <Box padding={2}>
            <Heading size="sm" noOfLines={2}>
              {items.snippet.title}
            </Heading>
            <p>{`Views: ${items.statistics.viewCount}`}</p>
            <p>{`Likes: ${items.statistics.likeCount}`}</p>
            <p>{`Added at : ${addedAt}`}</p>
          </Box>
          {icons}
        </Flex>
      </Flex>
    );
  } else if (res && type === "VIMEO") {
    const items = res.data;
    displayVideoData = (
      <Flex direction={listView ? "row" : "column"}>
        <Image src={items.pictures.sizes[3].link} onClick={showVideoHandler} />
        <Flex direction='column' justify='space-between'>
        <Box p={2}>
          <Heading size="sm" noOfLines={2}>
            {items.name}
          </Heading>
          <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
          <p>{`Added at : ${addedAt}`}</p>
        </Box>
        {icons}
        </Flex>
      </Flex>
    );
  }

  let cardDisplay = (
    <Flex
      background="gray.100"
      p={4}
      borderRadius="8px"
      direction="column"
      justify="space-between"
      gap={2}
    >
      {displayVideoData}
   
    </Flex>
  );

  let listDisplay = (
    <Flex direction="row" justify="space-between" width='100%'>
      {displayVideoData}
    </Flex>
  );

  return (
    <Flex justify="space-between" marginBottom={4}>
      {!listView && cardDisplay}
      {listView && listDisplay}
      {showModal && (
        <ModalPlayer
          type={type}
          id={id}
          hideModal={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </Flex>
  );
};

export default SingleVideo;
