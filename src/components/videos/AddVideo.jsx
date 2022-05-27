import React,{useState,useContext} from 'react'
import {Input,Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import { format} from 'date-fns'

const AddVideo = () => {
    const [newYtId,setNewYtId] = useState('')
    const [newVimeoId,setNewVimeoId] = useState('')
    const [error,setError] = useState('')
    const [buttonMode,setButtonMode] = useState('YOUTUBE')
    const {ytStoredVideos,setYtStoredVideos,vimeoStoredVideos,setVimeoStoredVideos} = useContext(VideoContext)

    //change input mode(YOUTUBE/VIMEO)
    const changeModeHandler = (e) => {
      setButtonMode(e.target.innerText)
    }
   

    //validations
    function matchYoutubeUrl(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      var matches = url.match(p);
      if(matches){
          return matches[1];
      }
      return false;
  }

    function matchVimeoUrl(url) {
      var p = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
      var matches = url.match(p);
      if(matches){
          return matches[1];
      }
      return false;
  }
    
  let validationYt = matchYoutubeUrl(newYtId)
  let validationVimeo = matchVimeoUrl(newVimeoId)

  //adding the video
    const addYoutube = () => {
        if((ytStoredVideos && !ytStoredVideos.find(vid => vid.id == validationYt)) && newYtId.length){

          let current = {type:'YOUTUBE',id:validationYt, addedAt:format(Date.now(),'do MMM y')}
          
          setYtStoredVideos(prev => [...prev,current])

          setError(null)
        }else{
          if(newYtId.length){
            setError('This video is already stored in your playlist')
          }else {
            setError('You must enter a link/id')
          }
         
        }
     
    }

    const addVimeo = () => {
      if((vimeoStoredVideos && !vimeoStoredVideos.find(vid => vid.id == validationVimeo)) && newVimeoId.length){
        let current = {type:'VIMEO',id:validationVimeo, addedAt:format(Date.now(),'do MMM y')}
        setVimeoStoredVideos(prev=> [...prev,current])
        setError(null)
      }else {
        if(newVimeoId.length){
          setError('This video is already stored in your playlist')
        }else {
          setError('You must enter a link/id')
        }
      }
    }
    
    
  return (
    <div>
      <div>
        <Button color={buttonMode == 'YOUTUBE' ? 'primary' : 'secondary'} onClick={changeModeHandler}>YOUTUBE</Button>
        <Button color={buttonMode == 'VIMEO' ? 'primary' : 'secondary'} onClick={changeModeHandler}>VIMEO</Button>
      </div>

          {buttonMode =='YOUTUBE' &&  
          <div>
            <Input value={newYtId} onChange={e=> setNewYtId(e.target.value) } placeholder="Input a youtube id/link"/>
            <Button type="submit" color="success" outline onClick={addYoutube} >Submit</Button>
          </div> }
          {buttonMode =='VIMEO' &&
          <div>
          <Input value={newVimeoId} onChange={e=> setNewVimeoId(e.target.value) } placeholder="Input a vimeo id"/>
          <Button type="submit"color="success" outline onClick={addVimeo} >Submit</Button>
          </div> }  
          {error && <p className="error">{error}</p>}
    </div>
  )
}

export default AddVideo