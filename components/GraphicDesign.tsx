"use client";

import React, { useEffect, useState } from "react";
import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const GraphicDesign: React.FC = () => {
  const [columns, setColumns] = useState<number[][]>([[], [], [], []]);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -100px 0px"
  });

  const images = [
    // Set 2 of 35 images
    "/graphic/Image21.webp",
    "/graphic/Image22.webp",
    "/graphic/Image23.webp",
    "/graphic/Image24.webp",
    "/graphic/Image25.webp",
    "/graphic/Image26.webp",
    "/graphic/Image27.webp",
    "/graphic/Image28.webp",
    "/graphic/Image29.webp",
    "/graphic/Image30.webp",
    "/graphic/Image31.webp",
    "/graphic/Image32.webp",
    "/graphic/Image33.webp",
    "/graphic/Image34.webp",
    "/graphic/Image35.webp",
    "/graphic/Image36.webp",
    "/graphic/Image37.webp",
    "/graphic/Image38.webp",
    "/graphic/Image39.webp",
    "/graphic/Image40.webp",
    "/graphic/Image41.webp",
    "/graphic/Image42.webp",
    "/graphic/Image43.webp",
    "/graphic/Image44.webp",
    "/graphic/Image45.webp",
    "/graphic/Image46.webp",
    "/graphic/Image47.webp",
    "/graphic/Image48.webp",
    "/graphic/Image49.webp",
    "/graphic/Image50.webp",
    "/graphic/Image51.webp",
    "/graphic/Image52.webp",
    "/graphic/Image53.webp",
    "/graphic/Image54.webp",
    "/graphic/Image55.webp",

    // Set 1 
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

  // Distribute images across columns
  useEffect(() => {
    const getWindowWidth = () => {
      if (typeof window === 'undefined') return 1200;
      return window.innerWidth;
    };

    const getNumColumns = (width: number) => {
      if (width < 640) return 1;
      if (width < 768) return 2;
      if (width < 1024) return 3;
      return 4;
    };

    const distributeImages = () => {
      const windowWidth = getWindowWidth();
      const numColumns = getNumColumns(windowWidth);
      const newColumns: number[][] = Array.from({ length: numColumns }, () => []);

      images.forEach((_, index) => {
        const columnIndex = index % numColumns;
        newColumns[columnIndex].push(index);
      });

      setColumns(newColumns);
    };

    distributeImages();
    window.addEventListener('resize', distributeImages);
    return () => window.removeEventListener('resize', distributeImages);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
    })
  };

  return (
    <div className="relative px-4">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex gap-4"
      >
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1">
            {column.map((imageIndex) => (
              <motion.div
                key={imageIndex}
                variants={itemVariants}
                className="mb-4"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={images[imageIndex]}
                    alt={`Gallery item ${imageIndex + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transform hover:scale-105 transition duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPEQ+Pj4+RD5EPkFEREREPkQ/REREREREREREREREREREREREREr/2wBDAREXFyYeHiYyHh4yRD5EPkREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREr/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>


    </div>
  );
};

export default GraphicDesign;