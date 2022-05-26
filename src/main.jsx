import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {VideoProvider} from './context/video-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <VideoProvider>
  <App />
</VideoProvider>
 
)
