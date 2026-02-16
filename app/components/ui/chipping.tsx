import Image from 'next/image'
import React from 'react'

const Chipping = () => {
    return (
        <div className='md:h-screen h-[50vh] w-full relative'>
            {/* Bg Image */}
            <Image src="/images/chipping.png" alt="Why Chipa" width={1920} height={1080} className='w-full h-full object-cover z-0' />

            {/* Content */}
            <div className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-max py-6 sm:py-8 md:py-10 bg-white text-black px-6 sm:px-8 md:px-12 lg:px-16 box-content'>

                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-relaxed text-center mb-3 sm:mb-4 md:mb-6'>Chipping</h1>

                <p className='text-sm sm:text-base md:text-lg text-center tracking-tight leading-relaxed font-extralight text-gray-500'>Chipping is just as critical as putting. You're not going to hit every green, so how you handle those little shots around the fringe makes a big difference. A good chip saves you strokes by setting up an easy putt, while a poor one can add strokes fast.

                </p>

            </div>
        </div>
    )
}

export default Chipping