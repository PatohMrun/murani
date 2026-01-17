'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary text-gray-100 font-poppins relative overflow-hidden">
            {/* Background blobs/gradients */}
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
                className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full blur-[100px]"
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
                className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-purple-600/20 rounded-full blur-[100px]"
            />

            <div className="z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-[120px] md:text-[200px] font-bold leading-none font-oswald bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-2xl md:text-4xl font-semibold mb-4"
                >
                    Out of Focus
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-gray-400 mb-8 max-w-md mx-auto"
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
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-blue-500/25"
                    >
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
