'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CosmosBackground = () => {
    // Generate static stars to avoid hydration mismatch
    const [stars, setStars] = useState<{ top: string; left: string; size: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        const starCount = 50;
        const newStars = Array.from({ length: starCount }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gray-50 dark:bg-[#0a1014] transition-colors duration-500">
            {/* Deep Space Gradients - Theme Aware */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-slate-900/50 dark:via-[#0a1014] dark:to-[#0a1014]"></div>

            {/* Subtle Nebula Layers - Theme Aware */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-40"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 55,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-300/20 dark:bg-indigo-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-40"
            />

            {/* Twinkling Stars - Dark in Light Mode, White in Dark Mode */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-900/30 dark:bg-white rounded-full opacity-70"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Shooting Star effect (Optional subtle addition) */}
            <motion.div
                initial={{ top: -10, left: '100%', opacity: 0 }}
                animate={{
                    top: ['20%', '80%'],
                    left: ['80%', '20%'],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeIn"
                }}
                className="absolute w-1 h-1 bg-blue-500 dark:bg-white shadow-[0_0_20px_2px_rgba(59,130,246,0.5)] dark:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] rounded-full blur-[0.5px]"
            />
        </div>
    );
};

export default CosmosBackground;
