import Image from 'next/image'
import React from 'react'

const WhyChipa = () => {
    return (
        <div className=' h-screen w-full relative'>

            {/* Bg Image */}
            <Image src="/images/whychipa.png" alt="Why Chipa" width={1920} height={1080} className='w-full h-screen object-cover z-0' />

            {/* Content */}
            <div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-max py-6 sm:py-8 md:py-10 bg-white text-black px-6 sm:px-8 md:px-12 lg:px-16 box-content'>

                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-relaxed text-center mb-3 sm:mb-4'>Why Chip Anna Putt?</h1>

                <p className='text-sm sm:text-base md:text-lg text-center tracking-tight leading-relaxed font-extralight text-gray-500'>Why is our putting aid the best? It covers all the fundamentals of putting. direction, distance, pushes, pulls, putter head squareness to the target reading the greens.</p>

            </div>

        </div>
    )
}

export default WhyChipa