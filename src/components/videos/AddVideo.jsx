import React,{useState,useContext} from 'react'
import {Input,Button} from 'reactstrap'
import VideoContext from '../../context/video-context'

const AddVideo = () => {
    const [newVideoId,setNewVideoId] = useState('')
    const [newVimeo,setNewVimeo] = useState('')
    const [error,setError] = useState('')
   
    const {ytStoredVideos,setYtStoredVideos,vimeoStoredVideos,setVimeoStoredVideos} = useContext(VideoContext)
    

    const addYoutube = () => {
        if(ytStoredVideos){
          let current = {type:'YOUTUBE',id:newVideoId, addedAt:'27th May 2022'}
          setYtStoredVideos(prev => [...prev,current])
  
         
          setError(null)
        }else {
          setError('This video is already stored in your playlist')
        }
     
    }

    const addVimeo = () => {
      if(vimeoStoredVideos){
        let current = {type:'VIMEO',id:newVimeo, addedAt:'26th May 2022'}
        setVimeoStoredVideos(prev=> [...prev,current])
        setError(null)
      }else {
        setError('This video is already stored in your playlist')
      }
    }
    
   
  return (
    <div>
        <Input value={newVideoId} onChange={e=> setNewVideoId(e.target.value)}/>
        <Button type="submit" onClick={addYoutube} >Submit</Button>
        <p className="error">{error}</p>

        <Input value={newVimeo} onChange={e=> setNewVimeo(e.target.value)}/>
        <Button type="submit" onClick={addVimeo} >Submit</Button>
        <p className="error">{error}</p>
    </div>
  )
}

export default AddVideo