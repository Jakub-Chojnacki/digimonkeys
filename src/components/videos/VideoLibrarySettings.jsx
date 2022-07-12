import React, { useContext, useState } from "react";
import {
  Select,
  Button,
  Heading,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import VideoContext from "../../context/video-context";
const VideoLibrarySettings = () => {
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
  const [showPopover, setShowPopover] = useState(false);
  const handleSubmitConfirmation = () => {
    loadDemo();
    setShowPopover(false);
  };
  return (
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

        <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
          <PopoverTrigger>
          <Button
          colorScheme="red"
          onClick={()=>setShowPopover(true)}
          fontSize={{ sm: "11", md: "16" }}
        >
          Load Demo Videos
        </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              <Text fontSize={16}>Are you sure you want to load demo videos?</Text>
              <Text fontSize={12} color="red.400">IT WILL OVERWRITE YOUR VIDEOS!!!</Text>
              <Flex marginTop={4} align="center" justify="space-around">
                <Button colorScheme="green" onClick={handleSubmitConfirmation}>
                  Yes
                </Button>
                <Button colorScheme="red" onClick={() => setShowPopover(false)}>
                  No
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
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
  );
};

export default VideoLibrarySettings;
