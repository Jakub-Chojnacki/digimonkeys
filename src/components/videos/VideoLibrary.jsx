import React,{useContext} from 'react'
import {Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
const VideoLibrary = () => { 
  const {toggleDisplayMode} = useContext(VideoContext)
  return (
    <div>
       <Button color="primary" onClick={toggleDisplayMode}>Change display mode</Button>
       <Videos type='YOUTUBE'/>

       <Videos type='VIMEO'/>
       </div>
     
  )
}

export default VideoLibrary