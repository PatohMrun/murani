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
                  href={"patrickmurani.pdf"} 
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
                position="Software Engineer" 
                year="March 2025 – June 2025" 
                description="Built and refined front-end interfaces for KaziDesk, KaziPOS, KaziAfya, and HealJunction using modern UI/UX principles to ensure responsive and engaging experiences." 
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Experience 
                company="AWS Student Community Day Kenya" 
                position="Graphic Designer" 
                year="May 2024 – September 2024" 
                description="Designed visual assets and event materials for AWS Students Community Day Kenya, ensuring consistent branding and high-quality presentation." 
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Experience 
                company="Google Developer Groups – UEAB" 
                position="UI/UX Lead" 
                year="September 2023 – August 2024" 
                description="Established the GDG UEAB chapter and served as its first UI/UX Lead, organizing workshops and mentoring students in design and creative coding." 
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Experience 
                company="University of Eastern Africa, Baraton" 
                position="Full Stack Developer" 
                year="2023 – 2024" 
                description="Developed the UEAB Research Grants and UEAB Innovation websites, streamlining project visibility and showcasing institutional innovations." 
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Experience 
                company="UEAB Crested Crane (Yearbook Office)" 
                position="Graphic Designer & Photographer" 
                year="September 2022 – April 2024" 
                description="Captured and curated campus stories through photography, co-designed the university’s yearbook, and created cohesive visual narratives." 
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Experience 
                company="UEAB Journalism Club" 
                position="Graphic Designer" 
                year="January 2024 – February 2024" 
                description="Designed the first and second editions of The Baratonian Newsletter, shaping its visual identity through engaging layouts and creative direction." 
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
