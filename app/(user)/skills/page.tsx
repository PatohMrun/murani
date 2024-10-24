'use client'
import React from 'react';
import { FaLaptopCode, FaDatabase } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import { SiFramework } from "react-icons/si";
import { AiTwotoneApi } from "react-icons/ai";
import { PiGraphicsCardFill } from "react-icons/pi";
import { IoMdCamera } from "react-icons/io";
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const progressVariants = {
        hidden: { width: 0 },
        visible: (width: string) => ({
            width,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
            }
        })
    };

    const skillsData = [
        {
            icon: <FaLaptopCode className="text-red-500 dark:text-red-400" size={40} />,
            title: "Programming Languages",
            skills: "Python, Dart, JavaScript, TypeScript, HTML, CSS",
            progress: "90%",
            color: "bg-red-500"
        },
        {
            icon: <SiFramework className="text-green-500 dark:text-green-400" size={40} />,
            title: "Frameworks",
            skills: "React.js, NextJS, Tailwind CSS, NodeJS, Flutter, Prisma",
            progress: "90%",
            color: "bg-green-500"
        },
        {
            icon: <FaDatabase className="text-blue-500 dark:text-blue-400" size={40} />,
            title: "Databases",
            skills: "MySQL, PostgreSQL, MongoDB",
            progress: "80%",
            color: "bg-blue-500"
        },
        {
            icon: <FaCodeBranch className="text-cyan-500 dark:text-cyan-400" size={40} />,
            title: "Version Control",
            skills: "Git, GitHub",
            progress: "75%",
            color: "bg-cyan-500"
        },
        {
            icon: <AiTwotoneApi className="text-pink-500 dark:text-pink-400" size={40} />,
            title: "API Development & Integration",
            skills: "Postman, RESTful APIs",
            progress: "80%",
            color: "bg-pink-500"
        },
        {
            icon: <PiGraphicsCardFill className="text-yellow-500 dark:text-yellow-400" size={40} />,
            title: "Graphic Design & UI/UX",
            skills: "Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe XD, Figma",
            progress: "80%",
            color: "bg-yellow-500"
        },
        {
            icon: <IoMdCamera className="text-orange-500 dark:text-orange-400" size={40} />,
            title: "Photography, Videography & Animation",
            skills: "Adobe Photoshop, Adobe Lightroom, Adobe Premiere Pro, Adobe After Effects, Adobe Audition, Blender",
            progress: "80%",
            color: "bg-orange-500"
        }
    ];

    return (
        <motion.section 
            className="p-8" 
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
        >
            <motion.h3 
                className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 text-center mb-6"
                variants={cardVariants}
            >
                Core Skills
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillsData.map((skill, index) => (
                    <motion.div 
                        key={index}
                        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className="flex items-center space-x-4 mb-4">
                            {skill.icon}
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">{skill.title}</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-400 mb-3">{skill.skills}</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <motion.div 
                                className={`${skill.color} h-2 rounded-full`}
                                variants={progressVariants}
                                custom={skill.progress}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
 
export default Skills;