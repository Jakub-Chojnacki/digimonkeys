import React from 'react';
import {createContext,useState} from 'react'
const VideoContext = createContext();

export function VideoProvider({children}){
    const [ytStoredVideos,setYtStoredVideos] = useState([{type:'YOUTUBE',id:'IHLLYeFc5sg',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'NIq3qLaHCIs',addedAt:'25th May 2022',isFav:true},{type:'YOUTUBE',id:'TE66McLMMEw',addedAt:'25th May 2022',isFav:false}])
    const [vimeoStoredVideos,setVimeoStoredVideos] = useState([{type:'VIMEO',id:'710119524',addedAt:'25th May 2022',isFav:true},{type:'VIMEO',id:'705396134',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'450080363',addedAt:'25th May 2022',isFav:false}])
 

    
    return (
        <VideoContext.Provider
         value={{
           ytStoredVideos,setYtStoredVideos,vimeoStoredVideos,setVimeoStoredVideos,
             }}>
                 
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext;