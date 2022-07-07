import React from 'react'
import VideoLibrary from '../videos/VideoLibrary'
import AddVideo from '../videos/AddVideo'
import { Flex } from '@chakra-ui/react'
const Layout = () => {
  
  return (
    <Flex direction='column' padding={8} gap={4}>
      <AddVideo/>
      <main>
      <VideoLibrary/>
      </main>
    </Flex>
  )
}

export default Layout