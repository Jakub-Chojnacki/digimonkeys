import React,{useState,useContext} from 'react'
import {Button } from 'reactstrap'
import SingleVideo from './SingleVideo'
import VideoContext from '../../context/video-context'
import styles from './Videos.module.css'
const Videos = ({type}) => {
    const {vimeoStoredVideos,ytStoredVideos,setVimeoStoredVideos,setYtStoredVideos,clearVimeoStoredVideos,clearYtStoredVideos,listView} = useContext(VideoContext)
    const [isReversed,setIsReversed] = useState(false)
    const [showOnlyFav,setShowOnlyFav] = useState(false)   
    let favouriteVideos;
    let displayVideo;

    if(type == 'YOUTUBE'){
        
         favouriteVideos = ytStoredVideos.filter(video => video.isFav == true);
          displayVideo =   ytStoredVideos.map((video)=> {
            return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
            })

            
        
    }else if(type=='VIMEO'){
       
         favouriteVideos = vimeoStoredVideos.filter(video => video.isFav == true);
         displayVideo = vimeoStoredVideos.map((video)=> {
            return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
          })
         

        
    }

    const handleReverse = () => {
        setIsReversed(prev => !prev)

        if(type =='YOUTUBE'){
            ytStoredVideos.reverse()
        }else if(type ==='VIMEO'){
            vimeoStoredVideos.reverse()
        }
       
      
    }
  
  return (
    <div className={`${styles.container} `} >
    <div className="buttons-container">
          <Button onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Go to original order'}</Button>
          {!showOnlyFav && <Button onClick={()=> {setShowOnlyFav(true)}}>Show Favourite Videos</Button>}
          {showOnlyFav &&<Button onClick={()=> {setShowOnlyFav(false)}}>Show All</Button>}
          <Button onClick={clearVimeoStoredVideos}>Clear All</Button>
         
    </div>

    <div className={`${styles.videos} ${listView ? styles.list : ''} `}>
        {!showOnlyFav && displayVideo}

        {showOnlyFav && favouriteVideos.map((video)=> {
          return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
        })} 
     </div>
 </div>
  )
}

export default Videos