import React,{useContext,useState} from 'react'
import useFetchVideo from '../../hooks/useFetchVideo'
import {AiOutlineStar,AiFillStar,AiFillEye} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import styles from './SingleVideo.module.css'
import VideoContext from '../../context/video-context'
import {Card} from 'reactstrap'
import  ModalPlayer from './ModalPlayer'

const SingleVideo = ({type,id,addedAt,isFav}) => {
  const {res,isPending,error} = useFetchVideo(type,id)
  const {ytStoredVideos,vimeoStoredVideos,setYtStoredVideos,setVimeoStoredVideos,listView} = useContext(VideoContext)
  const [showModal,setShowModal] = useState(false)
  const showVideo = () => {
    setShowModal(true)
 }


  const deleteHandler = () => {
    if(type==='YOUTUBE'){
      setYtStoredVideos(prev => prev.filter((el)=> el.id !== id))
    }else if (type ==='VIMEO'){
      setVimeoStoredVideos(prev => prev.filter((el)=> el.id !== id))
    }
 
    
  }

  

  const toggleFavHandler = () => {
    if(type === 'YOUTUBE'){
      setYtStoredVideos(ytStoredVideos.map((item) => {
        if(item.id === id){
          return {
            ...item, isFav: !item.isFav
          }
  
        }
        return item;
      }))
    }
    else if(type === 'VIMEO'){
      setVimeoStoredVideos(vimeoStoredVideos.map((item) => {
        if(item.id === id){
          return {
            ...item, isFav: !item.isFav
          }
  
        }
        return item;
      }))
    }
    }
   

  let displayData = <p>Fetching Data</p>
  if(res && type==='YOUTUBE'){
    const items = res.data.items[0];
   
     displayData = 
     <div >
        <img className={styles.thumbnail} src={items.snippet.thumbnails.high.url} onClick={showVideo}/>
        <h4>{items.snippet.title}</h4>
        <p>{`Views: ${items.statistics.viewCount}`}</p>
        <p>{`Likes: ${items.statistics.likeCount}`}</p>
        <p>{`Added at : ${addedAt}`}</p>
      </div>
  }else if(res && type==='VIMEO'){
    const items = res.data;
     displayData = 
     <div className={styles.kafelki}>
        <img className={styles.thumbnail} src={items.pictures.sizes[3].link}  onClick={showVideo}/>
        <h4>{items.name}</h4>
        <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
        <p>{`Added at : ${addedAt}`}</p>
      </div>
  }
  return (
    <Card color="light" >
        { displayData}
        <div className={styles.icons}><AiFillEye onClick={showVideo} /> <FaTrashAlt onClick={deleteHandler} /> {isFav ? <AiFillStar  onClick={toggleFavHandler} /> : <AiOutlineStar  onClick={toggleFavHandler}/>  } </div>
        {showModal && <ModalPlayer type={type} id={id} hideModal={()=>setShowModal(false)}/>}
      </Card>

  )
}

export default SingleVideo