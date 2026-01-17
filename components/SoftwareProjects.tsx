import React from "react";
import SoftwareCard from "./SoftwareCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const SoftwareProjects: React.FC = () => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px" // Trigger slightly before scrolling into view
  });

  const projects = [
    {
      source: "/software/asg.png",
      title: "AlphaShield Global",
      description: "Professional security solutions across Kenya and internationally",
      link: "https://alphashield.vercel.app/"
    },
    {
      source: "/software/b360.png",
      title: "B360 Inc.",
      description: "A global provider of professional services enabling government and private sector success",
      link: "https://b360inc.com/"
    },
    {
      source: "/software/bcpa.png",
      title: "B360 CPA",
      description: "Provides CPA Services globally",
      link: "https://b360-cpa.vercel.app/"
    },
    {
      source: "/software/HealJunction.webp",
      title: "HealJunction Website",
      description: "A website for HealJunction Health Services",
      link: "https://healjunction.co.ke/"
    },
    {
      source: "/software/KaziPos.webp",
      title: "KaziPOS System Website",
      description: "A Point of Sale system by Hillgan Innovations",
      link: "https://kazi-pos.vercel.app/"
    },
    {
      source: "/software/KaziAfya.webp",
      title: "KaziAfya System Website",
      description: "A Health management system by Hillgan Innovations",
      link: "https://kaziafya.vercel.app/"
    },
    {
      source: "/software/Kazi.webp",
      title: "Kazi Desk HR System",
      description: "A General purpose HR management system by Hillgan Innovations",
      link: "https://kazi-desk.vercel.app/"
    },
    {
      source: "/software/Kazi2.webp",
      title: "Kazi Desk HR System v2",
      description: "A General purpose HR management system by Hillgan Innovations",
      link: "https://kazisystem.vercel.app/"
    },
    {
      source: "/software/Sms.webp",
      title: "Hillgan Bulk SMS System",
      description: "A Bulk SMS management system by Hillgan Innovations",
      link: "https://hillgan-bulksms.vercel.app/"
    },
    {
      source: "/software/Opct.webp",
      title: "OPCT Application System",
      description: "Inua Jamii elderly progran cash application platform",
      link: "https://opct-ts.vercel.app/"
    },
    {
      source: "/software/Innovation.webp",
      title: "UEAB Innovation",
      description: "A portal for UEAB Students to submit their innovation proposals",
      link: "https://ueabinnovation.vercel.app/"
    },
    {
      source: "/software/Research.webp",
      title: "UEAB Research Grants & Innovation",
      description: "A platform for the Directorate of Research Grants & Innovation",
      link: "https://ueab-research.vercel.app/"
    },
    {
      source: "/software/Hotel.webp",
      title: "10-Star Hotel Management System",
      description: "A hotel management system for an hypothetical 10-Star hotel",
      link: "https://young-professor-github-io.vercel.app/"
    },
    {
      source: "/software/Patrick.webp",
      title: "Patrick Murani",
      description: "My initial portfolio site",
      link: "https://patrickmurani1.vercel.app/"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each card animation
        delayChildren: 0.1 // Initial delay before first card
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
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

  return (
    <section className="font-poppins">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex gap-4 justify-center items-center flex-wrap"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="relative"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <SoftwareCard
              source={project.source}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SoftwareProjects;