"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ShoppingCart, Store } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 150) setHidden(true);
            else if (currentScrollY < lastScrollY) setHidden(false);
            if (currentScrollY < 10) setHidden(false);
            lastScrollY = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    const currentUrl = usePathname()
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [currentUrl])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "Lessons", href: "/lessons" },
        { name: "Reviews", href: "/reviews" },
        { name: "Join", href: "/join" },
        { name: "Donate", href: "/donate" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <div>
            {/* The green info header at the top of page - hides when scrolling */}
            <div
                style={{
                    transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
                    transition: 'transform 0.3s ease-in-out'
                }}
                className='flex items-center justify-center w-full bg-[#059c17] h-8 text-center font-bold py-3 text-white text-xs sm:text-sm md:text-base fixed top-0 left-0 right-0 z-40'
            >
                FREE Shipping with every purchase
            </div>

            {/* The navbar - stacks below green banner at top, moves to top when scrolling */}
            <header
                style={{
                    top: hidden ? '0' : '32px',
                    transition: 'top 0.3s ease-in-out'
                }}
                className='w-full p-4 sm:p-4 md:p-5 px-9 sm:px-8 md:px-12 lg:px-16 bg-white fixed left-0 right-0 z-50 shadow-sm'>

                {/* Mobile Layout: Menu | Logo | Icons */}
                <div className='lg:hidden flex items-center justify-between w-full'>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center'
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Center: Logo */}
                    <Link href="/" className='flex items-center justify-center'>
                        <Image src="/logo.png" alt="Logo" width={180} height={180} className='md:w-20 w-36 h-auto' />
                    </Link>

                    {/* Right: Search & Cart Icons */}
                    <div className='flex items-center gap-0'>
                        {/* Search icon */}
                        <button className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center' aria-label="Search">
                            <Search size={22} strokeWidth={1.5} />
                        </button>

                        {/* Cart Icon - Now links to Shop */}
                        <Link
                            href="/shop"
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center relative'
                            aria-label="Shop"
                        >
                            <Store size={22} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

                {/* Desktop Layout: Logo + Links | Icons */}
                <div className='hidden lg:flex items-center justify-between w-full'>
                    {/* Logo + Desktop Links */}
                    <div className='flex items-center gap-8'>
                        {/* Logo */}
                        <Link href="/" className='flex items-center justify-center'>
                            <Image src="/logo.png" alt="Logo" width={180} height={180} className='w-32 lg:w-40 h-auto' />
                        </Link>

                        {/* Desktop Links */}
                        <nav className='flex items-center text-gray-600 font-medium text-base lg:text-lg'>
                            <ul className='flex items-center gap-6 lg:gap-10'>
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`hover:text-black transition-colors ${currentUrl === link.href ? "text-black font-semibold border-b-2 border-black" : ""}`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Desktop Icons */}
                    <div className='flex items-center gap-1 text-black'>
                        {/* Search icon */}
                        <button className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center' aria-label="Search">
                            <Search size={24} strokeWidth={1.5} />
                        </button>

                        {/* Cart Icon - Now links to Shop */}
                        <Link
                            href="/shop"
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center relative'
                            aria-label="Shop"
                        >
                            <Store size={24} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Menu</h2>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col p-6">
                                <ul className="space-y-1">
                                    {navLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${currentUrl === link.href
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* Divider */}
                                <div className="my-6 border-t border-gray-200" />

                                {/* Additional Mobile Menu Items */}
                                <div className="space-y-1">
                                    <button className="w-full flex items-center gap-4 py-3 px-4 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                                        <Search size={20} strokeWidth={1.5} />
                                        <span>Search</span>
                                    </button>

                                    <Link
                                        href="/shop"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full flex items-center gap-4 py-3 px-4 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                                    >
                                        <ShoppingCart size={20} strokeWidth={1.5} />
                                        <span>Visit Shop</span>
                                    </Link>

                                    <a href="https://nq5qk0-y0.myshopify.com/account" className="w-full flex items-center gap-3 py-3 px-4 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                                        <span>Account</span>
                                    </a>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header