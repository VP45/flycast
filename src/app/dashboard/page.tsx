'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import DashBoardBackgroundImage from '../../public/dashboard.mp4'
type Props = {}

const Dashboard = (props: Props) => {
    const { data: session } = useSession();
    return (
        <div 
            className="w-full min-h-screen flex items-center justify-center px-5 py-5"
        >
            <div
                className="rounded-lg shadow-xl bg-gray-900 text-white"
                style={{ width: 450 }}
            >
                <div className="border-b border-gray-800 px-8 py-3">
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500" />
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300" />
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400" />
                </div>
                <div className="px-8 py-6">
                    <p>
                        <em className="text-blue-400">const</em>{" "}
                        <span className="text-green-400">aboutMe</span>{" "}
                        <span className="text-pink-500">=</span>{" "}
                        <em className="text-blue-400">function</em>() {"{"}
                    </p>
                    <p>
                        &nbsp;&nbsp;<span className="text-pink-500">return</span> {"{"}
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;name:{" "}
                        <span className="text-yellow-300"> &apos;{session?.user?.name} &apos;</span>,
                    </p>
                    <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;position:{" "}
                        <span className="text-yellow-300"> &apos;{session?.user?.email} &apos;</span>,
                    </p>
                    {
                        session?.user?.image && (
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;website:{" "}
                                <span className="text-yellow-300">
                                    &apos;
                                    <a
                                        href={session?.user?.image}
                                        target="_blank"
                                        className="text-yellow-300 hover:underline focus:border-none"
                                    >
                                        {session?.user?.image}
                                    </a>
                                    &apos;
                                </span>
                                ,
                            </p>
                        )
                    }
                    <p>&nbsp;&nbsp;{"}"}</p>
                    <p>{"}"}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard