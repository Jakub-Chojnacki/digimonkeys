import React,{useContext,useState} from 'react'
import useFetchVideo from '../../hooks/useFetchVideo'
import {AiOutlineStar,AiFillStar,AiFillEye} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import styles from './SingleVideo.module.css'
import VideoContext from '../../context/video-context'
import {Card,List,ListInlineItem,Button} from 'reactstrap'
import  ModalPlayer from './ModalPlayer'

const SingleVideo = ({type,id,addedAt,isFav}) => {
  const {res,isPending,error} = useFetchVideo(type,id)
  const {ytStoredVideos,vimeoStoredVideos,setYtStoredVideos,setVimeoStoredVideos,listView} = useContext(VideoContext)
  const [showModal,setShowModal] = useState(false)
  const showVideo = () => {
    setShowModal(true)
 }


    const deleteHandler = () => {
      if(type=='YOUTUBE'){
        setYtStoredVideos(prev => prev.filter((el)=> el.id !== id))
        let stored = JSON.parse(localStorage.getItem("ytVideos"))
        localStorage.setItem('ytVideos', JSON.stringify(stored.filter((el)=> el.id !== id)))
      }else if (type =='VIMEO'){
        setVimeoStoredVideos(prev => prev.filter((el)=> el.id !== id))
        let stored = JSON.parse(localStorage.getItem("vimeoVideos"))
        localStorage.setItem('vimeoVideos', JSON.stringify(stored.filter((el)=> el.id !== id)))
      }
    }

  

    const toggleFavHandler = () => {
      if(type === 'YOUTUBE'){
        setYtStoredVideos(ytStoredVideos.map((item) => {
          if(item.id === id){

            let stored = JSON.parse(localStorage.getItem("ytVideos"))
            stored.map((item) => {
              if(item.id == id){
                console.log(item)
                item.isFav = !item.isFav
                const newStorage = JSON.stringify(stored,{...item,isFav:!isFav})
                localStorage.setItem('ytVideos',newStorage)
                
              }
          })
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
            let stored = JSON.parse(localStorage.getItem("vimeoVideos"))
            stored.map((item) => {
              if(item.id == id){
                console.log(item)
                item.isFav = !item.isFav
                const newStorage = JSON.stringify(stored,{...item,isFav:!isFav})
                localStorage.setItem('vimeoVideos',newStorage)
                
              }
          })
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
            <img className={styles.thumbnail} src={items.snippet.thumbnails.medium.url} onClick={showVideo}/>
            <h5>{items.snippet.title}</h5>
            <p>{`Views: ${items.statistics.viewCount}`}</p>
            <p>{`Likes: ${items.statistics.likeCount}`}</p>
            <p>{`Added at : ${addedAt}`}</p>
          </div>
      }else if(res && type==='VIMEO'){
        const items = res.data;
        displayData = 
        <div className={`${listView ? styles.list : ''}`}>
            <img className={styles.thumbnail} src={items.pictures.sizes[2].link}  onClick={showVideo}/>
            <h5>{items.name}</h5>
            <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
            <p>{`Added at : ${addedAt}`}</p>
          </div>
         
      }


    let cardDisplay = <Card color="light" >
          { displayData}
          <div className={styles.icons}><AiFillEye onClick={showVideo} /> <FaTrashAlt onClick={deleteHandler} /> {isFav ? <AiFillStar  onClick={toggleFavHandler} /> : <AiOutlineStar  onClick={toggleFavHandler}/>  } </div>
          {showModal && <ModalPlayer type={type} id={id} hideModal={()=>setShowModal(false)}/>}
        </Card>


    let listDisplay = <List >
            <ListInlineItem>{ displayData}</ListInlineItem>
            <ListInlineItem className={`${styles.icons} ${styles.icons__list}`}><AiFillEye onClick={showVideo} /> <FaTrashAlt onClick={deleteHandler} /> {isFav ? <AiFillStar  onClick={toggleFavHandler} /> : <AiOutlineStar  onClick={toggleFavHandler}/>  } </ListInlineItem>
            {showModal && <ModalPlayer type={type} id={id} hideModal={()=>setShowModal(false)}/>}
          </List>
  return (
    <div>
      {!listView && cardDisplay}
      {listView && listDisplay}
    </div>
  )
}

export default SingleVideo