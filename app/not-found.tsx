'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TbCameraOff } from "react-icons/tb";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center font-poppins relative overflow-hidden">
            {/* Neutral Background blobs to match Cosmos theme */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -60, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-6"
                >
                    <div className="p-6 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <TbCameraOff className="text-6xl text-gray-400" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                    className="text-8xl md:text-9xl font-bold leading-none font-oswald text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-2"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-2xl md:text-4xl font-semibold mb-4 text-white"
                >
                    Out of Focus
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-gray-400 mb-8 max-w-md mx-auto text-lg"
                >
                    The page you&apos;re looking for seems to have drifted out of the frame. Let&apos;s get you back to the main subject.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
