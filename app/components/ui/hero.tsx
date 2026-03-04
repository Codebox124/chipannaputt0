import React from 'react'

const HeroSection = () => {
    return (
        <div className='w-full min-h-[70vh] md:h-screen mt-16 md:mt-20 hero flex items-center justify-start px-6 sm:px-10 md:px-16 lg:px-24'>
            <div className='flex flex-col items-start justify-center gap-4 sm:gap-6 md:gap-8 text-white max-w-4xl'>

                {/* everything left aligned */}

                <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tighter'>
                    Master the Shots <br /> That Matter
                </h1>

                <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-tight font-medium opacity-90 max-w-2xl'>
                    The short game secret the pros use to dominate the course and lower their scores instantly.
                </p>

                <div className='flex flex-wrap gap-4 mt-4'>
                    <button className='btn btn-primary px-8 py-4 text-lg'>
                        Shop The Kit
                    </button>
                    <button className='bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-[10px] hover:bg-white/20 transition-all text-lg'>
                        View Lessons
                    </button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection