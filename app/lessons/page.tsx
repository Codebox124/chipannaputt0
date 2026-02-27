'use client'

import React, { useState } from 'react'
import { Mail, Phone, Calendar, Users, CheckCircle } from 'lucide-react'

export default function OnlineLessonsPage() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send this to your backend
        console.log('Lesson inquiry submitted:', email)
        setIsSubmitted(true)
        setTimeout(() => {
            setEmail('')
            setIsSubmitted(false)
        }, 3000)
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Online Golf Lessons
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100 mb-8">
                        Learn from a professional golf instructor from the comfort of your home
                    </p>
                    <p className="text-lg text-green-100 max-w-2xl mx-auto">
                        Get personalized coaching on swing technique, short game, putting, chipping, and overall golf fundamentals with Don Sheppard
                    </p>
                </div>
            </section>

            {/* Lessons Overview */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        What We Offer
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* One-on-One Coaching */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <Users className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                One-on-One Coaching
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Personalized lessons tailored to your skill level and goals. Real-time feedback on your swing with video analysis capabilities.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Custom lesson plans</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Progress tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Flexible scheduling</span>
                                </li>
                            </ul>
                        </div>

                        {/* Swing Analysis */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <Calendar className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Swing Analysis
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Submit your swing videos for professional analysis and detailed feedback on your form and technique.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Video feedback</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Detailed breakdown</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Improvement tips</span>
                                </li>
                            </ul>
                        </div>

                        {/* Group Sessions */}
                        <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                            <Users className="w-12 h-12 text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">
                                Group Sessions
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Learn with other golf enthusiasts in interactive group lessons covering various aspects of the game.
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Community learning</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Lower cost option</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Regular schedules</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Topics Covered */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Topics We Cover
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                Core Fundamentals
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>PGA Basics:</strong> Posture, Grip, and Alignment</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Ball Position:</strong> Correct placement for different clubs</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Swing Mechanics:</strong> Tempo and consistency</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Muscle Control:</strong> Who's controlling the club?</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                Short Game Mastery
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Putting:</strong> Green reading and stroke technique</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Chipping:</strong> Precision and distance control</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Pitching:</strong> Distance and trajectory</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700"><strong>Mental Game:</strong> Confidence and focus</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action - Join Section */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-2xl p-12">
                        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
                            Ready to Improve Your Game?
                        </h2>

                        <p className="text-center text-gray-700 mb-12 text-lg">
                            Get started with your first online lesson today. Don Sheppard will work with you to develop a personalized improvement plan.
                        </p>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                            >
                                {isSubmitted ? '✓ Message Sent!' : 'Request a Lesson'}
                            </button>
                        </form>

                        {/* Direct Contact Info */}
                        <div className="mt-12 pt-12 border-t-2 border-gray-200">
                            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                                Or Contact Us Directly
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="text-center">
                                    <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    <p className="text-gray-700 mb-2">Business Phone</p>
                                    <a
                                        href="tel:608-530-8582"
                                        className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
                                    >
                                        608-530-8582
                                    </a>
                                </div>

                                <div className="text-center">
                                    <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                    <p className="text-gray-700 mb-2">Personal Contact</p>
                                    <a
                                        href="tel:608-359-1581"
                                        className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
                                    >
                                        608-359-1581
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust and Experience Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg p-12 shadow-lg">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">
                            Why Choose Chip Anna Putt?
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Instruction</h3>
                                    <p className="text-gray-700">Learn from Don Sheppard, an experienced golf instructor with a passion for helping golfers improve.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Online Format</h3>
                                    <p className="text-gray-700">Take lessons at your convenience with video conferencing. No need to travel to a golf course.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Approach</h3>
                                    <p className="text-gray-700">Each lesson is tailored to your specific needs, skill level, and golf goals.</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Methods</h3>
                                    <p className="text-gray-700">Learn fundamental principles including PGA basics, proper ball positioning, and consistent swing technique.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
