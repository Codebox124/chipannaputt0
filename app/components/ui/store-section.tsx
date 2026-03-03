import Image from 'next/image'
import React from 'react'
import ShopifyBuyButton from './shopify-buy-button'

const StoreSection = ({ description, isStorePage }: { description?: string, isStorePage: boolean }) => {
    return (
        <div className='w-full p-6 sm:p-8 md:p-12 lg:p-16'>

            {/* An image on the left, and a product checkout on the right */}
            <div className='w-full md:min-h-screen md:h-screen flex items-center justify-center'>
                <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 md:gap-12'>
                    <div className='w-full h-full flex items-center justify-center p-4 md:p-0'>
                        <Image src="/images/product1.png" alt="Store" width={400} height={400} className='w-full max-w-md md:max-w-full h-auto object-contain' />
                    </div>

                    {/* Shopify Buy Button */}
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className="w-full max-w-md">
                            {description && (
                                <p className="text-gray-600 text-sm leading-relaxed tracking-wide whitespace-pre-wrap mb-8">
                                    {description}
                                </p>
                            )}
                            <ShopifyBuyButton productId="7247127380101" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default StoreSection