import {useEffect,useState} from 'react'
import axios from 'axios'
const useFetchVideo =  (type,identifier) => {
    const [data,setData] = useState()
    const [isPending,setIsPending] = useState(true)
    const [error,setError] = useState()
    useEffect(()=> {
        const getVideoData = async (TYPE,ID) => {
            let yourHeaders;
            let url;
            if(TYPE=='YOUTUBE'){
              url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ID}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
              yourHeaders = null;
            }else if(TYPE == 'VIMEO'){
              url =`https://api.vimeo.com/videos/${ID}`
              yourHeaders =  {Authorization: `Bearer ${import.meta.env.VITE_VIMEO_API_TOKEN}`}
            }
            const response = await axios.get(url, {headers: yourHeaders});
            setData(response)
            setIsPending(false) 
          }

          getVideoData(type,identifier)

          
    },[])

    return {data,isPending,error}
}

export default useFetchVideo;