import React,{useState,useContext} from 'react'
import {Input,Button} from 'reactstrap'
import VideoContext from '../../context/video-context'
import { format} from 'date-fns'
import styles from './AddVideo.module.css'

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
        console.log(matches[1])
          return matches[1];
      }
      return url;
  }

    function matchVimeoUrl(url) {
      var p = /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
      var matches = url.match(p);
      if(matches){
          return matches[1];
      }
      return url;
  }
    
  let validationYt = matchYoutubeUrl(newYtId)
  let validationVimeo = matchVimeoUrl(newVimeoId)

  //adding the video

     // Making two similar functions breaks DRY principles but it's more readable this way
    const addYoutube = () => {
        if((ytStoredVideos && !ytStoredVideos.find(vid => vid.id == validationYt)) && newYtId.length){

          let current = {type:'YOUTUBE',id:validationYt, addedAt:format(Date.now(),'do MMM y'),isFav:false}
          let stored = JSON.parse(localStorage.getItem("ytVideos"))

          if(stored != null){
            const newStoredYt = JSON.stringify([...stored, current])
            localStorage.setItem('ytVideos', newStoredYt)
          }else {
            localStorage.setItem('ytVideos',JSON.stringify([current]))
          }
         
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
        let current = {type:'VIMEO',id:validationVimeo, addedAt:format(Date.now(),'do MMM y'),isFav:false}

        let storedVimeo = JSON.parse(localStorage.getItem("vimeoVideos"))

        if(storedVimeo != null){
          const newStoredVimeo = JSON.stringify([...storedVimeo, current])
          localStorage.setItem('vimeoVideos', newStoredVimeo)
        }else {
          localStorage.setItem('vimeoVideos',JSON.stringify([current]))
        }
       
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
    <div  className={styles.container}>
      <div className={styles.button__mode}>
        <Button color={buttonMode == 'YOUTUBE' ? 'primary' : 'secondary'} onClick={changeModeHandler}>YOUTUBE</Button>
        <Button color={buttonMode == 'VIMEO' ? 'primary' : 'secondary'} onClick={changeModeHandler}>VIMEO</Button>
      </div>

          {buttonMode =='YOUTUBE' &&  
          <div className={styles.input__container}>
            <Input  value={newYtId} onChange={e=> setNewYtId(e.target.value) } placeholder="Input a youtube video link/id"/>
            <Button type="submit" color="success"  onClick={addYoutube} >Submit</Button>
          </div> }
          {buttonMode =='VIMEO' &&
          <div className={styles.input__container}>
          <Input value={newVimeoId} onChange={e=> setNewVimeoId(e.target.value) } placeholder="Input a vimeo video link/id"/>
          <Button type="submit"color="success"  onClick={addVimeo} >Submit</Button>
          </div> }  
          {error && <p className="error">{error}</p>}
    </div>
  )
}

export default AddVideo