"use client"

import { ArrowRight, Minus, Plus, Share2 } from 'lucide-react'
import useCart from '@/store'
import { product } from '@/lib/data'
import React, { useState } from 'react'
import { showAddToCartToast } from './addToCartToast'

const ProductCheckout = ({ description, isStorePage }: { description?: string, isStorePage: boolean }) => {

    const addToCart = useCart((state) => state.addToCart)
    const cartItems = useCart((state) => state.cart)
    const total = useCart((state) => state.total)
    const updateCart = useCart((state) => state.updateCart)
    const removeFromCart = useCart((state) => state.removeFromCart)

    const [quantity, setQuantity] = useState<number>(1)

    const increment = () => {
        if (isStorePage) {
            // Update the quantity directly in the zustand store
            updateCart({ ...product, quantity: quantity + 1 })
        } else {
            setQuantity((prev) => prev + 1)
        }
    }

    const decrement = () => {
        if (isStorePage && quantity > 0) {
            // Update the quantity directly in the zustand store
            updateCart({ ...product, quantity: quantity - 1 })
        } else {
            if (quantity > 0) {
                setQuantity((prev) => prev - 1)
            }
        }
    }

    const handleAddToCart = () => {

        const item = cartItems.find((item) => item.id === product.id)

        if (item) {
            updateCart({ ...product, quantity: item.quantity + quantity })
        } else {
            addToCart({ ...product, quantity }, quantity)
        }

        showAddToCartToast({ product, quantity, cartCount: cartItems.length })
    }

    return (
        <div>
            <div className="flex flex-col h-screen space-y-8 overflow-y-scroll">
                <header>
                    <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">My Store</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Chip Anna Putt Kit
                    </h1>
                </header>

                <div className="text-2xl font-medium text-gray-700">
                    $149.99 USD
                </div>

                <div className="space-y-4">
                    <label className="text-sm text-gray-600 font-medium">Quantity</label>
                    <div className="flex items-center border border-gray-300 rounded w-fit bg-white">
                        <button
                            onClick={decrement}
                            className="p-3 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={18} />
                        </button>
                        <span className="px-8 py-2 font-medium text-lg min-w-12 text-center">
                            {isStorePage ? cartItems.find((item) => item.id === product.id)?.quantity : quantity}
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
                    <button onClick={handleAddToCart} className="w-full py-4 px-6 border border-black rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300">
                        Add to cart
                    </button>
                    <button className="w-full py-4 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md">
                        Buy it now
                    </button>
                </div>

                <footer className="flex justify-between items-center pt-8 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors group">
                        <span>View full details</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </footer>

                {description && (
                    <div className="mt-8">
                        <p className="text-gray-600 text-sm leading-relaxed tracking-wide whitespace-pre-wrap">{description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCheckout