'use client'

import { useState } from 'react'
import { Star, AlertCircle, CheckCircle } from 'lucide-react'

export default function ReviewsPage() {
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
    const [activeTab, setActiveTab] = useState<'reviews' | 'form'>('reviews')

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
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'review',
                    data: formData
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to submit review')
            }

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
                setActiveTab('reviews')
            }, 3000)
        } catch (error) {
            setSubmitStatus('error')
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
            console.error('[v0] Review submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Sample reviews data
    const sampleReviews = [
        {
            id: 1,
            name: 'Michael Johnson',
            rating: 5,
            review: 'Don is an amazing instructor! His method of teaching fundamentals really clicked with me. I\'ve improved my game significantly in just a few weeks.',
            date: '2 weeks ago'
        },
        {
            id: 2,
            name: 'Sarah Williams',
            rating: 5,
            review: 'The personalized approach to coaching is fantastic. Don takes time to understand your goals and creates a lesson plan that works for you. Highly recommended!',
            date: '1 month ago'
        },
        {
            id: 3,
            name: 'James Patterson',
            rating: 5,
            review: 'Finally understanding the proper grip and stance. Don\'s explanations are clear and easy to follow. Can\'t wait for my next lesson!',
            date: '3 weeks ago'
        },
        {
            id: 4,
            name: 'Emily Davis',
            rating: 5,
            review: 'The online format works perfectly for my schedule. Don is professional, knowledgeable, and makes learning fun. Great experience overall!',
            date: '1 week ago'
        },
        {
            id: 5,
            name: 'Robert Taylor',
            rating: 5,
            review: 'After years of struggling with my short game, Don finally showed me what I was doing wrong. This has been life-changing for my golf!',
            date: '10 days ago'
        },
        {
            id: 6,
            name: 'Jessica Martinez',
            rating: 5,
            review: 'Don\'s knowledge of PGA fundamentals is impressive. He explains concepts in a way that makes sense and you can apply immediately on the course.',
            date: '2 weeks ago'
        }
    ]

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Student Reviews
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100">
                        Hear from students who have improved their golf game with Chip Anna Putt
                    </p>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-4 px-6 font-semibold text-lg transition-colors border-b-2 ${
                                activeTab === 'reviews'
                                    ? 'text-green-600 border-green-600'
                                    : 'text-gray-600 border-transparent hover:text-gray-900'
                            }`}
                        >
                            Reviews
                        </button>
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`py-4 px-6 font-semibold text-lg transition-colors border-b-2 ${
                                activeTab === 'form'
                                    ? 'text-green-600 border-green-600'
                                    : 'text-gray-600 border-transparent hover:text-gray-900'
                            }`}
                        >
                            Leave a Review
                        </button>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            {activeTab === 'reviews' && (
                <section className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sampleReviews.map(review => (
                                <div key={review.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed">
                                        {review.review}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Review Form */}
            {activeTab === 'form' && (
                <section className="py-20 px-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow-2xl p-12">
                            <h2 className="text-4xl font-bold mb-2 text-gray-900">
                                Share Your Experience
                            </h2>
                            <p className="text-gray-600 mb-12">
                                Your feedback helps us improve and lets other golfers know about our lessons
                            </p>

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
                                    <label htmlFor="rating" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Rating
                                    </label>
                                    <div className="flex gap-2 items-center">
                                        <select
                                            id="rating"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleInputChange}
                                            className="px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                        >
                                            <option value={5}>5 Stars - Excellent</option>
                                            <option value={4}>4 Stars - Very Good</option>
                                            <option value={3}>3 Stars - Good</option>
                                            <option value={2}>2 Stars - Fair</option>
                                            <option value={1}>1 Star - Poor</option>
                                        </select>
                                        <div className="flex gap-1">
                                            {[...Array(formData.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="review" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Your Review
                                    </label>
                                    <textarea
                                        id="review"
                                        name="review"
                                        value={formData.review}
                                        onChange={handleInputChange}
                                        placeholder="Tell us about your experience with Don and the lessons..."
                                        rows={6}
                                        required
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="videoUrl" className="block text-lg font-semibold text-gray-700 mb-2">
                                        Video Review (Optional)
                                    </label>
                                    <input
                                        id="videoUrl"
                                        type="url"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleInputChange}
                                        placeholder="https://youtu.be/... or link to your video"
                                        className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Upload your video to YouTube or another platform and paste the link here
                                    </p>
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="flex items-center gap-3 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                        <p className="text-red-700">{errorMessage}</p>
                                    </div>
                                )}

                                {submitStatus === 'success' && (
                                    <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <p className="text-green-700">Thank you for your review! We appreciate your feedback.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            )}

            {/* Trust Message */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-700 text-lg">
                        We value honest feedback and use student reviews to continually improve our lessons and coaching methods.
                    </p>
                </div>
            </section>
        </main>
    )
}
