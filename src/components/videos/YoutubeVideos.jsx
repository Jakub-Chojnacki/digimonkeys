import React,{useState,useContext} from 'react'
import VideoContext from '../../context/video-context'
import SingleVideo from './SingleVideo'
import styles from './YoutubeVideos.module.css'
import {Button} from 'reactstrap'
const YoutubeVideos = () => {
    const {ytStoredVideos,setYtStoredVideos} = useContext(VideoContext)
    const [isReversed,setIsReversed] = useState(false)
    

    const handleReverse = () => {
        setIsReversed(prev => !prev)
        ytStoredVideos.reverse()
    }

    return (
        <div className={styles.container}>
            <div><Button onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Go to original order'}</Button></div>
        
        {ytStoredVideos.map((video)=> {
          return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
         })}
           </div>
        )

        
      
      
}

export default YoutubeVideos