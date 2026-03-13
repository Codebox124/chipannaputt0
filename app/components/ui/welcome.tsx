"use client"

import React from 'react'

const Welcome = () => {


  const [videoPlaying, setVideoPlaying] = React.useState(false)

  const handlePlayVideo = () => {
    const video = document.querySelector('video')
    video?.play()
    setVideoPlaying(true)
  }
  return (
    <div className='w-full py-16 px-6 sm:px-10 md:px-16 md:mb mb-0-10 -mt-26'>

      <div className='relative max-w-6xl mx-auto aspect-video rounded-[32px] overflow-hidden shadow-2xl bg-black group'>
        {/* Video */}
        <video
          src="https://chipannaputt.com/cdn/shop/videos/c/vp/48c213140c3547c082d0828025d1878e/48c213140c3547c082d0828025d1878e.HD-1080p-7.2Mbps-56113994.mp4?v=0"
          loop
          controls={videoPlaying}
          className='w-full h-full object-cover'
        />

        {/* Custom play button overlay */}
        {!videoPlaying && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all'>
            <button
              className='w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all'
              onClick={handlePlayVideo}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="#059c17" />
              </svg>
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Welcome