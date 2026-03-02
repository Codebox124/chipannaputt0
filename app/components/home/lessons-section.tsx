'use client'

import { useEffect, useState } from 'react'
import { Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

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
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
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
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            const templateParams = {
                to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'chipannaputt8@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                lesson_type: formData.lessonType,
                message: formData.message
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_htp9egg',
                process.env.NEXT_PUBLIC_EMAILJS_LESSON_TEMPLATE || 'template_lesson',
                templateParams
            )

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                lessonType: 'one-on-one',
                message: ''
            })

            setTimeout(() => {
                setSubmitStatus('idle')
            }, 5000)
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send inquiry')
            console.error('[v0] Form submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const lessonTypes = [
        {
            icon: Users,
            title: 'One-on-One Coaching',
            description: 'Personalized instruction tailored to your skill level and goals. Get direct feedback and custom lesson plans.'
        },
        {
            icon: Calendar,
            title: 'Group Sessions',
            description: 'Learn with other golfers in a collaborative environment. Great for building confidence and enjoying the learning process.'
        }
    ]

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
                    Online Golf Lessons
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Learn professional golf techniques from the comfort of your home. Personalized coaching for all skill levels.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Lessons Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-900">What We Offer</h3>
                        <div className="space-y-6">
                            {lessonTypes.map((lesson, idx) => {
                                const Icon = lesson.icon
                                return (
                                    <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <Icon className="w-8 h-8 text-green-600 mb-3" />
                                        <h4 className="font-bold text-gray-900 mb-2">{lesson.title}</h4>
                                        <p className="text-gray-700 text-sm leading-relaxed">{lesson.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-bold text-gray-900 mb-2">Topics Covered</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>• PGA Fundamentals & Techniques</li>
                                <li>• Swing Mechanics & Analysis</li>
                                <li>• Short Game & Chipping</li>
                                <li>• Putting Techniques</li>
                                <li>• Course Management</li>
                            </ul>
                        </div>
                        <a href="/lessons" className="inline-block mt-8 text-green-600 font-semibold hover:text-green-700">
                            View full lessons page →
                        </a>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900">Book a Lesson</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="(555) 000-0000"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="lessonType" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Lesson Type
                                </label>
                                <select
                                    id="lessonType"
                                    name="lessonType"
                                    value={formData.lessonType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                >
                                    <option value="one-on-one">One-on-One Coaching</option>
                                    <option value="group">Group Session</option>
                                    <option value="not-sure">Not Sure Yet</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Tell Us About Your Golf Goals
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="What are you looking to improve?"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors resize-none text-sm"
                                ></textarea>
                            </div>

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-400 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{errorMessage}</p>
                                </div>
                            )}

                            {submitStatus === 'success' && (
                                <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-400 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <p className="text-green-700 text-sm">We'll contact you soon to confirm your lesson!</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                {isSubmitting ? 'Submitting...' : 'Request Lesson'}
                            </button>
                        </form>

                        <p className="text-xs text-gray-500 mt-4 text-center">
                            We'll respond within 24 hours to discuss your goals and schedule.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
