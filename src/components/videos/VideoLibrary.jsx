import React,{useContext,useState} from 'react'
import { Select,Button } from '@chakra-ui/react'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {CgMenuGridR} from 'react-icons/cg'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
import styles from './VideoLibrary.module.css'
const VideoLibrary = () => { 
  const {toggleListDisplay,toggleTileDisplay,listView,videosPerPage,setVideosPerPage,loadDemo} = useContext(VideoContext)

  const handleChangeVidsPerPage = (e) => {
    setVideosPerPage(e.target.value)
}
  return (
    <div className={styles.container}>
      <h2>Settings:</h2>
      <div className={styles.settings}>
          <div className={styles.flex}>
          <h4>Display mode :</h4>
          <Button colorScheme={!listView ? "blue" : "gray"} onClick={toggleTileDisplay}><CgMenuGridR/></Button>
          <Button colorScheme={listView ? "blue" : "gray"} onClick={toggleListDisplay}> <AiOutlineUnorderedList/></Button>
          </div>
          <div className={styles.flex}>
              <Button colorScheme="red" onClick={loadDemo}>Load Demo Videos</Button>
              <p className="warning">  Note: This will overwrite your existing library!!!</p>
          </div>
        
            <div className={styles.flex}>
              <Select size='md' onClick={handleChangeVidsPerPage}>
                <option value='12'>12</option>
                <option value='8'>8</option>
                <option value='4'>4</option>
             </Select>
              <p>Videos per page:  {videosPerPage}</p>
            </div>
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