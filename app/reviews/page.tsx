'use client'

import React, { useState } from 'react'
import { Star, Upload, MessageCircle, Video } from 'lucide-react'

interface Review {
    id: string
    name: string
    rating: number
    text: string
    date: string
    type: 'text' | 'video'
}

const SAMPLE_REVIEWS: Review[] = [
    {
        id: '1',
        name: 'John Smith',
        rating: 5,
        text: 'Don is an excellent instructor! His clear explanations of the fundamentals really helped improve my swing. Highly recommend!',
        date: '2 weeks ago',
        type: 'text'
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        rating: 5,
        text: 'The online lessons are convenient and very effective. My putting has improved dramatically. Great value for the quality of instruction.',
        date: '1 month ago',
        type: 'text'
    },
    {
        id: '3',
        name: 'Mike Davis',
        rating: 5,
        text: 'Fantastic coaching on the short game. Don really knows how to break down complex techniques into simple, actionable steps.',
        date: '3 weeks ago',
        type: 'text'
    },
    {
        id: '4',
        name: 'Emily Wilson',
        rating: 5,
        text: 'Finally someone who explained PGA fundamentals in a way that made sense to me. My confidence on the course has never been better!',
        date: '1 week ago',
        type: 'text'
    },
]

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS)
    const [name, setName] = useState('')
    const [rating, setRating] = useState(5)
    const [reviewText, setReviewText] = useState('')
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState<'text' | 'video'>('text')
    const [submitMessage, setSubmitMessage] = useState('')

    const handleTextReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !reviewText.trim()) {
            setSubmitMessage('Please fill in all fields')
            return
        }

        setIsSubmitting(true)

        // Simulate submission delay
        setTimeout(() => {
            const newReview: Review = {
                id: Date.now().toString(),
                name,
                rating,
                text: reviewText,
                date: 'just now',
                type: 'text'
            }

            setReviews([newReview, ...reviews])
            setName('')
            setReviewText('')
            setRating(5)
            setSubmitMessage('Your review has been posted successfully!')
            setIsSubmitting(false)

            setTimeout(() => setSubmitMessage(''), 3000)
        }, 500)
    }

    const handleVideoReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !videoFile) {
            setSubmitMessage('Please fill in your name and select a video')
            return
        }

        setIsSubmitting(true)

        // Simulate submission delay
        setTimeout(() => {
            const newReview: Review = {
                id: Date.now().toString(),
                name,
                rating,
                text: `Video review from ${name}`,
                date: 'just now',
                type: 'video'
            }

            setReviews([newReview, ...reviews])
            setName('')
            setVideoFile(null)
            setRating(5)
            setSubmitMessage('Your video review has been submitted! Thank you!')
            setIsSubmitting(false)

            setTimeout(() => setSubmitMessage(''), 3000)
        }, 500)
    }

    const renderStars = (count: number) => {
        return (
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                ))}
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Student Reviews
                    </h1>
                    <p className="text-xl md:text-2xl text-green-100">
                        See what our students have to say about their experience with Chip Anna Putt
                    </p>
                </div>
            </section>

            {/* Reviews and Submit Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Reviews List */}
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-bold mb-8 text-gray-900">
                                Student Testimonials
                            </h2>

                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                                                <p className="text-sm text-gray-500">{review.date}</p>
                                            </div>
                                            {review.type === 'video' && (
                                                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                                                    <Video size={16} className="text-green-600" />
                                                    <span className="text-sm font-semibold text-green-600">Video Review</span>
                                                </div>
                                            )}
                                        </div>

                                        {renderStars(review.rating)}

                                        <p className="text-gray-700 mt-4 leading-relaxed">
                                            {review.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Review Section */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-6">
                                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                                    Share Your Review
                                </h3>

                                {submitMessage && (
                                    <div className={`p-4 rounded-lg mb-6 text-sm font-semibold ${
                                        submitMessage.includes('successfully') || submitMessage.includes('submitted')
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {submitMessage}
                                    </div>
                                )}

                                {/* Tab Selection */}
                                <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('text')}
                                        className={`pb-3 px-4 font-semibold transition-colors ${
                                            activeTab === 'text'
                                                ? 'border-b-2 border-green-600 text-green-600'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <MessageCircle size={18} className="inline mr-2" />
                                        Text
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('video')}
                                        className={`pb-3 px-4 font-semibold transition-colors ${
                                            activeTab === 'video'
                                                ? 'border-b-2 border-green-600 text-green-600'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <Video size={18} className="inline mr-2" />
                                        Video
                                    </button>
                                </div>

                                {/* Text Review Form */}
                                {activeTab === 'text' && (
                                    <form onSubmit={handleTextReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Rating
                                            </label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            size={24}
                                                            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Review
                                            </label>
                                            <textarea
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                placeholder="Share your experience with Chip Anna Putt..."
                                                rows={5}
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
                                        >
                                            {isSubmitting ? 'Posting...' : 'Post Review'}
                                        </button>
                                    </form>
                                )}

                                {/* Video Review Form */}
                                {activeTab === 'video' && (
                                    <form onSubmit={handleVideoReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Rating
                                            </label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <Star
                                                            size={24}
                                                            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Upload Video
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-600 transition-colors">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                                    className="hidden"
                                                    id="video-upload"
                                                />
                                                <label htmlFor="video-upload" className="cursor-pointer">
                                                    <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                                                    <p className="text-sm font-semibold text-gray-700">
                                                        {videoFile ? videoFile.name : 'Click to upload video'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        MP4, MOV, etc. Max 100MB
                                                    </p>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors"
                                        >
                                            {isSubmitting ? 'Uploading...' : 'Submit Video Review'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-green-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Become a Chip Anna Putt Student
                    </h2>
                    <p className="text-xl text-green-100 mb-8">
                        Join our community of golfers improving their game with personalized online lessons
                    </p>
                    <a
                        href="/lessons"
                        className="inline-block bg-white text-green-700 font-bold py-4 px-8 rounded-lg hover:bg-green-50 transition-colors text-lg"
                    >
                        Learn More About Lessons
                    </a>
                </div>
            </section>
        </main>
    )
}
