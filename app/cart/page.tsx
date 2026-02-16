"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCart from '@/store';
import { product } from '@/lib/data';

export default function ShoppingCart() {

    const cartItems = useCart((state) => state.cart)
    const updateCart = useCart((state) => state.updateCart)
    const removeFromCart = useCart((state) => state.removeFromCart)

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateCart({ ...product, quantity: newQuantity })
    };

    const removeItem = () => {
        removeFromCart(product)
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    return (
        <section className="bg-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900">Your cart</h1>
                    <Link
                        href="/shop"
                        className="text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors"
                    >
                        Continue shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="bg-black text-white px-8 py-4 rounded-full inline-block hover:bg-gray-800 transition-colors"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm text-gray-600 uppercase tracking-wide mb-6">
                            <div className="col-span-6">Product</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-3 text-right">Total</div>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="grid grid-cols-12 gap-4 items-center pb-6 border-b border-gray-100">
                                    {/* Product Info */}
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="w-24 h-24 bg-gray-100 shrink-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} width={100} height={100} />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-100 shrink-0">
                                                    <Image src="/placeholder.png" alt="Placeholder" width={100} height={100} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="col-span-3 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            aria-label="Decrease quantity"
                                        >
                                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none">
                                                <path d="M0 1H16" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </button>

                                        <span className="w-12 text-center text-gray-900 font-medium">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            aria-label="Increase quantity"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => removeItem()}
                                            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" strokeWidth="1.5" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <div className="col-span-3 text-right">
                                        <p className="text-xl font-medium text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-12 flex justify-end">
                            <div className="w-full md:w-96">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xl font-medium text-gray-900">Estimated total</span>
                                    <span className="text-2xl font-medium text-gray-900">
                                        ${calculateTotal().toFixed(2)} USD
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 text-right mb-6">
                                    Taxes, discounts and shipping calculated at checkout.
                                </p>
                                <button className="w-full bg-black text-white py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                                    Check out
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}