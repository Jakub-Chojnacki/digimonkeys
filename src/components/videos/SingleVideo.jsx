import React from 'react'
import useFetchVideo from '../../hooks/useFetchVideo'
const SingleVideo = ({type,id,addedAt}) => {
  const {res,isPending,error} = useFetchVideo(type,id)
  if(res && type==='YOUTUBE'){
    const items = res.data.items[0];
  return(
      <div>
        <img src={items.snippet.thumbnails.high.url}/>
        <h4>{items.snippet.title}</h4>
        <p>{`Views: ${items.statistics.viewCount}`}</p>
        <p>{`Likes: ${items.statistics.likeCount}`}</p>
      </div>
      )
    

  }else if(res && type==='VIMEO'){
    const items = res.data;
    return(
      <div>
        <img src={items.pictures.sizes[3].link}/>
        <h4>{items.name}</h4>
        <p>{`Likes: ${items.metadata.connections.likes.total}`}</p>
      </div>
      )
    

  }

  return (
    <div>
      <h1>We couldn't find the video</h1>
    </div>
  )
}

export default SingleVideo