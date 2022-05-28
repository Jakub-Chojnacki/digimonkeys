import React,{useContext,useState} from 'react'
import {Button,Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap'
import {AiOutlineUnorderedList} from 'react-icons/ai'
import {CgMenuGridR} from 'react-icons/cg'
import VideoContext from '../../context/video-context'
import Videos from './Videos'
import styles from './VideoLibrary.module.css'
const VideoLibrary = () => { 
  const {toggleListDisplay,toggleTileDisplay,listView,videosPerPage,setVideosPerPage,loadDemo} = useContext(VideoContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleChange = (e) => {
    setVideosPerPage(e.target.value)
    
}
  return (
    <div className={styles.container}>
      <h2>Settings:</h2>
      <div className={styles.settings}>
          <div className={styles.flex}>
          <h4>Display mode :</h4>
          <Button color={!listView ? "primary" : "secondary"} onClick={toggleTileDisplay}><CgMenuGridR/></Button>
          <Button color={listView ? "primary" : "secondary"} onClick={toggleListDisplay}> <AiOutlineUnorderedList/></Button>
          </div>
          <div className={styles.flex}>
              <Button color="primary" onClick={loadDemo}>Load Demo Videos</Button>
              <p>  Note: They won't persist if you add your videos and refresh</p>
          </div>
        
            <div className={styles.flex}>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="primary" caret>Posts per page</DropdownToggle>
                <DropdownMenu onChange={handleChange}>
                  <DropdownItem value={4} onClick={handleChange}>4</DropdownItem>
                  <DropdownItem value={8} onClick={handleChange}>8</DropdownItem>
                  <DropdownItem value={12} onClick={handleChange}>12</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <p>Posts per page:  {videosPerPage}</p>
            </div>
       </div>



       <div className={styles.library}>
          <h2>Your Youtube Library</h2> 
          <Videos type='YOUTUBE'/>
       </div>
    
        <div className={styles.library}>
          <h2>Your Vimeo Library</h2>
          <Videos type='VIMEO'/>
        </div>
       </div>
     
  )
}

export default VideoLibrary