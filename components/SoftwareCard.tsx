import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface SoftwareCardProps {
    source: string;
    title: string;
    description: string;
    link: string;
  }

const SoftwareCard: React.FC<SoftwareCardProps> = ({ source, title, description, link }) => {
  return (
    <section className="font-poppins">
      <div className="w-80 p-2 bg-white dark:bg-gray-950 shadow-md shadow-gray-900 rounded-lg">
        <Image 
            src={source}
            alt={title}
            width={1366}
            height={768}
        />
        <h3 className="font-bold uppercase mt-1">{title}</h3>
        <p className="text-sm italic">{description}</p>
        <div className="flex justify-end">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-nowrap text-white text-sm rounded-lg items-center w-32 my-2 mx-4 p-2 bg-primary hover:bg-gray-900 dark:bg-blue-800 dark:hover:bg-blue-600">View Project <FaArrowRight /></a>
        </div>
      </div>
    </section>
  );
};

export default SoftwareCard;
