import React,{useState} from 'react'
import SingleVideo from './SingleVideo'
import styles from './VimeoVideos.module.css'
const VimeoVideos = () => {
 const [videos,setVideos] = useState([{type:'VIMEO',id:'710119524',addedAt:'25th May 2022'},{type:'VIMEO',id:'705396134',addedAt:'25th May 2022'},{type:'VIMEO',id:'450080363',addedAt:'25th May 2022'}])
  

 return (
   <div className={styles.container}>
  {videos.map((video)=> {
    return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt}/>
   })}
   </div>
  )
}



export default VimeoVideos