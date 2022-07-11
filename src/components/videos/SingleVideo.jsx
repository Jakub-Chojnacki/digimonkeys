import React, { useContext, useState } from "react";
import useFetchVideo from "../../hooks/useFetchVideo";
import { AiOutlineStar, AiFillStar, AiFillEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import VideoContext from "../../context/video-context";
import {
  Flex,
  Box,
  Heading,
  Image,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import ModalPlayer from "./ModalPlayer";
const SingleVideo = ({ id, addedAt, isFav, isVimeo, isYt }) => {
  const { res } = useFetchVideo(id, isYt, isVimeo);
  const { listView, deleteVideoHandler, toggleFavHandler, showOnlyFav } =
    useContext(VideoContext);
  const [showModal, setShowModal] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const showVideoModalHandler = () => {
    setShowModal(true);
  };

  const icons = (
    <Flex align="center" justify="space-around" fontSize={24}>
      <Icon
        as={AiFillEye}
        cursor="pointer"
        data-test-name="watch"
        onClick={showVideoModalHandler}
      />{" "}
      <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
        <PopoverTrigger>
          <Button onClick={() => setShowPopover(true)}>
            <Icon as={FaTrashAlt} cursor="pointer" data-test-name="delete" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            <Text fontSize={16}>
              Are you sure you want to delete this video?
            </Text>
            <Flex marginTop={4} align="center" justify="space-around">
              <Button
                colorScheme="green"
                onClick={() => deleteVideoHandler(id)}
              >
                Yes
              </Button>
              <Button colorScheme="red" onClick={() => setShowPopover(false)}>
                No
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {isFav ? (
        <Icon
          as={AiFillStar}
          cursor="pointer"
          data-test-name="fav"
          onClick={() => toggleFavHandler(id, isFav)}
        />
      ) : (
        <Icon
          as={AiOutlineStar}
          cursor="pointer"
          data-test-name="notFav"
          onClick={() => toggleFavHandler(id, isFav)}
        />
      )}
    </Flex>
  );

  const getVideoDataTemplate = (url, title, views, likes, addedAt) => {
    return (
      <Flex direction={listView ? "row" : "column"}>
        <Image
          cursor="pointer"
          src={url}
          onClick={showVideoModalHandler}
          maxW={listView && ["50%", "50%", "50%", "100%"]}
        />
        <Flex direction="column" justify="space-between" width="100%">
          <Box padding={2} fontSize={["12", "12", "14"]}>
            <Heading size="sm" noOfLines={2} fontSize={["16", "16", "18"]}>
              {title}
            </Heading>
            {views && <Text>{`Views: ${views}`}</Text>}
            <Text>{`Likes: ${likes}`}</Text>
            <Text>{`Added at : ${addedAt}`}</Text>
          </Box>
          {icons}
        </Flex>
      </Flex>
    );
  };

  let displayVideoData = (
    <Stack width={["250px", "400px", "200px"]}>
      <Skeleton height="140px" />
      <Skeleton height="30px" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
      <Flex justify="space-between" align="center">
        <SkeletonCircle />
        <SkeletonCircle />
        <SkeletonCircle />
      </Flex>
    </Stack>
  );

  if (res && isYt) {
    const {
      snippet: {
        title,
        thumbnails: {
          high: { url },
        },
      },
      statistics: { viewCount: views, likeCount: likes },
    } = res.items[0];
    displayVideoData = getVideoDataTemplate(url, title, views, likes, addedAt);
  } else if (res && isVimeo) {
    const {
      name: title,
      metadata: {
        connections: {
          likes: { total: likes },
        },
      },
      pictures: { sizes },
    } = res;
    displayVideoData = getVideoDataTemplate(
      sizes[3].link,
      title,
      null,
      likes,
      addedAt
    );
  }

  let showVideo = true;

  if (!isFav && showOnlyFav) {
    showVideo = false;
  }

  return (
    <Flex
      justify="space-between"
      marginBottom={4}
      width="100%"
      display={showVideo ? "flex" : "none"}
    >
      <Flex
        background="gray.100"
        p={4}
        borderRadius="8px"
        direction="column"
        justify="space-between"
        gap={2}
        width="100%"
      >
        {displayVideoData}
      </Flex>

      {showModal && (
        <ModalPlayer
          isYt={isYt}
          isVimeo={isVimeo}
          id={id}
          hideModal={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </Flex>
  );
};

export default SingleVideo;
