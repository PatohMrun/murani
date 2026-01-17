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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Deep Space Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-gray-50 to-gray-50 dark:from-blue-900/20 dark:via-primary dark:to-primary opacity-90 dark:opacity-80"></div>

            {/* Nebula Layers */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />

            {/* Twinkling Stars */}
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-900/20 dark:bg-white rounded-full"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
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
                className="absolute w-1 h-1 bg-blue-400 dark:bg-white shadow-[0_0_20px_2px_rgba(59,130,246,0.5)] dark:shadow-[0_0_20px_2px_rgba(255,255,255,0.8)] rounded-full blur-[0.5px]"
            />
        </div>
    );
};

export default CosmosBackground;
