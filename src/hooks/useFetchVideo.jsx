import { useEffect, useState } from "react";
import axios from "axios";
const useFetchVideo = (type, identifier,isYt,isVimeo) => {
  const [res, setRes] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const getVideoData = async (TYPE, ID) => {
      let yourHeaders;
      let url;
      if (TYPE == "YOUTUBE" || isYt) {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ID}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`;
        yourHeaders = null;
      } else if (TYPE == "VIMEO" || isVimeo) {
        url = `https://api.vimeo.com/videos/${ID}`;
        yourHeaders = {
          Authorization: `Bearer ${import.meta.env.VITE_VIMEO_API_TOKEN}`,
        };
      }
      try {
        const response = await axios.get(url, { headers: yourHeaders });
        setRes(response.data);
        setIsPending(false);
      } catch (err) {
        setError(err);
      }
    };

    getVideoData(type, identifier);
  }, []); // no dependencies because we want to fetch only once

  return { res, isPending, error };
};

export default useFetchVideo;
