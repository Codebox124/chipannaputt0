import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, PlayCircle, Lock } from 'lucide-react'

export default async function ExclusivePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/join')
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-36 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="md:flex block justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            Members Hub
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Welcome back, {user.email}
                        </p>
                    </div>

                    <form action="/auth/signout" method="post">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium mt-4 md:mt-0">
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </form>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder Video Map */}
                    {[
                        { title: 'The Perfect Grip', duration: '12:45', desc: 'Master the foundation of every great golf swing.' },
                        { title: 'Fixing Your Slice', duration: '18:20', desc: 'Identify and correct the most common mistake for amateurs.' },
                        { title: 'Putting Masterclass', duration: '24:10', desc: 'Drop strokes on the green with these elite putting drills.' },
                        { title: 'Chipping Around the Green', duration: '15:30', desc: 'Save par consistently with advanced chipping mechanics.' },
                        { title: 'Driver Distance Secrets', duration: '21:05', desc: 'Unlock hidden power and hit it past your friends.' },
                        { title: 'Course Management', duration: '30:00', desc: 'Think like a pro and navigate difficult holes.' }
                    ].map((video, idx) => (
                        <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="aspect-video bg-gray-900 relative group cursor-pointer flex items-center justify-center">
                                {/* Placeholder Thumbnail */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                                <Lock className="absolute top-4 right-4 text-white/50 z-20" size={24} />
                                <PlayCircle className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-20" size={64} />
                                <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium z-20">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{video.title}</h3>
                                <p className="text-gray-600 text-sm">{video.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
