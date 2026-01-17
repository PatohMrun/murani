import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceProps {
    company: string;
    year: string;
    position: string;
    description: string;
}

const Experience: React.FC<ExperienceProps> = ({ company, year, position, description }) => {
    return (
        <div className="relative pl-8 md:pl-0 font-poppins group">
            {/* Timeline Line (Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 group-last:bottom-auto group-last:h-full" />

            {/* Timeline Line (Mobile Left) */}
            <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 group-last:bottom-auto group-last:h-full" />

            {/* Timeline Dot (Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-primary -translate-x-1/2 z-10 shadow-md group-hover:scale-125 transition-transform duration-300" />

            {/* Timeline Dot (Mobile Left) */}
            <div className="md:hidden absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-white dark:border-primary z-10 shadow-md" />

            {/* Content Container */}
            <div className={`md:flex justify-between items-center w-full md:w-auto`}>
                {/* Date Side (Alternating) - For simplicity in this component, we render card content directly. 
                    The alternating layout logic will be simpler if handled by valid CSS grid or flex order, 
                    but to keep the component simple, we'll design a full-width card for now that sits to the right/left 
                    OR a central layout. 
                    
                    Actually, for a robust timeline, let's use a standard block approach that works well responsive.
                */}

                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 relative z-0"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {company}
                        </h4>
                        <span className="text-sm font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                            {year}
                        </span>
                    </div>

                    <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {position}
                    </h5>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

export default Experience;