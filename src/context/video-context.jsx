import React from 'react';
import { createContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
const VideoContext = createContext();
export function VideoProvider({ children }) {
  const toast = useToast();
  const showToast = (msg, status, duration, position) => {
    toast({
      description: `${msg}`,
      status: `${status}`,
      duration: `${duration}`,
      isClosable: true,
      position: `${position}`,
    });
  };
  const [hasVisitedSite, setHasVisitedSite] = useState(false);
  const [showOnlyFav, setShowOnlyFav] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoOrderReversed, setIsVideoOrderReversed] = useState(false);
  const [storedVideos, setStoredVideos] = useState(
    JSON.parse(localStorage.getItem('storedVideos')) || []
  );
  const [videosPerPage, setVideosPerPage] = useState(12);
  const [listView, setListView] = useState(false);
  const demoVideos = [
    {
      isYt: true,
      isVimeo: false,
      id: 'NVbH1BVXywY',
      addedAt: '8th Jul 2022',
      isFav: false,
    },
    {
      isYt: true,
      isVimeo: false,
      id: 'NIq3qLaHCIs',
      addedAt: '25th May 2022',
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: 'TE66McLMMEw',
      addedAt: '25th May 2022',
      isFav: false,
    },
    {
      isYt: true,
      isVimeo: false,
      id: 'Mus_vwhTCq0',
      addedAt: '27th May 2022',
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: 'KCrXgy8qtjM',
      addedAt: '28th May 2022',
      isFav: true,
    },
    {
      isYt: true,
      isVimeo: false,
      id: '3znAl0QH1eE',
      addedAt: '28th May 2022',
      isFav: true,
    },
    {
      isYt: false,
      isVimeo: true,
      id: '710119524',
      addedAt: '25th May 2022',
      isFav: true,
    },
    {
      isYt: false,
      isVimeo: true,
      id: '705396134',
      addedAt: '25th May 2022',
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: '712760573',
      addedAt: '25th May 2022',
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: '181696349',
      addedAt: '25th May 2022',
      isFav: false,
    },
    {
      isYt: false,
      isVimeo: true,
      id: '267520931',
      addedAt: '27th May 2022',
      isFav: false,
    },
  ];

  const clearStoredVideos = () => {
    setStoredVideos([]);
    localStorage.setItem('storedVideos', JSON.stringify([]));
    showToast('Deleted all videos', 'success', 4000, 'top');
    setCurrentPage(1);
  };

  const toggleListDisplay = () => {
    setListView(true);
  };

  const toggleTileDisplay = () => {
    setListView(false);
  };

  const loadDemo = () => {
    setStoredVideos(demoVideos);
    localStorage.setItem('storedVideos', JSON.stringify(demoVideos));
    showToast('Loaded demo videos', 'success', 4000, 'top');
  };

  const deleteVideoHandler = (id) => {
    setStoredVideos((prev) => prev.filter((el) => el.id !== id));
    let stored = JSON.parse(localStorage.getItem('storedVideos'));
    localStorage.setItem(
      'storedVideos',
      JSON.stringify(stored.filter((el) => el.id !== id))
    );
  };

  const toggleFavHandler = (id, isFav) => {
    if (!isFav) {
      showToast(`Video was added to favourite`, 'info', 1100, 'top left');
    }
    if (isFav) {
      showToast(`Video was removed from favourite`, 'info', 1100, 'top left');
    }

    setStoredVideos(
      storedVideos.map((item) => {
        if (item.id === id) {
          let stored = JSON.parse(localStorage.getItem('storedVideos'));
          stored.map((item) => {
            if (item.id == id) {
              item.isFav = !item.isFav;
              const newStorage = JSON.stringify(stored, {
                ...item,
                isFav: !isFav,
              });
              localStorage.setItem('storedVideos', newStorage);
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

  function validateYoutubeUrl(url) {
    let ytRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    let matchesYoutube = url.match(ytRegex);
    let matchesYoutubeId = url.match(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
    );
    if (matchesYoutube) {
      return matchesYoutube[6];
    }
    if (!matchesYoutube && matchesYoutubeId) {
      return matchesYoutubeId[0];
    }
    return false;
  }

  function validateVimeoUrl(url) {
    let vimeoRegex =
      /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
    let matchesVimeo = url.match(vimeoRegex);
    let matchesNumbers = url.match(/^\d*$/);
    if (matchesVimeo) {
      return matchesVimeo[1];
    }
    if (!matchesVimeo && matchesNumbers) {
      return matchesNumbers.input;
    }
    return false;
  }

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
        validateYoutubeUrl,
        validateVimeoUrl,
        currentPage,
        setCurrentPage,
        isVideoOrderReversed,
        setIsVideoOrderReversed,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export default VideoContext;
