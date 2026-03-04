"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const WhyChipa = () => {
    return (
        <div className='w-full relative min-h-[60vh] md:h-screen flex items-center justify-center overflow-hidden'>

            {/* Bg Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image src="/images/whychipa.png" alt="Why Chipa" width={1920} height={1080} className='w-full h-full object-cover' />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='relative z-10 w-[90%] max-w-2xl bg-white/95 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[40px] shadow-2xl'
            >
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center mb-6 text-gray-900'>
                    Why Chip Anna Putt?
                </h2>

                <p className='text-base sm:text-lg md:text-xl text-center leading-relaxed font-medium text-gray-600'>
                    Why is our putting aid the best? Because it covers all the <span className="text-green-600 font-bold">fundamentals</span>. Direction, distance, head squareness, and green reading - everything you need to dominate the short game.
                </p>
            </motion.div>

        </div>
    )
}

export default WhyChipa