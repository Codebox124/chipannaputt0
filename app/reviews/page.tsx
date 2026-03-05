'use client'

import React, { useEffect, useState } from 'react'
import { Star, AlertCircle, CheckCircle, Quote, ArrowRight, MessageSquare, Video, StarHalf } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReviewsPage() {
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
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [activeTab, setActiveTab] = useState<'reviews' | 'form'>('form')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            const templateParams = {
                to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'chipannaputt8@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                rating: formData.rating,
                review: formData.review,
                video_url: formData.videoUrl || 'No video provided'
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_htp9egg',
                process.env.NEXT_PUBLIC_EMAILJS_REVIEW_TEMPLATE || 'template_review',
                templateParams
            )

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                rating: 5,
                review: '',
                videoUrl: ''
            })

            setTimeout(() => {
                setSubmitStatus('idle')
                setActiveTab('reviews')
            }, 3000)
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send review')
            console.error('[v0] Review submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const sampleReviews = [
        {
            id: 1,
            name: 'Michael Johnson',
            rating: 5,
            title: 'Unbelievable Progress',
            review: 'Don is an amazing instructor! His method of teaching fundamentals really clicked with me. I\'ve improved my game significantly in just a few weeks.',
            date: 'March 2024'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            rating: 5,
            title: 'Personalized Coaching',
            review: 'The personalized approach to coaching is fantastic. Don takes time to understand your goals and creates a lesson plan that works for you. Highly recommended!',
            date: 'February 2024'
        },
        {
            id: 3,
            name: 'James Patterson',
            rating: 5,
            title: 'Crystal Clear Instruction',
            review: 'Finally understanding the proper grip and stance. Don\'s explanations are clear and easy to follow. Can\'t wait for my next lesson!',
            date: 'January 2024'
        },
        {
            id: 4,
            name: 'Emily Davis',
            rating: 5,
            title: 'Seamless Experience',
            review: 'The online format works perfectly for my schedule. Don is professional, knowledgeable, and makes learning fun. Great experience overall!',
            date: 'April 2024'
        },
        {
            id: 5,
            name: 'Robert Taylor',
            rating: 5,
            title: 'Game Changer',
            review: 'After years of struggling with my short game, Don finally showed me what I was doing wrong. This has been life-changing for my golf!',
            date: 'December 2023'
        },
        {
            id: 6,
            name: 'Jessica Martinez',
            rating: 5,
            title: 'Fundamental Mastery',
            review: 'Don\'s knowledge of PGA fundamentals is impressive. He explains concepts in a way that makes sense and you can apply immediately on the course.',
            date: 'November 2023'
        }
    ]

    return (
        <main className="min-h-screen bg-white">
            {/* Header Section */}
            <section className="relative pt-40 pb-20 px-6 overflow-hidden bg-gray-50 border-b border-gray-100">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/5 blur-[120px] rounded-full translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                            Testimonials
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
                            Success <br />Stories.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 mb-10 leading-relaxed max-w-2xl font-medium">
                            The results speak for themselves. Discover how our students are transforming their game through precision instruction.
                        </p>
                    </motion.div>

                    {/* Navigation Tabs */}
                    <div className="md:flex block gap-4 mt-12">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`px-8 py-4 rounded-full font-bold transition-all flex items-center md:justify-start justify-center md:w-max w-full gap-2 md:mb-0 mb-3 ${activeTab === 'reviews'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            <MessageSquare size={18} />
                            Student Feedback
                        </button>
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`px-8 py-4 rounded-full font-bold transition-all flex items-center md:justify-start justify-center md:w-max w-full gap-2 ${activeTab === 'form'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            <Quote size={18} />
                            Share Experience
                        </button>
                    </div>
                </div>
            </section>

            <AnimatePresence mode="wait">
                {activeTab === 'reviews' ? (
                    <motion.section
                        key="reviews"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="py-24 px-6 bg-white"
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {sampleReviews.map((review, idx) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group relative bg-gray-50 rounded-[2.5rem] p-10 border border-transparent hover:border-green-600/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="absolute top-8 right-10 text-gray-200 group-hover:text-green-500/10 transition-colors">
                                            <Quote size={80} strokeWidth={1.5} />
                                        </div>

                                        <div className="relative z-10 h-full flex flex-col">
                                            <div className="flex gap-0.5 mb-6">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={18} className="fill-green-600 text-green-600" />
                                                ))}
                                            </div>

                                            <p className="text-xl font-black text-gray-900 mb-4 tracking-tight leading-tight italic">"{review.title}"</p>

                                            <p className="text-gray-600 leading-relaxed mb-auto italic">
                                                {review.review}
                                            </p>

                                            <div className="mt-8 pt-6 border-t border-gray-200/60">
                                                <h4 className="font-bold text-gray-900">{review.name}</h4>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{review.date}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="py-24 px-6"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 blur-[100px] pointer-events-none" />

                                <div className="relative z-10 text-center mb-12">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
                                        Your voice <br />matters.
                                    </h2>
                                    <p className="text-gray-400 font-medium">Help other golfers find their way to a better game.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Your Name"
                                            required
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email Address"
                                            required
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">Rating</label>
                                        <select
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium"
                                        >
                                            <option value={5}>5 Stars - Elite Performance</option>
                                            <option value={4}>4 Stars - Great Progress</option>
                                            <option value={3}>3 Stars - Solid Instruction</option>
                                            <option value={2}>2 Stars - Room for Improvement</option>
                                            <option value={1}>1 Star - Needs Attention</option>
                                        </select>
                                    </div>

                                    <textarea
                                        name="review"
                                        value={formData.review}
                                        onChange={handleInputChange}
                                        placeholder="Detailed feedback..."
                                        rows={5}
                                        required
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium resize-none placeholder:text-gray-600"
                                    ></textarea>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Submit Review'}
                                        <ArrowRight size={20} />
                                    </button>

                                    {submitStatus === 'success' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-center text-sm font-bold mt-4">Review submitted successfully!</motion.p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Trust Footer */}
            <section className="py-24 px-6 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Committed to Excellence.</h3>
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                        We take every piece of feedback seriously. Your success is our mission, and your reviews help us refine our methodology for every student who joins the Chip Anna Putt family.
                    </p>
                </div>
            </section>
        </main>
    )
}
