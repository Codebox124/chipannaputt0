'use client'

import { useEffect, useState } from 'react'
import { Star, AlertCircle, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function ReviewsSection() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        review: '',
        videoUrl: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
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
                rating: formData.rating,
                review: formData.review,
                video_url: formData.videoUrl || 'No video provided'
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_htp9egg',
                process.env.NEXT_PUBLIC_EMAILJS_REVIEW_TEMPLATE || 'template_e43jcva',
                templateParams
            )

            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                rating: 5,
                review: '',
                videoUrl: ''
            })

            setTimeout(() => {
                setSubmitStatus('idle')
            }, 3000)
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send review')
            console.error('Review submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const sampleReviews = [
        {
            id: 1,
            name: 'Michael Johnson',
            rating: 5,
            review: 'Don is an amazing instructor! His method of teaching fundamentals really clicked with me.'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            rating: 5,
            review: 'The personalized approach to coaching is fantastic. Don takes time to understand your goals.'
        },
        {
            id: 3,
            name: 'James Patterson',
            rating: 5,
            review: 'Finally understanding the proper grip and stance. Don\'s explanations are clear and easy to follow.'
        },
    ]

    return (
        <section className="py-20 px-6 bg-linear-to-b from-white to-green-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
                    Student Reviews & Testimonials
                </h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    See what our students have to say about their experience with Chip Anna Putt
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Reviews Grid */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-900">What Our Students Say</h3>
                        <div className="space-y-6">
                            {sampleReviews.map(review => (
                                <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{review.name}</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
                                </div>
                            ))}
                        </div>
                        <a href="/reviews" className="inline-block mt-8 text-green-600 font-semibold hover:text-green-700">
                            View all reviews →
                        </a>
                    </div>

                    {/* Review Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-900">Leave a Review</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Name
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
                                    Email
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
                                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Rating
                                </label>
                                <select
                                    id="rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                >
                                    <option value={5}>5 Stars - Excellent</option>
                                    <option value={4}>4 Stars - Very Good</option>
                                    <option value={3}>3 Stars - Good</option>
                                    <option value={2}>2 Stars - Fair</option>
                                    <option value={1}>1 Star - Poor</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Your Review
                                </label>
                                <textarea
                                    id="review"
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about your experience..."
                                    rows={4}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors resize-none text-sm"
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-700 mb-1">
                                    Video (Optional)
                                </label>
                                <input
                                    id="videoUrl"
                                    type="url"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleInputChange}
                                    placeholder="Link to your video"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors text-sm"
                                />
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
                                    <p className="text-green-700 text-sm">Thank you for your review!</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
