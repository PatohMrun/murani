import React from "react";
import Image from "next/image";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
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
        margin: "0px 0px -50px 0px"
    });

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="group w-full bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            whileHover={{ y: -5 }}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={source}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold font-oswald text-gray-900 dark:text-white mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">{description}</p>

                <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors w-full justify-center group/btn mt-auto"
                    whileTap={{ scale: 0.98 }}
                >
                    View Project
                    <FaArrowRight className="transform transition-transform group-hover/btn:translate-x-1" />
                </motion.a>
            </div>
        </motion.div>
    );
};

export default SoftwareCard;