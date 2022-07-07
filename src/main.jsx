import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { VideoProvider } from './context/video-context'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <VideoProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </VideoProvider>
)
