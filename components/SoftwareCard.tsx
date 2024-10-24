import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

interface SoftwareCardProps {
    source: string;
    title: string;
    description: string;
    link: string;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ source, title, description, link }) => {
    const cardRef = React.useRef(null);
    const isInView = useInView(cardRef, { 
        once: true,
        margin: "0px 0px -100px 0px" // Triggers animation slightly before card enters viewport
    });

    // Card animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        visible: { 
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Content animation variants
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.4
            }
        }
    };

    // Button hover animation
    const buttonVariants = {
        initial: { x: 0 },
        hover: {
            x: 5,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="font-poppins">
            <motion.div
                ref={cardRef}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-80 p-2 bg-white dark:bg-gray-950 shadow-md shadow-gray-900 rounded-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    <Image 
                        src={source}
                        alt={title}
                        width={1366}
                        height={768}
                        className="rounded-md"
                    />
                </motion.div>

                <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h3 className="font-bold uppercase mt-1">{title}</h3>
                    <p className="text-sm italic">{description}</p>
                </motion.div>

                <div className="flex justify-end">
                    <motion.a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 text-nowrap text-white text-sm rounded-lg items-center w-32 my-2 mx-4 p-2 bg-primary hover:bg-gray-900 dark:bg-blue-800 dark:hover:bg-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View Project
                        <motion.div
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                        >
                            <FaArrowRight />
                        </motion.div>
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
};

export default SoftwareCard;