import React, { useState, useContext } from "react";
import { Input, Button, Flex, Container, useToast } from "@chakra-ui/react";
import VideoContext from "../../context/video-context";
import { format } from "date-fns";

const AddVideo = () => {
  const toast = useToast();
  const [newVideoId, setNewVideoId] = useState("");
  const [error, setError] = useState("");
  const { storedVideos, setStoredVideos, validateYoutubeUrl, validateVimeoUrl } =
    useContext(VideoContext);

  const addVideoOnEnter = (e) => {
    if (e.key === "Enter") {
      AddNewVideo();
    }
  };

  const AddNewVideo = () => {
    let validationYt = validateYoutubeUrl(newVideoId);
    let validationVimeo = validateVimeoUrl(newVideoId);
    let videoAlreadyInLibrary =
      storedVideos &&
      storedVideos.find((vid) => vid.id === validationYt || vid.id === validationVimeo)  &&
      newVideoId.length;

    let linkIsValid = Boolean(validationYt) || Boolean(validationVimeo);

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
      description: `There was an error while adding the video`,
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
