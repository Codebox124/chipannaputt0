'use client'

import React, { useEffect, useState } from 'react'
import { Star, AlertCircle, CheckCircle, Quote, ArrowRight, MessageSquare } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

export default function ReviewsSection() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        review: '',
        videoUrl: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitStatus('loading')
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'review',
                    ...formData,
                    videoUrl: formData.videoUrl || 'No video provided'
                })
            })

            if (!response.ok) throw new Error('Failed to send review')

            setSubmitStatus('success')
            setIsSubmitting(false)
            setFormData({ name: '', email: '', rating: 5, review: '', videoUrl: '' })

            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error) {
            setSubmitStatus('error')
            setIsSubmitting(false)
            setErrorMessage('Failed to send review. Please try again.')
            console.error('Review form error:', error)
        }
    }

    const sampleReviews = [
        {
            id: 1,
            name: 'Michael Johnson',
            rating: 5,
            review: 'Don is an amazing instructor! His method of teaching fundamentals really clicked with me. Improved my game significantly.',
            date: 'March 2024',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            rating: 5,
            review: 'The personalized approach to coaching is fantastic. Don takes time to understand your goals and creates a plan that works.',
            date: 'Feb 2024',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
        }
    ]

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Testimonials */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-green-600 font-bold uppercase tracking-widest text-xs mb-4 block">Testimonials</span>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
                                Real Results. <br />Real Mastery.
                            </h2>
                            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
                                Join hundreds of golfers who have transformed their performance through our precision-focused curriculum.
                            </p>

                            <div className="space-y-6 mb-10">
                                {sampleReviews.map((review, idx) => (
                                    <div key={review.id} className="relative p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 group">
                                        <div className="absolute top-6 right-8 text-gray-200 group-hover:text-green-500/10 transition-colors">
                                            <Quote size={40} />
                                        </div>
                                        <div className="flex gap-0.5 mb-4">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-green-600 text-green-600" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.review}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-gray-900">{review.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <a href="/reviews" className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-green-600 transition-colors group">
                                View all student stories
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Modern Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-green-600 blur-[100px] opacity-10 rounded-full" />
                        <div className="relative bg-gray-900 rounded-[3rem] p-10 md:p-12 shadow-2xl overflow-hidden">
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">Share Your Story.</h3>
                            <p className="text-gray-400 mb-8 text-sm">Help others discover the path to a better game.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                    />
                                </div>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium"
                                >
                                    <option value={5}>5 Stars - Elite</option>
                                    <option value={4}>4 Stars - Great</option>
                                    <option value={3}>3 Stars - Good</option>
                                    <option value={2}>2 Stars - Fair</option>
                                    <option value={1}>1 Star - Poor</option>
                                </select>
                                <textarea
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    placeholder="Your experience..."
                                    rows={3}
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium resize-none placeholder:text-gray-600"
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4"
                                >
                                    {isSubmitting ? 'Posting...' : 'Post Review'}
                                    <ArrowRight size={20} />
                                </button>

                                {submitStatus === 'success' && (
                                    <p className="text-green-400 text-center text-xs font-bold mt-4">Thank you! Your review has been sent.</p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
