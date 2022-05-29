import React from 'react';
import {createContext,useState} from 'react'
const VideoContext = createContext();

export function VideoProvider({children}){
    const [hasVisitedSite,setHasVisitedSite] = useState(false)
    const demoYt = [{type:'YOUTUBE',id:'IHLLYeFc5sg',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'NIq3qLaHCIs',addedAt:'25th May 2022',isFav:true},{type:'YOUTUBE',id:'TE66McLMMEw',addedAt:'25th May 2022',isFav:false},{type:'YOUTUBE',id:'Mus_vwhTCq0',addedAt:'27th May 2022',isFav:true},{type:'YOUTUBE',id:'KCrXgy8qtjM',addedAt:'28th May 2022',isFav:true},{type:'YOUTUBE',id:'3znAl0QH1eE',addedAt:'28th May 2022',isFav:true}];
    const demoVimeo = [{type:'VIMEO',id:'710119524',addedAt:'25th May 2022',isFav:true},{type:'VIMEO',id:'705396134',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'712760573',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'181696349',addedAt:'25th May 2022',isFav:false},{type:'VIMEO',id:'267520931',addedAt:'27th May 2022',isFav:false}];
    const [ytStoredVideos,setYtStoredVideos] = useState(JSON.parse(localStorage.getItem("ytVideos")) || [])
    const [vimeoStoredVideos,setVimeoStoredVideos] = useState(JSON.parse(localStorage.getItem("vimeoVideos")) || [])
    const [videosPerPage,setVideosPerPage] = useState(12)
    const [listView,setListView] = useState(false)
    
    const clearYtStoredVideos = () => {
        setYtStoredVideos([])
        localStorage.setItem('ytVideos', JSON.stringify([]))
    }

    const clearVimeoStoredVideos = () => {
        setVimeoStoredVideos([])
        localStorage.setItem('vimeoVideos', JSON.stringify([]))
    }

    const toggleListDisplay = () => {
        setListView(true)
    }

    const toggleTileDisplay = () => {
        setListView(false)
    }

    const loadDemo = () => {
        setVimeoStoredVideos(demoVimeo)
        setYtStoredVideos(demoYt)
        localStorage.setItem('ytVideos', JSON.stringify(demoYt))
        localStorage.setItem('vimeoVideos', JSON.stringify(demoVimeo))
    }
    
    return (
        <VideoContext.Provider
         value={{
           ytStoredVideos,
           setYtStoredVideos,
           vimeoStoredVideos,
           setVimeoStoredVideos,
           clearYtStoredVideos,
           clearVimeoStoredVideos,
           listView,
           setListView,
           toggleListDisplay,
           toggleTileDisplay,
           hasVisitedSite,
           setHasVisitedSite,
           videosPerPage,
           setVideosPerPage,
           loadDemo
             }}>
                 
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext;