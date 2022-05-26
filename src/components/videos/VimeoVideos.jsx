import React,{useState,useContext} from 'react'
import {Button } from 'reactstrap'
import SingleVideo from './SingleVideo'
import VideoContext from '../../context/video-context'
import styles from './VimeoVideos.module.css'
const VimeoVideos = () => {
 const {vimeoStoredVideos} = useContext(VideoContext)
 const [isReversed,setIsReversed] = useState(false)
    

    const handleReverse = () => {
        setIsReversed(prev => !prev)
        vimeoStoredVideos.reverse()
    }


 return (
   <div className={styles.container}>
      <div><Button onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Go to original order'}</Button></div>
  {vimeoStoredVideos.map((video)=> {
    return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
   })}
   </div>
  )
}



export default VimeoVideos