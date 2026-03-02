import React from 'react'
import Image from 'next/image'

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
                <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
                    <p className='text-4xl md:text-5xl text-center text-white font-bold mb-6'>
                        Chip Anna Putt
                    </p>

                    <p className='text-xl md:text-2xl text-center text-white font-semibold mb-12 max-w-2xl px-4'>
                        Professional Golf Lessons & Coaching
                    </p>

                    {/* Play Button - Video Placeholder */}
                    <div className='relative flex items-center justify-center'>
                        <div className='absolute w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-full animate-pulse'></div>
                        <button
                            className='relative w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-all transform hover:scale-110 group shadow-lg'
                            aria-label="Play video"
                            title="Video coming soon"
                        >
                            <svg
                                className='w-8 h-8 md:w-12 md:h-12 text-green-600 ml-1'
                                fill='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path d='M8 5v14l11-7z' />
                            </svg>
                        </button>
                    </div>

                    <p className='text-sm md:text-base text-white/80 mt-8'>
                        Video Coming Soon
                    </p>
                </div>
            </section>
        </>
    )
}

export default IntroVideoSection
