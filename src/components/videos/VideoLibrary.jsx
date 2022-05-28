import React,{useContext} from 'react'
import {Button} from 'reactstrap'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {CgMenuGridR} from 'react-icons/cg'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
import styles from './VideoLibrary.module.css'
const VideoLibrary = () => { 
  const {toggleListDisplay,toggleTileDisplay,listView} = useContext(VideoContext)
  return (
    <div className={styles.container}>
      <div className={styles.display}>
       <h4>Display mode :</h4>
       <Button color={!listView ? "primary" : "secondary"} onClick={toggleTileDisplay}><CgMenuGridR/></Button>
       <Button color={listView ? "primary" : "secondary"} onClick={toggleListDisplay}> <AiOutlineUnorderedList/></Button>
       </div>
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