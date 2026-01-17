'use client'
import React from 'react';
import { FaLaptopCode, FaDatabase, FaCodeBranch } from "react-icons/fa6";
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

    const skillsData = [
        {
            icon: <FaLaptopCode size={32} />,
            title: "Programming Languages",
            skills: ["Python", "Dart", "JavaScript", "TypeScript", "HTML", "CSS"],
            progress: 90,
            color: "text-red-500",
            bg: "bg-red-500"
        },
        {
            icon: <SiFramework size={32} />,
            title: "Frameworks & Tools",
            skills: ["React.js", "NextJS", "Tailwind CSS", "NodeJS", "Flutter", "Prisma"],
            progress: 90,
            color: "text-green-500",
            bg: "bg-green-500"
        },
        {
            icon: <FaDatabase size={32} />,
            title: "Databases",
            skills: ["MySQL", "PostgreSQL", "MongoDB"],
            progress: 80,
            color: "text-blue-500",
            bg: "bg-blue-500"
        },
        {
            icon: <FaCodeBranch size={32} />,
            title: "Version Control",
            skills: ["Git", "GitHub", "GitLab"],
            progress: 75,
            color: "text-cyan-500",
            bg: "bg-cyan-500"
        },
        {
            icon: <AiTwotoneApi size={32} />,
            title: "API Development",
            skills: ["Postman", "RESTful APIs", "GraphQL"],
            progress: 80,
            color: "text-pink-500",
            bg: "bg-pink-500"
        },
        {
            icon: <PiGraphicsCardFill size={32} />,
            title: "Graphic Design",
            skills: ["Photoshop", "Illustrator", "InDesign", "Adobe XD", "Figma"],
            progress: 80,
            color: "text-yellow-500",
            bg: "bg-yellow-500"
        },
        {
            icon: <IoMdCamera size={32} />,
            title: "Creative Media",
            skills: ["Photography", "Videography", "Premiere Pro", "After Effects", "Blender"],
            progress: 80,
            color: "text-purple-500",
            bg: "bg-purple-500"
        }
    ];

    return (
        <motion.section
            className="min-h-screen py-20 px-4 sm:px-8 font-poppins relative overflow-hidden"
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            {/* Background elements */}
            <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div variants={cardVariants} className="text-center mb-16">
                    <h2 className="text-xs sm:text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">My Expertise</h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-oswald text-gray-900 dark:text-gray-100">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Skills</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {skill.icon}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{skill.title}</h4>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {skill.skills.map((item, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <span>Proficiency</span>
                                    <span>{skill.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        className={`h-full ${skill.bg}`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default Skills;
