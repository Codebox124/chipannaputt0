'use client'

import React, { useEffect, useState } from 'react'
import { Mail, Phone, Calendar, Users, CheckCircle, AlertCircle, ArrowRight, Play, Star, Award } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'

export default function OnlineLessonsPage() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        lessonType: 'one-on-one',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
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
                    type: 'lessons',
                    ...formData
                })
            })

            if (!response.ok) throw new Error('Failed to send request')

            setSubmitStatus('success')
            setIsSubmitting(false)
            setFormData({ name: '', email: '', phone: '', lessonType: '', message: '' })

            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error) {
            setSubmitStatus('error')
            setIsSubmitting(false)
            setErrorMessage('Failed to send request. Please try again.')
            console.error('Lessons form error:', error)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-full flex items-center justify-center overflow-hidden py-40">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop"
                        alt="Golf course green"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-green-600/90 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                            Expert Coaching Worldwide
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                            Master Your Game <br />From Anywhere
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-medium">
                            Premium online instruction tailored to your swing, schedule, and goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#booking" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95">
                                Book a Lesson
                            </a>
                            <a href="#offer" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all">
                                Explore Programs
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Offerings Grid */}
            <section id="offer" className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">
                                Elevated Instruction.
                            </h2>
                            <p className="text-lg text-gray-600">
                                Whether you're a beginner or a low-handicap player, our programs focus on the fundamental physics of a great swing.
                            </p>
                        </div>
                        <div className="hidden md:block h-px flex-1 bg-gray-200 mx-12 mb-8" />
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {/* One-on-One */}
                        <motion.div variants={itemVariants} className="group p-1">
                            <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <Users size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">One-on-One Coaching</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Real-time sessions focusing on your specific needs. Live video analysis and immediate correction.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3" />
                                        Private Video Link
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3" />
                                        Custom Practice Drills
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Swing Analysis */}
                        <motion.div variants={itemVariants} className="group p-1">
                            <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Play size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">Video Analysis</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Submit your swing and receive a frame-by-frame breakdown with voiceover annotation and drills.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3" />
                                        48-Hour Turnaround
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3" />
                                        Dual-Angle Review
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Group */}
                        <motion.div variants={itemVariants} className="group p-1">
                            <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                    <Award size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">Elite Workshops</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Topic-specific group webinars. High-level strategy and technical fundamentals with live Q&A.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3" />
                                        Limited to 5 Students
                                    </li>
                                    <li className="flex items-center text-sm font-medium text-gray-700">
                                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3" />
                                        Recorded Sessions
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Calendly Integration */}
            <section id="booking" className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                            Select Your Session
                        </h2>
                        <p className="text-gray-600 font-medium">
                            Browse available times and lock in your session instantly.
                        </p>
                    </div>

                    <div className="bg-white rounded-4xl border-4 border-gray-900 overflow-hidden shadow-2xl">
                        <iframe
                            src="https://calendly.com/chipannaputt8/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                            width="100%"
                            height="600"
                            frameBorder="0"
                            className="bg-white"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Topics - High Concept */}
            <section className="py-24 px-6 bg-gray-950 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-green-900/10 blur-[120px]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                                Precision meets <br />
                                <span className="text-green-500">performance.</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                                We break down the golf swing into digestible modules, focusing on physics and muscle memory rather than just "tips."
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">PGA Basics</h4>
                                        <p className="text-gray-500">Perfecting posture, grip, and alignment—the DNA of every pro swing.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Short Game Mastery</h4>
                                        <p className="text-gray-500">Focusing on putting, chipping, and pitching with meticulous distance control.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Distance Optimization</h4>
                                        <p className="text-gray-500">Techniques to increase ball speed and accuracy through better rotation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-4/5 rounded-[3rem] overflow-hidden border border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="w-full h-full object-cover"
                                    alt="Golfer swing"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 bg-green-600 p-8 rounded-4xl shadow-2xl">
                                <p className="text-3xl font-black italic tracking-tighter mb-1">PRO TIP</p>
                                <p className="text-green-50 font-medium">The ball WILL go in the hole!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Contact */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter text-center">
                            Questions? Let's connect.
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto mt-12">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-green-600 transition-all font-medium"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-green-600 transition-all font-medium"
                                />
                            </div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us about your golf goals..."
                                rows={4}
                                className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-green-600 transition-all font-medium resize-none"
                            ></textarea>

                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-green-50 text-green-700 rounded-2xl text-center font-bold">
                                        Inquiry Sent Successfully!
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gray-900 text-white font-bold py-5 px-6 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? 'Processing...' : 'Send Inquiry'}
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <div className="mt-16 pt-12 border-t border-gray-200 flex flex-col md:flex-row gap-10 justify-center items-center">
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Speak with us</p>
                                <a href="tel:608-530-8582" className="text-xl font-black text-gray-900 hover:text-green-600 transition-colors">608-530-8582</a>
                            </div>
                            <div className="w-2 h-2 bg-gray-200 rounded-full hidden md:block" />
                            <div className="text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">General inquiries</p>
                                <a href="mailto:chipannaputt8@gmail.com" className="text-xl font-black text-gray-900 hover:text-green-600 transition-colors">chipannaputt8@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
