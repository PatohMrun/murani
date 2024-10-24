import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceProps {
    company: string;
    year: string;
    position: string;
    description: string;
}

const Experience: React.FC<ExperienceProps> = ({ company, year, position, description }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { 
            x: -20,
            opacity: 0 
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const borderVariants = {
        hidden: { 
            height: 0,
            opacity: 0 
        },
        visible: {
            height: "100%",
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            className="mb-16 font-poppins relative" 
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="space-y-8">
                <div className="relative pl-6 py-2">
                    {/* Animated border */}
                    <motion.div
                        className="absolute left-0 top-0 w-1 bg-blue-500"
                        variants={borderVariants}
                        style={{ originY: 0 }}
                    />
                    
                    {/* Content with animations */}
                    <motion.div
                        variants={itemVariants}
                        className="relative"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.h4 
                            className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-1"
                            variants={itemVariants}
                        >
                            {company}
                        </motion.h4>
                        <motion.p 
                            className="text-gray-700 dark:text-gray-400 mb-2"
                            variants={itemVariants}
                        >
                            {position} • {year}
                        </motion.p>
                        <motion.p 
                            className="text-gray-700 dark:text-gray-400"
                            variants={itemVariants}
                        >
                            {description}
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
 
export default Experience;