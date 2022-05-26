import React,{useState,useContext} from 'react'
import {Input,Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import { format} from 'date-fns'

const AddVideo = () => {
    const [newVideoId,setNewVideoId] = useState('')
    const [newVimeo,setNewVimeo] = useState('')
    const [error,setError] = useState('')
    const [buttonMode,setButtonMode] = useState('YOUTUBE')
    const {ytStoredVideos,setYtStoredVideos,vimeoStoredVideos,setVimeoStoredVideos} = useContext(VideoContext)
    const addYoutube = () => {
        if(ytStoredVideos){
          let current = {type:'YOUTUBE',id:newVideoId, addedAt:format(Date.now(),'do MMM y')}
          setYtStoredVideos(prev => [...prev,current])
  
         
          setError(null)
        }else {
          setError('This video is already stored in your playlist')
        }
     
    }

    const addVimeo = () => {
      if(vimeoStoredVideos){
        let current = {type:'VIMEO',id:newVimeo, addedAt:format(Date.now(),'do MMM y')}
        setVimeoStoredVideos(prev=> [...prev,current])
        setError(null)
      }else {
        setError('This video is already stored in your playlist')
      }
    }
    
    const changeModeHandler = (e) => {
      setButtonMode(e.target.innerText)
    }
   
  return (
    <div>
      <div>
        <Button color={buttonMode == 'YOUTUBE' ? 'primary' : 'secondary'} onClick={changeModeHandler}>YOUTUBE</Button>
        <Button color={buttonMode == 'VIMEO' ? 'primary' : 'secondary'} onClick={changeModeHandler}>VIMEO</Button>
      </div>

          {buttonMode =='YOUTUBE' &&  
          <div>
            <Input value={newVideoId} onChange={e=> setNewVideoId(e.target.value) } placeholder="Input a youtube id/link"/>
            <Button type="submit" onClick={addYoutube} >Submit</Button>
          </div> }
          {buttonMode =='VIMEO' &&
          <div>
          <Input value={newVimeo} onChange={e=> setNewVimeo(e.target.value) } placeholder="Input a vimeo id"/>
          <Button type="submit" onClick={addVimeo} >Submit</Button>
          </div> }  
    </div>
  )
}

export default AddVideo