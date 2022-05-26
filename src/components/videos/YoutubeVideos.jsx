import React,{useState,useContext} from 'react'
import VideoContext from '../../context/video-context'
import SingleVideo from './SingleVideo'
import styles from './VimeoVideos.module.css'
import {Button} from 'reactstrap'
const YoutubeVideos = () => {
    const {ytStoredVideos,setYtStoredVideos} = useContext(VideoContext)
    const [isReversed,setIsReversed] = useState(false)
    const [showOnlyFav,setShowOnlyFav] = useState(false)   

    const handleReverse = () => {
        setIsReversed(prev => !prev)
        ytStoredVideos.reverse()
    }

    let favouriteVideos = ytStoredVideos.filter(video => video.isFav == true);
    
    return (
        <div>
        <div><Button onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Go to original order'}</Button></div>
       {!showOnlyFav && <div><Button onClick={()=> {setShowOnlyFav(true)}}>Show Favourite Videos</Button></div>}
       {showOnlyFav &&<div><Button onClick={()=> {setShowOnlyFav(false)}}>Show All</Button></div>}
        <div className={styles.container}>
    {!showOnlyFav && ytStoredVideos.map((video)=> {
      return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
     })}
  
     {showOnlyFav && favouriteVideos.map((video)=> {
      return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
     })} 
     </div>
     </div>
        )

        
      
      
}

export default YoutubeVideos