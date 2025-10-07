'use client'
import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageHover = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary transition-colors duration-500 font-poppins">
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="text-gray-800 dark:text-gray-300 mb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={imageHover}
              viewport={{ once: false }}
              className="flex-shrink-0"
            >
              <Image
                src="/Murani.jpg"
                alt="Patrick Murani"
                width={250}
                height={250}
                className="rounded-full"
                priority
              />
            </motion.div>
            
            <motion.div 
              className="mt-4 lg:mt-0 lg:max-w-[60%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl lg:text-3xl font-bold font-poppins mb-4"
                variants={fadeInUp}
              >
                Software Engineer | Aspiring Machine Learning Engineer | Graphic Designer | Photographer
              </motion.h2>
              
              <motion.p 
                className="text-lg leading-relaxed font-poppins"
                variants={fadeInUp}
              >
                I&apos;m <span className="font-semibold text-blue-900 dark:text-blue-500">Patrick Murani</span>, 
                a Bachelor of Science degree holder in <span className="font-semibold text-blue-900 dark:text-blue-500">Software Engineering</span> from the University of Eastern Africa, Baraton. <br /> 
                I am accredited by the <a href="https://mediacouncil.or.ke" target="_blank" rel="noopener noreferrer" 
                className="font-semibold text-blue-900 dark:text-blue-500 underline">Media Council of Kenya</a> as 
                a <span className="font-semibold text-blue-900 dark:text-blue-500">Graphic Designer</span>. <br /> 
                I&apos;m also an experienced and skilled <span className="font-semibold text-blue-900 dark:text-blue-500">Photographer</span>.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Link 
                  href={"Murani-Ndwiga.pdf"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Download Résumé
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <motion.section 
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={staggeredContainer}
        >
          <motion.h3 
            className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6 font-poppins"
            variants={fadeInUp}
          >
            Experience
          </motion.h3>
          
          <motion.div 
            variants={staggeredContainer}
            className="space-y-4"
          >
            <motion.div variants={fadeInUp}>
              <Experience 
                company="Hillgan Innovations" 
                position="Front-end Developer" 
                year="May 2024 - July 2024" 
                description="Handled the front-end for Kazi Desk HR Management System and also for the Hillgan Bulk SMS system" 
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Experience 
                company="Centri Closet" 
                position="UI Designer" 
                year="January 2022 - April 2024" 
                description="Designed some of the UI concepts for the Centri closet e-commerce platform" 
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Experience 
                company="University of Eastern Africa, Baraton - Yearbook Department" 
                position="Graphic Designer & Photographer" 
                year="September 2022 - April 2024" 
                description="A Graphic Designer for the 2022/2023 Yearbook and a Photographer/Graphic Designer for the 2023/2024 Yearbook" 
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Experience 
                company="University of Eastern Africa, Baraton - Journalism Department" 
                position="Graphic Designer" 
                year="November 2023 - February 2024" 
                description="The Designer for the First and Second releases of The Baratonian Newsletter" 
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Experience 
                company="Elimu Publishers" 
                position="Graphic Designer" 
                year="September 2023 - October 2023" 
                description="The Designer for book covers and Illustrations" 
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
