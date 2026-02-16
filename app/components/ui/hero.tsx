import React from 'react'

const HeroSection = () => {
    return (
        <div className=' w-full h-screen hero flex items-center justify-start px-4 sm:px-8 md:px-12 lg:px-20'>
            <div className='flex flex-col items-start justify-center gap-2 sm:gap-3 md:gap-4 text-white'>

                {/* everything left aligned */}

                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tighter'>
                    Master the Shots That <br /> Matter
                </h1>

                <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tighter font-bold'>
                    The short game secret pros know
                </p>

                <button className='btn btn-primary mt-3 sm:mt-4 md:mt-5'>
                    Learn More
                </button>

            </div>
        </div>
    )
}

export default HeroSection