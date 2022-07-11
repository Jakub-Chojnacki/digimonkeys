import React, { useState, useContext } from "react";
import { Input, Button, Flex, Container, useToast } from "@chakra-ui/react";
import VideoContext from "../../context/video-context";
import { format } from "date-fns";

const AddVideo = () => {
  const toast = useToast();
  const [newVideoId, setNewVideoId] = useState("");
  const [error, setError] = useState("");
  const { storedVideos, setStoredVideos } = useContext(VideoContext);

  const addVideoOnEnter = (e) => {
    if (e.key === "Enter") {
      AddNewVideo();
    }
  };

  function matchYoutubeUrl(url) {
    let ytRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    let matches = url.match(ytRegex);
    if (matches) {
      return matches[6];
    }
    return false;
  }

  function matchVimeoUrl(url) {
    let vimeoRegex =
      /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
    let matches = url.match(vimeoRegex);
    if (matches) {
      return matches[1];
    }
    return false;
  }

  const AddNewVideo = () => {
    let validationYt = matchYoutubeUrl(newVideoId);
    let validationVimeo = matchVimeoUrl(newVideoId);
    let videoAlreadyInLibrary =
      storedVideos &&
      storedVideos.find((vid) => vid.id === validationYt || validationVimeo) &&
      newVideoId.length;

    let linkIsValid = validationYt || validationVimeo;

    if (linkIsValid && !videoAlreadyInLibrary) {
      let newVideoData = {
        isYt: Boolean(validationYt),
        isVimeo: Boolean(validationVimeo),
        id: validationYt ? validationYt : validationVimeo,
        addedAt: format(Date.now(), "do MMM y"),
        isFav: false,
      };

      let localStorageVideos = JSON.parse(localStorage.getItem("storedVideos"));

      if (localStorageVideos != null) {
        const newStoredVideo = JSON.stringify([
          ...localStorageVideos,
          newVideoData,
        ]);
        localStorage.setItem("storedVideos", newStoredVideo);
      } else {
        localStorage.setItem("storedVideos", JSON.stringify([newVideoData]));
      }

      setStoredVideos((prev) => [...prev, newVideoData]);
      setNewVideoId("");
      toast({
        description: "A video was added successfully",
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setError("");
      return;
    }

    if (!validationYt && !validationVimeo) {
      setError("It is not a valid link.");
    }

    if (videoAlreadyInLibrary) {
      setError("This video is already stored in the library.");
    }
    toast({
      description: `There was an error`,
      position: "top",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Container p={2} gap={2}>
      <Flex gap={2}>
        <Input
          value={newVideoId}
          onChange={(e) => setNewVideoId(e.target.value)}
          placeholder="Input a video link/id"
          onKeyPress={addVideoOnEnter}
        />
        <Button type="submit" colorScheme="green" onClick={AddNewVideo}>
          Submit
        </Button>
      </Flex>
      {error && <p className="error">{error}</p>}
    </Container>
  );
};

export default AddVideo;
