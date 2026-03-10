'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ContactPage() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    type: 'contact',
                    ...formData
                })
            })

            if (!response.ok) throw new Error('Failed to send message')

            setSubmitStatus('success')
            setIsSubmitting(false)
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

            setTimeout(() => () => {
                setSubmitStatus('idle')
                setIsSubmitting(false)
            }, 5000)
        } catch (error) {
            setSubmitStatus('error')
            setIsSubmitting(false)
            setErrorMessage('Failed to send message. Please try again.')
            console.error('Contact form error:', error)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-max flex items-center justify-center overflow-hidden md:pb-32 pb-20 pt-40">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Chip Annaputt"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-green-600/90 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6"
                    >
                        Connect With Us
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        Let's Talk <br /> <span className="text-green-500">Excellence.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Whether you&apos;re looking for lessons, product support, or community updates, we&apos;re here to help you master your game.
                    </motion.p>
                </div>
            </section>

            {/* Contact Grid Section */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Left: Contact Info */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:col-span-4 space-y-6"
                        >
                            <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                    <Phone size={20} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight">Call Us Directly</h3>
                                <p className="text-gray-400 text-xs mb-4 font-bold uppercase tracking-wider">Mon-Fri, 9am - 5pm EST</p>
                                <div className="space-y-1">
                                    <a href="tel:608-530-8582" className="block text-xl font-bold text-gray-900 hover:text-green-600 transition-colors tracking-tight">608-530-8582</a>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                    <Mail size={20} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight">Email Inquiries</h3>
                                <p className="text-gray-400 text-xs mb-4 font-bold uppercase tracking-wider">Response within 24h</p>
                                <a href="mailto:chipannaputt8@gmail.com" className="block text-lg font-bold text-gray-900 hover:text-green-600 transition-colors break-all tracking-tight">chipannaputt8@gmail.com</a>
                            </motion.div>

                            <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-1 tracking-tight">Headquarters</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                    1013 Bingham Ave.<br />
                                    Janesville, WI 53546
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:col-span-8"
                        >
                            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
                                <div className="max-w-2xl">
                                    <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Send a Message</h2>
                                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                                        Have a question about our classes or products? Fill out the form below and we&apos;ll get back to you personally.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Jane Doe"
                                                    required
                                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="jane@example.com"
                                                    required
                                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="(Optional)"
                                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Subject</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    placeholder="General Inquiry"
                                                    required
                                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Your Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell us how we can help..."
                                                rows={5}
                                                required
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-green-500 focus:bg-white transition-all font-medium resize-none"
                                            ></textarea>
                                        </div>

                                        <AnimatePresence>
                                            {submitStatus === 'success' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold text-center border border-green-100"
                                                >
                                                    Message sent successfully!
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-green-600/20"
                                        >
                                            {isSubmitting ? 'Sending Request...' : 'Send Message'}
                                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Connection */}
            <section className="py-24 px-6 text-center bg-white border-t border-gray-100">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">Follow the Journey.</h2>
                    <p className="text-gray-500 font-medium mb-12">Join our community on social media for daily tips.</p>
                    <div className="flex justify-center gap-6">
                        {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                            <a key={idx} href="#" className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all hover:-translate-y-1">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
