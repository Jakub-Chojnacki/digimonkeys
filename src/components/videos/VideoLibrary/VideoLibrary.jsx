import React, { useContext } from "react";
import VideoLibrarySettings from "./VideoLibrarySettings";
import VideoLibraryActionButtons from "./VideoLibraryActionButtons";
import { Container, Heading, Flex, Icon } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import VideoContext from "../../../context/video-context";
import Videos from "../Videos";
const VideoLibrary = () => {
  const { showOnlyFav } = useContext(VideoContext);
  return (
    <Container maxW="1200px" marginY={6}>
      <Heading as={"h2"} size="xl">
        Settings:
      </Heading>
      <VideoLibrarySettings />
      <div>
        {!showOnlyFav && (
          <Heading as="h3" size="lg">
            Your Video Library
          </Heading>
        )}
        {showOnlyFav && (
          <Flex align="center" gap={2}>
            <Icon as={AiFillStar} color="#FF9529" fontSize={32} />
            <Heading as="h3" size="lg">
              Your Favourite Videos
            </Heading>
          </Flex>
        )}
        <Flex align="center" justify="center" gap={4} marginY={4}>
          <VideoLibraryActionButtons />
        </Flex>

        <Videos />
      </div>
    </Container>
  );
};

export default VideoLibrary;
