import React from 'react'
import VideoLibrary from './videos/VideoLibrary'
import styles from './Layout.module.css'
const Layout = () => {
  
  return (
    <div className={styles.layout}>
      <VideoLibrary/>
    </div>
  )
}

export default Layout