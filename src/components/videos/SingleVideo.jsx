import React, { useContext,useState} from "react";
import useFetchVideo from "../../hooks/useFetchVideo";
import VideoContext from "../../context/video-context";
import VideoActionIcons from "../UI/VideoActionIcons";
import {
  Flex,
  Box,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  AspectRatio 
} from "@chakra-ui/react";
import ModalPlayer from "./ModalPlayer";
const SingleVideo = ({ id, addedAt, isFav, isVimeo, isYt }) => {
  const { res } = useFetchVideo(id, isYt, isVimeo);
  const { listView, showOnlyFav,  } =
    useContext(VideoContext);
    const [showModal, setShowModal] = useState(false);

  const getVideoDataTemplate = (url, title, views, likes, addedAt) => {
    return (
      <Flex direction={listView ? "row" : "column"}  height="100%">
        <AspectRatio ratio={!listView ? 4/3 : 16/9} minW="50%">
        <Image
          cursor="pointer"
          src={url}
          onClick={() => setShowModal(true)}
        />
        </AspectRatio>
       
        <Flex direction="column" justify="space-between"  width="100%" height="100%" align="center">
          <Box padding={2} fontSize={["12", "12", "14"]}>
            <Heading size="sm" noOfLines={2} fontSize={["16", "16", "18"]}>
              {title}
            </Heading>
            {views && <Text>{`Views: ${views}`}</Text>}
            <Text>{`Likes: ${likes}`}</Text>
            <Text>{`Added at : ${addedAt}`}</Text>
          </Box>
          <VideoActionIcons isFav={isFav} id={id} openVideoModal={()=> setShowModal(true)}/>
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
