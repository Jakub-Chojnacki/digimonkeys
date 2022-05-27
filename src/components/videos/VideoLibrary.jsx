import React,{useContext} from 'react'
import {Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
const VideoLibrary = () => { 
  const {toggleDisplayMode} = useContext(VideoContext)
  return (
    <div>
       <Button color="primary" onClick={toggleDisplayMode}>Change display mode</Button>
       <div>
         <h2>Your Youtube Library</h2> 
          <Videos type='YOUTUBE'/>
       </div>
      

        <div>
        <h2>Your Vimeo Library</h2>
        <Videos type='VIMEO'/>
        </div>
     
       </div>
     
  )
}

export default VideoLibrary