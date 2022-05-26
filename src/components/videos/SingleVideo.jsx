import React from 'react'
import useFetchVideo from '../../hooks/useFetchVideo'
const SingleVideo = ({type,id,addedAt}) => {

  const {data,isPending,error} = useFetchVideo(type,id)
  {data && console.log(data)}

  return (
    <div><h1>Single video</h1>
      <div>{type}</div>
      <div>{id}</div>
      <div>{addedAt}</div>
    </div>
  )
}

export default SingleVideo