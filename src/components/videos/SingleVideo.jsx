import React, { useContext, useState } from "react";
import useFetchVideo from "../../hooks/useFetchVideo";
import { AiOutlineStar, AiFillStar, AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import VideoContext from "../../context/video-context";
import { Flex, Box, Text, Heading, Image, Icon,Spinner } from "@chakra-ui/react";
import ModalPlayer from "./ModalPlayer";
const SingleVideo = ({ type, id, addedAt, isFav }) => {
  const { res } = useFetchVideo(type, id);
  const {
    ytStoredVideos,
    vimeoStoredVideos,
    setYtStoredVideos,
    setVimeoStoredVideos,
    listView,
  } = useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);

  const showVideoHandler = () => {
    setShowModal(true);
  };

  const deleteHandler = () => {
    if (type == "YOUTUBE") {
      setYtStoredVideos((prev) => prev.filter((el) => el.id !== id));
      let stored = JSON.parse(localStorage.getItem("ytVideos"));
      localStorage.setItem(
        "ytVideos",
        JSON.stringify(stored.filter((el) => el.id !== id))
      );
    } else if (type == "VIMEO") {
      setVimeoStoredVideos((prev) => prev.filter((el) => el.id !== id));
      let stored = JSON.parse(localStorage.getItem("vimeoVideos"));
      localStorage.setItem(
        "vimeoVideos",
        JSON.stringify(stored.filter((el) => el.id !== id))
      );
    }
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

  let displayData = <p>Loading...</p>;

  // if and else if  breaks DRY principles but it's more readable this way
  if (res && type === "YOUTUBE") {
    const items = res.data.items[0];
    displayData = (
      <div>
        <Image
          cursor="pointer"
          src={items.snippet.thumbnails.high.url}
          onClick={showVideoHandler}
        />
        <Box padding={2}>
          <Heading size="sm" noOfLines={2}>
            {items.snippet.title}
          </Heading>
          <p>{`Views: ${items.statistics.viewCount}`}</p>
          <p>{`Likes: ${items.statistics.likeCount}`}</p>
          <p>{`Added at : ${addedAt}`}</p>
        </Box>
      </div>
    );
  } else if (res && type === "VIMEO") {
    const items = res.data;
    displayData = (
      <div>
        <Image src={items.pictures.sizes[3].link} onClick={showVideoHandler} />
        <Box p={2}>
          <Heading size="sm" noOfLines={2}>
            {items.name}
          </Heading>
          <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
          <p>{`Added at : ${addedAt}`}</p>
        </Box>
      </div>
    );
  }

  let cardDisplay = (
    <Flex color="light" direction="column" justify="space-between">
      {displayData}
      <Flex align="center" justify="space-around" fontSize={24}>
        <Icon
          cursor="pointer"
          as={AiFillEye}
          data-test-name="watch"
          onClick={showVideoHandler}
        />{" "}
        <Icon
          cursor="pointer"
          as={FaTrashAlt}
          data-test-name="delete"
          onClick={deleteHandler}
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
        )}{" "}
      </Flex>
    </Flex>
  );

  let listDisplay = (
    <div>
      {displayData}
      <Flex
        direction={listView ? "column" : "row"}
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
          onClick={deleteHandler}
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
    </div>
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
