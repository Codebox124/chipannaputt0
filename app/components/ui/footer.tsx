"use client"

import React, { useState } from 'react'

const Footer = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Email submitted:", email);
    };

    const [email, setEmail] = useState("");

    return (
        <footer className="bg-[#059c17] text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Must Do's and Don'ts Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Must Do Column */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">Must Do:</h2>
                        <ul className="space-y-6">
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">1. Must do PGA (Posture, Grip, and Alignment).</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">2. Must do correct ball position.</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">3. Must trust your swing (consistent speed plus consistent tempo).</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">4. Must ask yourself, "Who's controlling the dance?" (Which muscle is controlling the club?)</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">5. Must trust your short game.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Don'ts Column */}
                    <div>
                        <h2 className="text-3xl font-bold mb-8">The 3 Don'ts</h2>
                        <ul className="space-y-6">
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">1. Don't over swing.</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">2. Don't over think it.</span>
                            </li>
                            <li className="text-lg leading-relaxed">
                                <span className="font-semibold">3. Don't decelerate (don't quit in your swing, no hesitation).</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="text-center mb-16 pb-12 border-b border-white/30">
                    <h3 className="text-2xl font-semibold mb-6">Quick Links</h3>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        <a href="/reviews" className="hover:text-white/80 transition-colors text-lg">
                            Student Reviews
                        </a>
                        <a href="/contact" className="hover:text-white/80 transition-colors text-lg">
                            Contact Us
                        </a>
                        <a href="/lessons" className="hover:text-white/80 transition-colors text-lg">
                            Lessons
                        </a>
                        <a href="/shop" className="hover:text-white/80 transition-colors text-lg">
                            Shop
                        </a>
                        <a href="/join" className="hover:text-white/80 transition-colors text-lg font-bold">
                            Join Event
                        </a>
                        <a href="/donate" className="hover:text-white/80 transition-colors text-lg font-bold">
                            Donate
                        </a>
                    </div>
                </div>

                {/* Company Contact Information */}
                <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-8">Contact Us</h3>
                    <div className="space-y-4 text-lg">
                        <div>
                            <p className="font-semibold text-xl mb-2">Chip Anna Putt</p>
                            <p>in the care of Don Sheppard</p>
                            <p className="mt-4">1013 Bingham Ave.</p>
                            <p>Janesville, WI 53546</p>
                        </div>
                        <div className="pt-4 space-y-2">
                            <div>
                                <p className="text-white/80">Business Phone</p>
                                <a href="tel:608-530-8582" className="hover:text-white/70 transition-colors">
                                    608-530-8582
                                </a>
                            </div>
                            <div>
                                <p className="text-white/80">Don's Personal Phone</p>
                                <a href="tel:608-359-1581" className="hover:text-white/70 transition-colors">
                                    608-359-1581
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
