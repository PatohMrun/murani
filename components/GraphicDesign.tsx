"use client";

import React from "react";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa"; // Importing react icons
import Image from "next/image"; // Importing Next.js Image component

const GraphicDesign: React.FC = () => {
  // Placeholder images; Replace with actual image paths
  const images = [
    "/graphic/Image1.webp",
    "/graphic/Image2.webp",
    "/graphic/Image3.webp",
    "/graphic/Image4.webp",
    "/graphic/Image5.webp",
    "/graphic/Image6.webp",
    "/graphic/Image7.webp",
    "/graphic/Image8.webp",
    "/graphic/Image9.webp",
    "/graphic/Image10.webp",
    "/graphic/Image11.webp",
    "/graphic/Image12.webp",
    "/graphic/Image13.webp",
    "/graphic/Image14.webp",
    "/graphic/Image15.webp",
    "/graphic/Image16.webp",
    "/graphic/Image17.webp",
    "/graphic/Image18.webp",
    "/graphic/Image19.webp",
    "/graphic/Image20.webp",
  ];

  return (
    <div className="relative">
      {/* Responsive Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-auto overflow-hidden rounded-md">
            <Image
              src={image}
              alt={`Gallery item ${index + 1}`}
              width={400} // Adjust width for optimization; Next.js needs explicit dimensions
              height={300} // Adjust height for optimization
              className="w-full h-auto max-h-[400px] object-contain rounded-md"
              layout="responsive" // Ensures responsive design
            />
          </div>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 left-4 space-y-2 z-10">
        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/mrunphotography"
          className="flex items-center justify-start p-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 dark:from-purple-400 dark:via-pink-400 dark:to-yellow-400 hover:scale-110 transition shadow-md shadow-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-white text-xl" />
          <span className="ml-2 text-white text-sm">View More</span>
        </a>

        {/* Pinterest Button */}
        <a
          href="https://www.pinterest.com/mrunphotography/_tpd_social/"
          className="flex items-center justify-start p-4 rounded-full bg-red-600 dark:bg-red-500 hover:scale-110 transition shadow-md shadow-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPinterest className="text-white text-xl" />
          <span className="ml-2 text-white text-sm">View More</span>
        </a>

        {/* WhatsApp Business Button */}
        <a
          href="https://wa.me/c/254111983606"
          className="flex items-center justify-start p-4 rounded-full bg-green-600 dark:bg-green-500 hover:scale-110 transition shadow-md shadow-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-white text-xl" />
          <span className="ml-2 text-white text-sm">View More</span>
        </a>
      </div>
    </div>
  );
};

export default GraphicDesign;
