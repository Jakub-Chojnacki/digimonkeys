import React from "react";
import { createContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
const VideoContext = createContext();
export function VideoProvider({ children }) {
  const toast = useToast();
  const showToast = (msg,status,position) => {
    toast({
      description:`${msg}`,
      status: `${status}`,
      duration: 4000,
      isClosable: true,
      position: `${position}`
    })
  }
  const [hasVisitedSite, setHasVisitedSite] = useState(false);
  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const demoVideos = [
    {
      isYt: true,
      isVimeo: false,
      id: "NVbH1BVXywY",
      addedAt: "8th Jul 2022",
      isFav: false,
    },
    {
      isYt: true,
      isVimeo: false,
      id: "NIq3qLaHCIs",
      addedAt: "25th May 2022",
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: "TE66McLMMEw",
      addedAt: "25th May 2022",
      isFav: false,
    },
    {
      isYt: true,
      isVimeo: false,
      id: "Mus_vwhTCq0",
      addedAt: "27th May 2022",
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: "KCrXgy8qtjM",
      addedAt: "28th May 2022",
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: "3znAl0QH1eE",
      addedAt: "28th May 2022",
      isFav: true,
    },
    {
      isYt: false,
      isVimeo: true,
      id: "710119524",
      addedAt: "25th May 2022",
      isFav: true,
    },
    {
      isYt: false,
      isVimeo: true,
      id: "705396134",
      addedAt: "25th May 2022",
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: "712760573",
      addedAt: "25th May 2022",
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: "181696349",
      addedAt: "25th May 2022",
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: "267520931",
      addedAt: "27th May 2022",
      isFav: false,
    },
  ];

  const [storedVideos, setStoredVideos] = useState(
    JSON.parse(localStorage.getItem("storedVideos")) || []
  );
  const [videosPerPage, setVideosPerPage] = useState(12);
  const [listView, setListView] = useState(false);

  const clearStoredVideos = () => {
    setStoredVideos([]);
    localStorage.setItem("storedVideos", JSON.stringify([]));
    showToast("Deleted all videos","success","top")
  };

  const toggleListDisplay = () => {
    setListView(true);
    showToast("Changed display mode to List","info","top left")
  };

  const toggleTileDisplay = () => {
    setListView(false);
    showToast("Changed display mode to Tiles","info","top left")
  };

  const loadDemo = () => {
    setStoredVideos(demoVideos);
    localStorage.setItem("storedVideos", JSON.stringify(demoVideos));
    showToast("Loaded demo videos","success","top")
  };

  const deleteVideoHandler = (id) => {
    setStoredVideos((prev) => prev.filter((el) => el.id !== id));
    let stored = JSON.parse(localStorage.getItem("storedVideos"));
    localStorage.setItem(
      "storedVideos",
      JSON.stringify(stored.filter((el) => el.id !== id))
    );

  };

  const toggleFavHandler = (id, isFav) => {
    setStoredVideos(
      storedVideos.map((item) => {
        if (item.id === id) {
          let stored = JSON.parse(localStorage.getItem("storedVideos"));
          stored.map((item) => {
            if (item.id == id) {
              item.isFav = !item.isFav;
              const newStorage = JSON.stringify(stored, {
                ...item,
                isFav: !isFav,
              });
              localStorage.setItem("storedVideos", newStorage);
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
  };

  return (
    <VideoContext.Provider
      value={{
        clearStoredVideos,
        listView,
        setListView,
        toggleListDisplay,
        toggleTileDisplay,
        hasVisitedSite,
        setHasVisitedSite,
        videosPerPage,
        setVideosPerPage,
        loadDemo,
        deleteVideoHandler,
        toggleFavHandler,
        storedVideos,
        setStoredVideos,
        showOnlyFav,
        setShowOnlyFav,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export default VideoContext;
