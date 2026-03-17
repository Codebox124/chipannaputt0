'use client'

import React, { useState } from 'react'
import { Play } from 'lucide-react'

interface VideoCardProps {
    title: string
    id: string
}

export default function VideoCard({ title, id }: VideoCardProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all group">
            <div className="aspect-video bg-black relative w-full overflow-hidden">
                {!isLoaded ? (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-gray-900 group-hover:bg-gray-800 transition-colors"
                        onClick={() => setIsLoaded(true)}
                    >
                        {/* 
                            Note: We don't have a thumbnail URL for Google Drive files easily available here.
                            So we show a "Play" overlay on a dark background.
                        */}
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform border border-white/20">
                            <Play className="text-white fill-white ml-1" size={32} />
                        </div>
                        <span className="text-white/60 text-sm mt-4 font-medium uppercase tracking-wider group-hover:text-white transition-colors">
                            Click to Play
                        </span>
                    </div>
                ) : (
                    <iframe
                        src={`https://drive.google.com/file/d/${id}/preview`}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        loading="lazy"
                        className="border-0 absolute inset-0"
                    />
                )}
            </div>
            <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">{title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded uppercase tracking-wider">
                        Exclusive
                    </span>
                </div>
            </div>
        </div>
    )
}
