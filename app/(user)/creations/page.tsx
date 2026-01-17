"use client";

import GraphicDesign from "@/components/GraphicDesign";
import SoftwareProjects from "@/components/SoftwareProjects";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPaintBrush, FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Creations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"software" | "graphic">("software");

  const socialButtonVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { x: -100, opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-poppins relative overflow-x-hidden pt-24 pb-12">
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* ... existing header content ... */}
          <h2 className="text-xs sm:text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">Portfolio</h2>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-gray-100 mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Creations</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore a collection of my digital work, ranging from complex software solutions to creative graphic designs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 flex relative">
            {/* Sliding Background */}
            <motion.div
              className="absolute top-1 bottom-1 bg-blue-500 rounded-full z-0"
              initial={false}
              animate={{
                left: activeTab === "software" ? "4px" : "50%",
                width: "calc(50% - 4px)",
                x: activeTab === "software" ? 0 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              className={`relative z-10 px-8 py-3 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors duration-200 ${activeTab === "software" ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              onClick={() => setActiveTab("software")}
            >
              <FaCode /> Software
            </button>
            <button
              className={`relative z-10 px-8 py-3 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 transition-colors duration-200 ${activeTab === "graphic" ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              onClick={() => setActiveTab("graphic")}
            >
              <FaPaintBrush /> Graphics
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[500px]"
          >
            {activeTab === "software" && <SoftwareProjects />}
            {activeTab === "graphic" && <GraphicDesign />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Social Buttons (Outside accessible container) */}
      <AnimatePresence>
        {activeTab === "graphic" && (
          <div className="fixed bottom-4 left-4 space-y-3 z-50 flex flex-col items-center">
            {[
              {
                Icon: FaInstagram,
                href: "https://www.instagram.com/mrunphotography",
                className: "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 dark:from-purple-400 dark:via-pink-400 dark:to-yellow-400"
              },
              {
                Icon: FaPinterest,
                href: "https://www.pinterest.com/mrunphotography/_tpd_social/",
                className: "bg-red-600 dark:bg-red-500"
              },
              {
                Icon: FaWhatsapp,
                href: "https://wa.me/c/254111983606",
                className: "bg-green-600 dark:bg-green-500"
              }
            ].map(({ Icon, href, className }, index) => (
              <motion.a
                key={href}
                href={href}
                custom={index}
                variants={socialButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, x: 5 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full hover:scale-110 transition shadow-lg shadow-black/20 ${className}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="text-white text-lg" />
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Creations;
