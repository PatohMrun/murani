"use client";

import GraphicDesign from "@/components/GraphicDesign";
import SoftwareProjects from "@/components/SoftwareProjects";
import React, { useState } from "react";

const Creations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"software" | "graphic">("software");

  return (
    <div className="p-4 font-poppins min-h-[80vh]">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 text-md sm:text-lg font-semibold border-b-4 ${
            activeTab === "software" ? "border-blue-500 text-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("software")}
        >
          Software Projects
        </button>
        <button
          className={`px-4 py-2 text-md sm:text-lg font-semibold border-b-4 ${
            activeTab === "graphic" ? "border-blue-500 text-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("graphic")}
        >
          Graphic Design
        </button>
      </div>

      <div>
        {activeTab === "software" && <SoftwareProjects />}
        {activeTab === "graphic" && <GraphicDesign />}
      </div>
    </div>
  );
};

export default Creations;
