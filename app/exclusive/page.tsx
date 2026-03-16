import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'

const swingVideos = [
    { title: "Swing Curriculum Part 1", id: "1yj16seyu5IEIiMnEwhlZdIL5MlFM_5cH" },
    { title: "Swing Curriculum Part 2", id: "13i_mBtCMNdQkiN-6GmXuVaf4rkvJAPS2" },
    { title: "Swing Curriculum Part 3", id: "1LyiUHPZyzis9gSArdDTs_KN3Pc09cAkv" },
    { title: "Swing Curriculum Part 4", id: "1y7e83f471rRToaDhmCih7s7EwzK5zQO8" },
    { title: "Swing Curriculum Part 5", id: "1oq4N-tFThi1nvfF76NYAoo9x_Lx_pGlN" },
    { title: "Swing Curriculum Part 6", id: "1Qkgul6J5WqLtODPSRwnxWRRKst-rqsEF" },
    { title: "Swing Curriculum Part 7", id: "1FTOACYOPB5TuQHRQ8MXYV6yLWTEN82y-" },
    { title: "Swing Curriculum Part 8", id: "1q0F_iKRL_sFj_6FLIeBQzK_0Dfh_iwwi" },
    { title: "Swing Curriculum Part 9", id: "17P1-KWse7Aqs089ANRwLn_Nz5m4HVnrx" },
    { title: "Swing Curriculum Part 10", id: "15KmNTwMZsGtdhcyxROR3fFnzGJQxbgzQ" },
    { title: "Swing Curriculum Part 11", id: "1je74o_rzQEPsxdMd9ZSAUkPPVvug_Gyi" },
    { title: "Swing Curriculum Part 12", id: "1mOCYeXyD4rKje4edSKl46yqjouhapKxM" },
    { title: "Swing Curriculum Part 13", id: "13RfOh_8C_ZR-hlomwkCFg6Ogbjp6Dfhs" },
    { title: "Swing Curriculum Part 14", id: "1IV2KWC_IaPB2YDrf7L6QCCYKkizKk-pF" },
    { title: "Swing Curriculum Part 15", id: "1f5jFMHVebr_oa7xNzSW5hNm7EFDlGolZ" },
    { title: "Swing Curriculum Part 16", id: "1h-WjrAIL6fmp37KS3GMjIwTYTalWAHAx" },
    { title: "Swing Curriculum Part 17", id: "1cEAICqPZRFZ5OxcUq598-Ycg0ANbQtJO" },
    { title: "Swing Curriculum Part 18", id: "1Y-s879ll-bNXD09iCNJGkvIJv2WgQl30" },
    { title: "Swing Curriculum Part 19", id: "1USES2ZiIhKP099DJM2UKbrUzA_bdzMi5" },
    { title: "Swing Curriculum Part 20", id: "1oRnKuYNU6qLWSHAM92NUD8IoFYGAotbN" },
]

const puttingVideos = [
    { title: "Direction", id: "1luzGtjqBLccLoAik7Xh39Q1wtwtMpCTY" },
    { title: "Grip", id: "1q6njKkFYLG7IzQswKSQWzRE1SVo345lL" },
    { title: "Pushes and Pulls", id: "1xFYLzCot4zuo0LuE1lHl7X-zBgiMFuBj" },
    { title: "Reading Greens", id: "1n9Hk8Wrl5uy7n2axfUP56R0rZnhjLR8T" },
    { title: "Speed 1", id: "1LdKi5js1fM4SCNCQ8JoEQfJ_hilfUaAb" },
    { title: "Speed 2", id: "17SXAaPt9cAgXHSd1BtzHlp2YLnA_5FvS" },
    { title: "Stance", id: "1qqh4IppACMuWBF8JEhjMioS5F3I4l3-y" },
]

export default async function ExclusivePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/join')
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-36 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
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
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium mt-4 md:mt-0 shadow-sm hover:shadow">
                            <LogOut size={18} />
                            Log Out
                        </button>
                    </form>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Putting Masterclass</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {puttingVideos.map((video, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="aspect-video bg-gray-100 relative w-full overflow-hidden">
                                    <iframe 
                                        src={`https://drive.google.com/file/d/${video.id}/preview`} 
                                        width="100%" 
                                        height="100%" 
                                        allow="autoplay" 
                                        className="border-0 absolute inset-0"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900">{video.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Swing Curriculum</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {swingVideos.map((video, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="aspect-video bg-gray-100 relative w-full overflow-hidden">
                                    <iframe 
                                        src={`https://drive.google.com/file/d/${video.id}/preview`} 
                                        width="100%" 
                                        height="100%" 
                                        allow="autoplay" 
                                        className="border-0 absolute inset-0"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900">{video.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
