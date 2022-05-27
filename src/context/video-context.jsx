import React from 'react';
import {createContext,useState} from 'react'
const VideoContext = createContext();

export function VideoProvider({children}){
    const [hasVisitedSite,SetHasVisitedSite] = useState()
    const demoYt = [{type:'YOUTUBE',id:'IHLLYeFc5sg',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'NIq3qLaHCIs',addedAt:'25th May 2022',isFav:true},{type:'YOUTUBE',id:'TE66McLMMEw',addedAt:'25th May 2022',isFav:false}];
    const demoVimeo = [{type:'VIMEO',id:'710119524',addedAt:'25th May 2022',isFav:true},{type:'VIMEO',id:'705396134',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'450080363',addedAt:'25th May 2022',isFav:false}];
    const [ytStoredVideos,setYtStoredVideos] = useState(JSON.parse(localStorage.getItem("ytVideos")) || demoYt)
    const [vimeoStoredVideos,setVimeoStoredVideos] = useState(JSON.parse(localStorage.getItem("vimeoVideos")) || demoVimeo)
    //[JSON.parse(localStorage.getItem("ytVideos"))]
    const [listView,setListView] = useState(false)
    const clearYtStoredVideos = () => {
        setYtStoredVideos([])
        localStorage.setItem('ytVideos', JSON.stringify([]))
    }

    const clearVimeoStoredVideos = () => {
        setVimeoStoredVideos([])
        localStorage.setItem('vimeoVideos', JSON.stringify([]))
    }

    const toggleDisplayMode = () => {
        setListView(prev => !prev)
        console.log(listView)
    }
    
    return (
        <VideoContext.Provider
         value={{
           ytStoredVideos,setYtStoredVideos,vimeoStoredVideos,setVimeoStoredVideos,clearYtStoredVideos,clearVimeoStoredVideos,listView,setListView,toggleDisplayMode
             }}>
                 
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext;