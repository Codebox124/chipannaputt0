'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'
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
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
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
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            const templateParams = {
                to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'chipannaputt8@gmail.com',
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_htp9egg',
                process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE || 'template_contact',
                templateParams
            )

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })

            setTimeout(() => {
                setSubmitStatus('idle')
            }, 5000)
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
            console.error('[v0] Contact form error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-green-700 to-green-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100">
                        Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-4xl font-bold mb-12 text-gray-900">
                                Contact Information
                            </h2>

                            <div className="space-y-8">
                                {/* Address */}
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-8 h-8 text-green-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                                        <p className="text-gray-700">
                                            Chip Anna Putt<br />
                                            In the care of Don Sheppard<br />
                                            1013 Bingham Ave.<br />
                                            Janesville, WI 53546
                                        </p>
                                    </div>
                                </div>

                                {/* Business Phone */}
                                <div className="flex items-start gap-4">
                                    <Phone className="w-8 h-8 text-green-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Business Phone</h3>
                                        <a
                                            href="tel:608-530-8582"
                                            className="text-gray-700 hover:text-green-600 transition-colors text-lg font-semibold"
                                        >
                                            608-530-8582
                                        </a>
                                    </div>
                                </div>

                                {/* Personal Phone */}
                                <div className="flex items-start gap-4">
                                    <Phone className="w-8 h-8 text-green-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Phone</h3>
                                        <a
                                            href="tel:608-359-1581"
                                            className="text-gray-700 hover:text-green-600 transition-colors text-lg font-semibold"
                                        >
                                            608-359-1581
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <Mail className="w-8 h-8 text-green-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                        <a
                                            href="mailto:chipannaputt8@gmail.com"
                                            className="text-gray-700 hover:text-green-600 transition-colors text-lg font-semibold"
                                        >
                                            chipannaputt8@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-2xl p-8">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
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
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="(555) 000-0000"
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="How can we help?"
                                        required
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Your message here..."
                                        rows={6}
                                        required
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="flex items-center gap-3 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                                        <p className="text-red-700">{errorMessage}</p>
                                    </div>
                                )}

                                {submitStatus === 'success' && (
                                    <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                                        <p className="text-green-700">Thank you! We&apos;ll be in touch soon.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
