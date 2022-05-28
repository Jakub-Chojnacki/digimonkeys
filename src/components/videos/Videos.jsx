import React,{useState,useContext} from 'react'
import {Button } from 'reactstrap'
import VideoPagination from '../UI/VideoPagination'
import SingleVideo from './SingleVideo'
import VideoContext from '../../context/video-context'
import styles from './Videos.module.css'
const Videos = ({type}) => {
    const {vimeoStoredVideos,ytStoredVideos,clearVimeoStoredVideos,clearYtStoredVideos,listView} = useContext(VideoContext)
    const [isReversed,setIsReversed] = useState(false)
    const [showOnlyFav,setShowOnlyFav] = useState(false)   
    const [currentPage,setCurrentPage] = useState(1)
    const [videosPerPage,setVideosPerPage] = useState(4)
    let favouriteVideos;
    let displayVideo;
    let videosLink;

    const handleReverse = () => {
        setIsReversed(prev => !prev)

        if(type =='YOUTUBE'){
            ytStoredVideos.reverse()
        }else if(type ==='VIMEO'){
            vimeoStoredVideos.reverse()
        }
       
      
    }


    //pagination
    let currentVideos;
    
    const indexOfLastVid = currentPage * videosPerPage;
    const indexOfFirstVid = indexOfLastVid - videosPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);


    if(type == 'YOUTUBE'){
       videosLink = ytStoredVideos

    }else if(type=='VIMEO'){
       videosLink = vimeoStoredVideos  
    }
    currentVideos = videosLink.slice(indexOfFirstVid,indexOfLastVid)
    favouriteVideos = videosLink.filter(video => video.isFav == true);
    displayVideo = currentVideos.map((video)=> {
       return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
     })

  return (
    <div className={styles.container} >

        <div className={styles.buttons}>
            <Button color="primary" outline onClick={handleReverse}>{!isReversed ? 'Reverse the order' : 'Show the original order'}</Button> 
            {<Button color="primary" outline onClick={()=> {setShowOnlyFav(prev => !prev)}}>{!showOnlyFav  ? 'Show Favourite Videos' : 'Show All Videos'}</Button>}

            { type=="VIMEO" && <Button onClick={clearVimeoStoredVideos} color="danger">Clear All</Button>}
            { type =="YOUTUBE" &&  <Button onClick={clearYtStoredVideos} color="danger">Clear All</Button>}
            
        </div>

        <div className={`${styles.videos} ${listView ? styles.list : ''} `}>
            {!showOnlyFav && displayVideo}
            {showOnlyFav && favouriteVideos.map((video)=> {
            return <SingleVideo key={video.id} type={video.type} id={video.id} addedAt={video.addedAt} isFav={video.isFav}/>
            })} 

        </div>
        
        {!showOnlyFav && <VideoPagination
            postsPerPage={videosPerPage}
            totalPosts={type=='YOUTUBE'? ytStoredVideos.length : vimeoStoredVideos.length}
            paginate={paginate}
        />}

        {showOnlyFav &&<VideoPagination
                postsPerPage={videosPerPage}
                totalPosts={favouriteVideos.length}
                paginate={paginate}
            />}

   </div>
  )
}

export default Videos