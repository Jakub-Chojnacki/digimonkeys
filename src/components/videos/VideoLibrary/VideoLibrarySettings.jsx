import React, { useContext, useState } from "react";
import {
  Button,
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

import VideoContext from "../../../context/video-context";

const VideoLibrarySettings = () => {

  const {
    toggleListDisplay,
    toggleTileDisplay,
    listView,
    videosPerPage,
    setVideosPerPage,
    loadDemo
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
    <Flex marginY={6} gap={2} direction="row">
      <Flex>
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
      <Flex align="start" direction="column">
        <Popover isOpen={showPopover} onBlur={() => setShowPopover(false)}>
          <PopoverTrigger>
            <Button
              colorScheme="blue"
              onClick={() => setShowPopover(true)}
              fontSize={["11", "12", "16"]}
            >
              Load Demo Videos
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>
              <Text fontSize={14}>
                Are you sure you want to load demo videos?
              </Text>
              <Text fontSize={12} color="red.400">
                IT WILL OVERWRITE YOUR VIDEOS!!!
              </Text>
              <Flex marginTop={4} align="center">
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
      </Flex>
    </Flex>
  );
};

export default VideoLibrarySettings;
