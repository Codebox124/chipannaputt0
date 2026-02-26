import React from 'react'

const IntroVideoSection = () => {
    return (
        <>
            <section className=' md:h-screen h-[60vh] w-full bg-white flex items-center justify-center relative'>

                <video src="https://cdn.pixabay.com/video/2020/12/04/58302-488224762_small.mp4" autoPlay loop muted className=' w-full h-full object-cover brightness-75' />

                <div className='  absolute'>
                    <p className=' text-3xl text-center text-white font-bold'>
                        Intro Video
                    </p>

                    <p className=' text-2xl text-center text-white font-bold'>
                        Wslcome to Chip Ann Putt
                    </p>
                </div>

            </section>
        </>
    )
}

export default IntroVideoSection