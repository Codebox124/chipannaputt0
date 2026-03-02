import React from 'react'
import HeroSection from './components/ui/hero'
import WhyChipa from './components/ui/why-chipa'
import Welcome from './components/ui/welcome'
import Image from 'next/image'
import Chipping from './components/ui/chipping'
import Putting from './components/ui/putting'
import StoreSection from './components/ui/store-section'
import QuoteSections from './components/ui/quote-sections'
import IntroVideoSection from './components/ui/introVideoSection'
import ReviewsSection from './components/home/reviews-section'
import LessonsSection from './components/home/lessons-section'

const page = () => {
  return (
    <div>
      <HeroSection />
      {/* Intro Video Section */}
      <IntroVideoSection />

      <WhyChipa />
      <Welcome />

      <section className=' w-full min-h-[50vh] py-12 sm:py-16 md:py-20 lg:p-16 flex items-center justify-center px-4 sm:px-6 md:px-8'>

        <div className=' w-full md:w-[90%] lg:w-[80%] xl:w-[70%] ml-auto mr-auto'>
          <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-relaxed font-meduim mb-4 sm:mb-6 md:mb-8 text-center'>Mastering the fundamentals makes a better golfer</h1>

          <p className='text-sm sm:text-base md:text-lg tracking-tight leading-relaxed font-normal mb-4 sm:mb-6 md:mb-8 text-center text-gray-600'>
            That&apos;s why I created the ChipAnnaPutt Kit (named after dear old Dad, the most consistent golfer I know). When Dad missed hitting a green, he would say, &quot;Oh well . . . chip ana putt. FEEEL the distance!&quot; Pros will &quot;step it off&quot; so they can feel the distance and direction (the Double Ds).
          </p>

          <p className='text-sm sm:text-base md:text-lg tracking-tight leading-relaxed font-normal mb-6 sm:mb-8 md:mb-10 text-center text-gray-600'>
            The ball WILL go in the hole!
          </p>

          {/* Image */}
          <Image src="/images/logo-banner.png" alt="" width={200} height={200} className='w-full h-auto' />

        </div>

      </section>

      <Chipping />
      <Putting />

      {/* Store Section */}
      <StoreSection isStorePage={false} />

      {/* Lessons Section */}
      <LessonsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      <QuoteSections />

    </div>
  )
}

export default page
