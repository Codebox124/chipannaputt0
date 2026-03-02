"use client"

import { ArrowRight, Minus, Plus, Share2 } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import React, { useState, useTransition, useEffect } from 'react'
import { Product, ProductVariant } from '@/lib/shopify/types'

interface ProductCheckoutProps {
    description?: string
    productHandle?: string  // Pass the handle to fetch
}

const ProductCheckout = ({ description, productHandle = '7247127380101' }: ProductCheckoutProps) => {
    const { items, addItem } = useCart()
    const [quantity, setQuantity] = useState<number>(1)
    const [isPending, startTransition] = useTransition()
    const [showMessage, setShowMessage] = useState(false)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch product on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/products/${productHandle}`)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch product')
                }
                
                const data = await response.json()
                setProduct(data.product)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product')
                console.error('Error fetching product:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productHandle])

    const increment = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    const handleAddToCart = () => {
        if (!product || product.variants.length === 0) return

        const variant = product.variants[0]
        startTransition(async () => {
            await addItem(variant, product, quantity)
            setShowMessage(true)
            setQuantity(1)
            setTimeout(() => setShowMessage(false), 2000)
        })
    }

    const handleBuyNow = () => {
        if (!product || product.variants.length === 0) return

        const variant = product.variants[0]
        startTransition(async () => {
            try {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        variantId: variant.id,
                        quantity
                    })
                })

                const data = await response.json()

                if (data.checkoutUrl) {
                    window.location.href = data.checkoutUrl
                } else {
                    console.error('No checkout URL received')
                }
            } catch (error) {
                console.error('Checkout error:', error)
            }
        })
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col md:h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600">Loading product...</p>
            </div>
        )
    }

    // Error state
    if (error || !product) {
        return (
            <div className="flex flex-col md:h-screen items-center justify-center">
                <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col md:h-screen space-y-8 overflow-y-scroll">
                <header>
                    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">
                        Golf Shop
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        {product.title}
                    </h1>
                </header>

                <div className="text-2xl font-medium text-gray-700">
                    ${product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </div>

                {showMessage && (
                    <div className="p-4 bg-green-100 text-green-800 rounded-lg font-semibold">
                        ✓ Added to cart!
                    </div>
                )}

                <div className="space-y-4">
                    <label className="text-sm text-gray-600 font-medium">Quantity</label>
                    <div className="flex items-center border border-gray-300 rounded w-fit bg-white">
                        <button
                            onClick={decrement}
                            disabled={quantity <= 1}
                            className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="px-8 py-2 font-medium text-lg min-w-12 text-center">
                            {quantity}
                        </span>
                        <button
                            onClick={increment}
                            className="p-3 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={isPending || !product.availableForSale}
                        className="w-full py-4 px-6 border border-black rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Adding...' : 'Add to cart'}
                    </button>
                    <button
                        onClick={handleBuyNow}
                        disabled={isPending || !product.availableForSale}
                        className="w-full py-4 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Processing...' : 'Buy it now'}
                    </button>
                </div>

                <footer className="flex justify-between items-center pt-8 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                </footer>

                {(description || product.description) && (
                    <div className="mt-8">
                        <p className="text-gray-600 text-sm leading-relaxed tracking-wide whitespace-pre-wrap">
                            {description || product.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCheckout