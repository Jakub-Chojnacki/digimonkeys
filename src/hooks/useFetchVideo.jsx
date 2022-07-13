import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchVideo = (identifier, isYt, isVimeo) => {
  const [res, setRes] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getVideoData = async (isYt, isVimeo, ID) => {
      let yourHeaders;
      let url;
      if (isYt) {
        url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ID}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`;
        yourHeaders = null;
      } else if (isVimeo) {
        url = `https://api.vimeo.com/videos/${ID}`;
        yourHeaders = {
          Authorization: `Bearer ${import.meta.env.VITE_VIMEO_API_TOKEN}`,
        };
      }
      try {
        const response = await axios.get(url, { headers: yourHeaders });
        setRes(response.data);
      } catch (err) {
        setError(err);
      }
    };

    getVideoData(isYt, isVimeo, identifier);
  }, []); // no dependencies because we want to fetch only once

  return { res, error };
};

export default useFetchVideo;
