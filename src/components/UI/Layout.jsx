import React from 'react'
import VideoLibrary from '../videos/VideoLibrary'
import AddVideo from '../videos/AddVideo'
import styles from './Layout.module.css'
const Layout = () => {
  
  return (
    <div className={styles.layout}>
      <AddVideo/>
      <main>
      <VideoLibrary/>
      </main>
    </div>
  )
}

export default Layout