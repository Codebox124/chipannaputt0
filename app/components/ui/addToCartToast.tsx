'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ToastData {
    product: {
        id: string
        name: string
        price: number
        image?: string
    }
    quantity: number
    cartCount: number
}

let showToastGlobal: ((data: ToastData) => void) | null = null

export function showAddToCartToast(data: ToastData) {
    if (showToastGlobal) {
        showToastGlobal(data)
    }
}

export default function AddToCartToast() {
    const [toast, setToast] = useState<ToastData | null>(null)

    useEffect(() => {
        showToastGlobal = (data: ToastData) => {
            setToast(data)

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                setToast(null)
            }, 5000)
        }

        return () => {
            showToastGlobal = null
        }
    }, [])

    const closeToast = () => {
        setToast(null)
    }

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ x: 400, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 400, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-4 right-4 z-50 bg-white shadow-2xl rounded-lg border border-gray-200 w-96"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-500 rounded-full p-1">
                                <Check size={16} className="text-white" />
                            </div>
                            <span className="font-medium text-gray-900">Item added to your cart</span>
                        </div>
                        <button
                            onClick={closeToast}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Product Info */}
                    <div className="flex gap-4 p-4">
                        <div className="w-20 h-20 bg-gray-100 shrink-0 rounded">
                            {toast.product.image ? (
                                <Image
                                    src={toast.product.image}
                                    alt={toast.product.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-xs rounded">
                                    Product
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{toast.product.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {toast.quantity}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 p-4 pt-0">
                        <Link
                            href="/cart"
                            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors text-center"
                            onClick={closeToast}
                        >
                            View cart
                        </Link>
                        <Link
                            href="/checkout"
                            className="flex-1 py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-center"
                            onClick={closeToast}
                        >
                            Check out
                        </Link>
                    </div>

                    {/* Continue Shopping Link */}
                    <div className="px-4 pb-4">
                        <button
                            onClick={closeToast}
                            className="w-full text-center text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                        >
                            Continue shopping
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}