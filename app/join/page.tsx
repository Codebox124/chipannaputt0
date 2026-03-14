"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const JoinPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                // Success - redirect is handled by router here
                router.push('/exclusive')
                router.refresh()
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                // If email confirmations are off, the user is instantly logged in with a session
                router.push('/exclusive')
                router.refresh()
            }
        } catch (error: any) {
            setStatus('error')
            setErrorMessage(error.message || 'Authentication failed. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Join Our Golf Community'}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {isLogin ? 'Sign in to access exclusive tutorials and videos.' : 'Create an account to access members-only content, exclusive tips, and special offers.'}
                    </p>
                </motion.div>

                <motion.div
                    key={isLogin ? 'login' : 'signup'}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400 group-focus-within:text-green-600 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[#059c17] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#048a14] active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-green-200"
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {isLogin ? 'Signing In...' : 'Joining...'}
                                </span>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => { setIsLogin(!isLogin); setErrorMessage(''); }}
                                className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
                            >
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Event Highlights or Additional Info */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    {[
                        { title: 'Exclusive Tutorials', desc: 'Get access to members-only drills and video tutorials.' },
                        { title: 'Priority Access', desc: 'Be the first to sign up for clinics and special events.' },
                        { title: 'Community', desc: 'Connect with fellow golfers and share your progress.' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (idx * 0.1) }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default JoinPage