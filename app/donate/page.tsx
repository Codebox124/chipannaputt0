"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, GraduationCap, Users, Video, ShieldCheck } from 'lucide-react'

const DonatePage = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <Heart size={16} /> Support Our Mission
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Invest in the Future of Golf
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Your contributions help us maintain excellence in instruction, facilities, and content production. Join us in supporting our community.
                    </p>
                </motion.div>

                {/* Impact Info Sections */}
                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-start gap-6"
                    >
                        <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 underline decoration-blue-200 underline-offset-4">Scholarship Fund</h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Dedicated resources helping young talent access professional coaching and equipment that might otherwise be out of reach. We believe golf should be accessible to everyone who shows passion and dedication.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-6"
                    >
                        <div className="shrink-0 w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 border border-green-100">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 underline decoration-green-200 underline-offset-4">Greenskeepers</h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Supporting the specialized team that maintains our practice facilities and greens to championship standards. Their expert care ensures every student learns on surfaces that mimic professional conditions.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-6"
                    >
                        <div className="shrink-0 w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 border border-orange-100">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 underline decoration-orange-200 underline-offset-4">Instructors</h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Providing ongoing certification, training data, and modern technical equipment for our professional coaches. Excellence in teaching requires constant investment in the tools and knowledge of our instructors.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-6"
                    >
                        <div className="shrink-0 w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 border border-purple-100">
                            <Video size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 underline decoration-purple-200 underline-offset-4">Editing & Content</h2>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                Powering the production of our digital lessons and high-quality video analysis for remote learners. Your support helps us bridge the gap between in-person clinics and home-based practice worldwide.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#059c17] rounded-3xl p-10 md:p-16 text-center text-white shadow-xl shadow-green-100"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Make a Contribution</h2>
                    <p className="text-green-50 text-xl mb-10 max-w-xl mx-auto">
                        Your support directly impacts our community. Thank you for being part of the Chip Anna Putt family.
                    </p>

                    <button className="bg-white text-[#059c17] font-bold px-10 py-5 rounded-2xl hover:bg-green-50 active:scale-95 transition-all shadow-lg text-lg">
                        Support Our Fund
                    </button>

                    <div className="mt-8 flex items-center justify-center gap-2 text-green-100 text-sm">
                        <ShieldCheck size={16} /> Secure Donation Portal
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default DonatePage
