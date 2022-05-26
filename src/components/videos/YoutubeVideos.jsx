import React,{useState} from 'react'
import SingleVideo from './SingleVideo'
import styles from './YoutubeVideos.module.css'
const YoutubeVideos = () => {
    const [videos,setVideos] = useState([{type:'YOUTUBE',id:'IHLLYeFc5sg',addedAt:'25th May 2022'},{type:'YOUTUBE',id:'NIq3qLaHCIs',addedAt:'25th May 2022'},{type:'YOUTUBE',id:'TE66McLMMEw',addedAt:'25th May 2022'}])

    return (
        <div className={styles.container}>
        {videos.map((video)=> {
          return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
         })}
           </div>
        )
      
      
}

export default YoutubeVideos