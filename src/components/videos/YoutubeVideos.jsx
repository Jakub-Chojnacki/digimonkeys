import React,{useState,useContext} from 'react'
import VideoContext from '../../context/video-context'
import SingleVideo from './SingleVideo'
import styles from './YoutubeVideos.module.css'
const YoutubeVideos = () => {
    const {ytStoredVideos} = useContext(VideoContext)


    return (
        <div className={styles.container}>
        {ytStoredVideos.map((video)=> {
          return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
         })}
           </div>
        )
      
      
}

export default YoutubeVideos