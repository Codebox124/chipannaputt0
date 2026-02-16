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
    <div className=' w-full p-6 sm:p-8 md:p-12 lg:p-16'>

      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-relaxed font-meduim mb-4 sm:mb-6 md:mb-8'>Welcome to Chip Anna Putt</h1>

      <div className=' relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen'>
        {/* Video */}
        <video src="https://chipannaputt.com/cdn/shop/videos/c/vp/48c213140c3547c082d0828025d1878e/48c213140c3547c082d0828025d1878e.HD-1080p-7.2Mbps-56113994.mp4?v=0" loop controls className='w-full h-full object-cover' />

        {/* Round Video play button */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 h-max'>

          <button className={` w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center ${videoPlaying ? 'hidden' : ''}`} onClick={handlePlayVideo}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Welcome