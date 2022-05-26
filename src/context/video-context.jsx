import React from 'react';
import {createContext,useState} from 'react'
const VideoContext = createContext();

export function VideoProvider({children}){
  

    
    return (
        <VideoContext.Provider
         value={{
           
             }}>
                 
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContext;