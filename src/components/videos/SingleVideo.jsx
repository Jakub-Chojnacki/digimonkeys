import React,{useContext,useState} from 'react'
import useFetchVideo from '../../hooks/useFetchVideo'
import {AiOutlineStar,AiFillStar,AiFillEye} from 'react-icons/ai'
import {FaTrashAlt} from 'react-icons/fa'
import styles from './SingleVideo.module.css'
import VideoContext from '../../context/video-context'
import {Card} from 'reactstrap'
import  ModalPlayer from './ModalPlayer'

const SingleVideo = ({type,id,addedAt,isFav}) => {
  const {res} = useFetchVideo(type,id)
  const {ytStoredVideos,vimeoStoredVideos,setYtStoredVideos,setVimeoStoredVideos,listView} = useContext(VideoContext)
  const [showModal,setShowModal] = useState(false)

  const showVideoHandler = () => {
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
    

      let displayData = <p>Loading...</p>

       // if and else if  breaks DRY principles but it's more readable this way
      if(res && type==='YOUTUBE'){
        const items = res.data.items[0];
        displayData = 
        <div className={listView ? styles.list : ''}>
            <img className={`${styles.thumbnail} ${listView ? styles['thumbnail--list']:''}`} src={items.snippet.thumbnails.high.url} onClick={showVideoHandler}/>
            <div className={styles.text}>
              <h5 className={`${styles.title}  ${listView ? styles['title--list']:''}`}>{items.snippet.title}</h5>
              <p>{`Views: ${items.statistics.viewCount}`}</p>
              <p>{`Likes: ${items.statistics.likeCount}`}</p>
              <p>{`Added at : ${addedAt}`}</p>
            </div>
          </div>
      }else if(res && type==='VIMEO'){
        const items = res.data;
        displayData = 
        <div className={listView ? styles.list : ''} >
            <img className={` ${styles.thumbnail} ${listView ? styles['thumbnail--list']:""}`} src={items.pictures.sizes[3].link}  onClick={showVideoHandler}/>
            <div className={styles.text}>
              <h5 className={` ${styles.title}  ${listView ? styles['title--list']:''}`}>{items.name}</h5>
              <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
              <p>{`Added at : ${addedAt}`}</p>
            </div>
          </div>
         
      }


    let cardDisplay = <Card color="light" className={styles.video__container}>
          { displayData}
          <div className={`${styles.icons} ${listView ? styles['icons--list'] : ''}`}><AiFillEye data-test-name='watch' onClick={showVideoHandler} /> <FaTrashAlt data-test-name='delete' onClick={deleteHandler} /> {isFav ? <AiFillStar  data-test-name='fav' onClick={toggleFavHandler} /> : <AiOutlineStar data-test-name='notFav'  onClick={toggleFavHandler}/>  } </div>
         
        </Card>


    let listDisplay = <div className={styles['video__container--list']}>
             { displayData}
            <div className={`${styles.icons} ${listView ? styles['icons--list'] : ''}`}>
              <AiFillEye data-test-name='watch' onClick={showVideoHandler} /> <FaTrashAlt data-test-name='delete' onClick={deleteHandler} /> {isFav ? <AiFillStar data-test-name='fav' onClick={toggleFavHandler} /> : <AiOutlineStar data-test-name='notFav'  onClick={toggleFavHandler}/>  } 
            </div>

          </div>
  return (
    <div className={styles.video}>
      {!listView && cardDisplay}
      {listView && listDisplay}
      {showModal && <ModalPlayer type={type} id={id} hideModal={()=>setShowModal(false)}/>}
    </div>
  )
}

export default SingleVideo