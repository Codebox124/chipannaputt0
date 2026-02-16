"use client"

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comment: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold text-gray-900 mb-12">Contact</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-4 py-4 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email *"
                                required
                                className="w-full px-4 py-4 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="w-full px-4 py-4 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Comment */}
                    <div>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="Comment"
                            rows={5}
                            className="w-full px-4 py-4 border border-gray-300 bg-white text-gray-700 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}