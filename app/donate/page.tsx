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

                {/* Impact Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                            <GraduationCap size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Fund</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Helping young talent access professional coaching and resources that might otherwise be out of reach.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                            <Users size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Greenskeepers</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Supporting the dedicated team that keeps our practice areas and courses in championship condition.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                            <Users size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructors</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Providing ongoing training and equipment for our professional coaches to ensure top-tier golf instruction.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                    >
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                            <Video size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Editing & Content</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Powering the production of our digital lessons and high-quality video content for remote learners.
                        </p>
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
