'use client'

import { useEffect, useState } from 'react'
import { Calendar, Users, AlertCircle, CheckCircle, ArrowRight, Play } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

export default function LessonsSection() {
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

    const lessons = [
        {
            icon: Users,
            title: 'Private Coaching',
            tag: 'Most Popular',
            description: 'Intensive one-on-one sessions tailored to your mechanical needs and course strategy.'
        },
        {
            icon: Play,
            title: 'Video Analysis',
            tag: 'Remote',
            description: 'Digital feedback. Submit your swing and get a professional breakdown within 48 hours.'
        }
    ]

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-green-600 font-bold uppercase tracking-widest text-xs mb-4 block">Instruction</span>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
                                Elevate Your <br />Performance.
                            </h2>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                                Our online curriculum bridges the gap between traditional lessons and modern convenience. Master the physics of a pro swing from your own practice facility.
                            </p>

                            <div className="space-y-6 mb-10">
                                {lessons.map((item, idx) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={idx} className="group flex items-start gap-6 p-6 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-black text-gray-900">{item.title}</h4>
                                                    <span className="px-2 py-0.5 bg-gray-200 rounded text-[10px] uppercase font-bold text-gray-500">{item.tag}</span>
                                                </div>
                                                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <a href="/lessons" className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-green-600 transition-colors group">
                                Explore full curriculum
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
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">Book a Live Lesson.</h3>
                            <p className="text-gray-400 mb-8 text-sm">Request your first session and start your journey.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium placeholder:text-gray-600"
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your golf goals..."
                                    rows={3}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-green-500 transition-all font-medium resize-none placeholder:text-gray-600"
                                ></textarea>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 mt-4"
                                >
                                    {isSubmitting ? 'Sending Request...' : 'Get Started'}
                                    <ArrowRight size={20} />
                                </button>

                                {submitStatus === 'success' && (
                                    <p className="text-green-400 text-center text-xs font-bold mt-4">We&apos;ll reach out within 24 hours.</p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
