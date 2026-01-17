import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceProps {
    company: string;
    year: string;
    position: string;
    description: string;
    index: number;
}

const Experience: React.FC<ExperienceProps> = ({ company, year, position, description, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-8 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Timeline Line (Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 h-full z-0" />

            {/* Timeline Dot (Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-primary -translate-x-1/2 z-10 shadow-md group-hover:scale-125 transition-transform duration-300" />

            {/* Empty Space for alignment */}
            <div className="hidden md:block w-5/12" />

            {/* Content Card */}
            <motion.div
                whileHover={{ y: -5 }}
                className={`w-full md:w-5/12 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 relative z-10 md:text-left
                    ${isEven ? 'md:text-right md:items-end' : ''}
                `}
            >
                {/* Mobile Timeline Elements */}
                <div className="md:hidden absolute left-[-20px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 h-full" />
                <div className="md:hidden absolute left-[-26px] top-6 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-primary z-10 shadow-md" />

                <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="text-xs sm:text-sm font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                        {year}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        {company}
                    </h4>
                    <h5 className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
                        {position}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default Experience;