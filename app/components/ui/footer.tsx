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

                {/* Email Subscription Section */}
                <div className="text-center mb-16 pb-12 border-b border-white/30">
                    <h3 className="text-2xl font-semibold mb-6">Subscribe to our emails</h3>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className="relative flex items-center border border-white/30 rounded-sm overflow-hidden bg-transparent">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/70 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 hover:bg-white/10 transition-colors"
                                aria-label="Subscribe"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </form>
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
