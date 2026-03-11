"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const IntroVideoSection = () => {

    // video  play state
    const videoRef = React.useRef<HTMLVideoElement>(null)

    return (
        <>
            <section className='md:h-screen h-max w-full bg-white flex items-center justify-center relative overflow-hidden my-0'>
                {/* Hero Image Background */}
                <iframe src="https://drive.google.com/file/d/10g5tviZPqGIy8iO3iB_q0XTjI-gVteVF/preview" width="640" height="480" className=' w-full md:h-full h-[50vh]'></iframe>

                {/* Content Overlay */}
                <div className='absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none'>
                </div>
            </section >
        </>
    )
}

export default IntroVideoSection
