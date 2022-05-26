import React,{useState,useContext} from 'react'
import {Button } from 'reactstrap'
import SingleVideo from './SingleVideo'
import VideoContext from '../../context/video-context'
import styles from './Videos.module.css'
const VimeoVideos = () => {
 const {vimeoStoredVideos,setVimeoStoredVideos,clearVimeoStoredVideos} = useContext(VideoContext)
 const [isReversed,setIsReversed] = useState(false)
 const [showOnlyFav,setShowOnlyFav] = useState(false)   

    const handleReverse = () => {
        setIsReversed(prev => !prev)
        vimeoStoredVideos.reverse()
    }

    
    let favouriteVideos = vimeoStoredVideos.filter(video => video.isFav == true);
    

 return (
   <div className={styles.container}>
      <div className="buttons-container">
            <Button onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Go to original order'}</Button>
            {!showOnlyFav && <Button onClick={()=> {setShowOnlyFav(true)}}>Show Favourite Videos</Button>}
            {showOnlyFav &&<Button onClick={()=> {setShowOnlyFav(false)}}>Show All</Button>}
            <Button onClick={clearVimeoStoredVideos}>Clear All</Button>
      </div>

      <div className={styles.videos}>
          {!showOnlyFav && vimeoStoredVideos.map((video)=> {
            return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
          })}

          {showOnlyFav && favouriteVideos.map((video)=> {
            return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
          })} 
       </div>
   </div>
  )
}



export default VimeoVideos