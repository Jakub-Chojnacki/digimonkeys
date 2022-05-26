import React,{useState,useContext} from 'react'
import SingleVideo from './SingleVideo'
import VideoContext from '../../context/video-context'
import styles from './VimeoVideos.module.css'
const VimeoVideos = () => {
 const {vimeoStoredVideos} = useContext(VideoContext)
 console.log(vimeoStoredVideos)

 return (
   <div className={styles.container}>
  {vimeoStoredVideos.map((video)=> {
    return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
   })}
   </div>
  )
}



export default VimeoVideos