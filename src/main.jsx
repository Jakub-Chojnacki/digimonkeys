import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { VideoProvider } from './context/video-context'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const fonts = {
  body: `'Kumbh Sans', sans-serif`,

}

const theme = extendTheme({fonts})

ReactDOM.createRoot(document.getElementById('root')).render(
  <VideoProvider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </VideoProvider>
)
