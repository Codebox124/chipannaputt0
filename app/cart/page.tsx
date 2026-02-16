'use client'

import Image from 'next/image'
import Link from 'next/link'
import useCart from '@/store'

export default function ShoppingCart() {
    const cartItems = useCart((state) => state.cart)
    const total = useCart((state) => state.total)
    const updateQuantity = useCart((state) => state.updateQuantity)
    const removeFromCart = useCart((state) => state.removeFromCart)

    return (
        <section className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
                    <Link
                        href="/shop"
                        className="text-sm text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
                    >
                        Continue shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="bg-black text-white px-8 py-3 rounded-lg inline-block hover:bg-gray-800 transition-colors"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-2 pb-2 mb-4">
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Product</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider text-right">Total</div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="bg-white">
                                    <div className="flex gap-4 pb-6">
                                        {/* Product Image */}
                                        <div className="w-24 h-32 sm:w-28 sm:h-36 bg-gray-100 shrink-0">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={112}
                                                    height={144}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-400" />
                                            )}
                                        </div>

                                        {/* Product Info & Controls */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            {/* Top Section: Name and Price */}
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bottom Section: Quantity Controls & Delete */}
                                            <div className="flex items-center gap-2">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-300 rounded">
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity > 1) {
                                                                updateQuantity(item.id, item.quantity - 1)
                                                            } else {
                                                                removeFromCart(item)
                                                            }
                                                        }}
                                                        className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-4 text-center font-medium text-gray-900 min-w-[40px]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => removeFromCart(item)}
                                                    className="p-2 hover:bg-gray-50 transition-colors rounded"
                                                    aria-label="Remove item"
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                                                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-8 bg-white p-6 rounded-lg">
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-medium text-gray-900">Estimated total</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${total.toFixed(2)} USD
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 text-right">
                                    Taxes, discounts and shipping calculated at checkout.
                                </p>
                            </div>

                            <button className="w-full bg-black text-white py-4 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">
                                Check out
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}