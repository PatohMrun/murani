"use client";

import GraphicDesign from "@/components/GraphicDesign";
import SoftwareProjects from "@/components/SoftwareProjects";
import CosmosBackground from "@/components/CosmosBackground";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaPaintBrush } from "react-icons/fa";

const Creations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"software" | "graphic">("software");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary transition-colors duration-500 font-poppins relative overflow-x-hidden pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <CosmosBackground />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">Portfolio</h2>
          <h1 className="text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-gray-100 mb-6">
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
    </div>
  );
};

export default Creations;
