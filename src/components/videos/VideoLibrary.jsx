import React,{useContext} from 'react'
import {Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
import styles from './VideoLibrary.module.css'
const VideoLibrary = () => { 
  const {toggleDisplayMode,listView} = useContext(VideoContext)
  return (
    <div className={styles.container}>
       {!listView && <Button color="primary" onClick={toggleDisplayMode}>Change display to list</Button>}
       {listView && <Button color="primary" onClick={toggleDisplayMode}>Change display to normal</Button>}

       <div className={styles.library}>
         <h2>Your Youtube Library</h2> 
          <Videos type='YOUTUBE'/>
       </div>
    
        <div className={styles.library}>
        <h2>Your Vimeo Library</h2>
        <Videos type='VIMEO'/>
        </div>
     
       </div>
     
  )
}

export default VideoLibrary