"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const IntroVideoSection = () => {
    return (
        <>
            <section className='md:h-screen h-[60vh] w-full bg-white flex items-center justify-center relative overflow-hidden'>
                {/* Hero Image Background */}
                <Image
                    src="/golf-hero.jpg"
                    alt="Chip Anna Putt Golf Lessons"
                    fill
                    priority
                    className='w-full h-full object-cover brightness-50'
                />

                {/* Content Overlay */}
                <div className='absolute inset-0 flex flex-col items-center justify-center z-10 px-6'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h2 className='text-5xl md:text-7xl text-white font-black mb-4 tracking-tighter italic'>
                            Chip Anna Putt
                        </h2>

                        <p className='text-xl md:text-2xl text-white font-medium mb-12 max-w-2xl mx-auto opacity-90'>
                            Professional Golf Lessons & Expert Coaching to Master Your Short Game
                        </p>

                        {/* Play Button - Video Placeholder */}
                        <div className='relative flex items-center justify-center mb-6'>
                            <div className='absolute w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full animate-ping duration-3000'></div>
                            <div className='absolute w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full animate-pulse'></div>
                            <button
                                className='relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-all transform hover:scale-110 group shadow-2xl'
                                aria-label="Play video"
                                title="Video coming soon"
                            >
                                <svg
                                    className='w-10 h-10 md:w-14 md:h-14 text-green-600 ml-1 group-hover:scale-110 transition-transform'
                                    fill='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M8 5v14l11-7z' />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 inline-block mt-10">
                            <p className='text-sm md:text-base text-white font-bold tracking-widest uppercase'>
                                Video Course Coming Soon
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default IntroVideoSection
