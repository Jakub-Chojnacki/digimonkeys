import React from 'react'
import ReactDom from 'react-dom'
import styles from './PlayerModal.module.css'
import ReactPlayer from 'react-player'
const PlayerModal = ({type,id,hideModal}) => {

    let modalLink;

    if(type==='YOUTUBE'){
        modalLink = `https://www.youtube.com/watch?v=${id}`
    }else if(type === 'VIMEO'){
        modalLink =`https://vimeo.com/${id}`
    }

  return ReactDom.createPortal(
    <div className={styles.modal}>
        <ReactPlayer controls url={modalLink} playing />
        <p onClick={hideModal}> close</p>
    </div>,document.getElementById('video')
    
  )
}

export default PlayerModal