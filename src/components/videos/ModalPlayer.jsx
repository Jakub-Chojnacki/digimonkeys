import React from 'react'
import ReactDom from 'react-dom'
import styles from './ModalPlayer.module.css'
import ReactPlayer from 'react-player'
import {AiFillCloseSquare} from 'react-icons/ai'
const PlayerModal = ({type,id,hideModal}) => {

  let modalLink; 

  if(type==='YOUTUBE'){
      modalLink = `https://www.youtube.com/watch?v=${id}`
  }else if(type === 'VIMEO'){
      modalLink =`https://vimeo.com/${id}`
  }


  const Backdrop = () => {
    return <div className={styles.backdrop} onClick={hideModal}></div>
  }

  const ModalOverlay = () =>{
      return (
        <div className={styles.modal}>
            <AiFillCloseSquare className={styles.close} onClick={hideModal}/>
            <ReactPlayer controls url={modalLink}   width="100%" />
          
        </div>
      )
    }

  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onClick={hideModal}/>, document.getElementById('video-modal__backdrop'))}
      {ReactDom.createPortal(<ModalOverlay/>,document.getElementById('video-modal'))}
    </React.Fragment>

    
    
  )
}

export default PlayerModal