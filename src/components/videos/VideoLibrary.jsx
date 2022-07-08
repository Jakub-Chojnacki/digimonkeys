import React, { useContext } from "react";
import {
  Select,
  Button,
  Container,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import VideoContext from "../../context/video-context";
import Videos from "./Videos";
const VideoLibrary = () => {
  const {
    toggleListDisplay,
    toggleTileDisplay,
    listView,
    videosPerPage,
    setVideosPerPage,
    loadDemo,
  } = useContext(VideoContext);

  const handleChangeVidsPerPage = (e) => {
    setVideosPerPage(e.target.value);
  };
  return (
    <Container maxW="1200px" marginY={6}>
      <Heading as={"h2"} size="xl">
        Settings:
      </Heading>
      <Flex marginY={6} gap={4} direction="column">
        <Flex gap={4}>
          <Heading as={"h4"} size="md">
            Display mode :
          </Heading>
          <Button
            colorScheme={!listView ? "blue" : "gray"}
            onClick={toggleTileDisplay}
          >
            <CgMenuGridR />
          </Button>
          <Button
            colorScheme={listView ? "blue" : "gray"}
            onClick={toggleListDisplay}
          >
            <AiOutlineUnorderedList />
          </Button>
        </Flex>
        <Flex align="center" gap={4}>
          <Button
            colorScheme="red"
            onClick={loadDemo}
            fontSize={{ sm: "11", md: "16" }}
          >
            Load Demo Videos
          </Button>
          <Text color="red">
            Note: This will overwrite your existing library!!!
          </Text>
        </Flex>

        <Flex gap={4} align="center">
          <Select size="md" onClick={handleChangeVidsPerPage} maxW="80px">
            <option value="12">12</option>
            <option value="8">8</option>
            <option value="4">4</option>
          </Select>
          <Text>Videos per page: {videosPerPage}</Text>
        </Flex>
      </Flex>
      <div>
        <Heading as="h3" size="lg">
          Your Video Library
        </Heading>
        <Videos/>
      </div>
    </Container>
  );
};

export default VideoLibrary;
