'use client'
import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
import LatestPosts from "@/components/LatestPosts";
import MagneticButton from "@/components/MagneticButton";
import RevealText, { FlowText } from "@/components/RevealText";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaLinkedin, FaGithub, FaEnvelope, FaAndroid, FaChevronDown } from "react-icons/fa6";
import { useState } from "react";

export default function Home() {
  const [experienceExpanded, setExperienceExpanded] = useState(false);
  const { scrollY } = useScroll();
  // hero holds fully solid through the first ~55% of its own height, then
  // eases away only as the section is genuinely leaving the viewport
  const heroY = useTransform(scrollY, [0, 750], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 520, 880], [1, 1, 0]);
  const imageY = useTransform(scrollY, [0, 750], [0, -45]);
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-inter text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-4 pt-20 pb-16 lg:pb-0">

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-6xl">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ y: heroY, opacity: heroOpacity }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-6 border border-blue-200 dark:border-blue-800">
              👋 Hello, I&apos;m Patrick Murani
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-bold font-oswald mb-6 leading-tight">
              Building <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Digital</span> <br />
              Experiences
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A <span className="text-blue-600 dark:text-blue-400 font-semibold">Software Engineer</span>{' '}
              <FlowText text="with a passion for blending code, design, and usability. I turn complex problems into elegant, user-centric solutions." delay={0.5} />
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton>
                <Link
                  href="/creations"
                  className="group px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                >
                  View My Work
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/blog"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all flex items-center justify-center"
                >
                  Read My Blog
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex gap-6 justify-center lg:justify-start text-xl sm:text-2xl text-gray-400">
              <a href="https://github.com/PatohMrun" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/patrick-murani" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors"><FaLinkedin /></a>
              <a href="mailto:patrickmurani@gmail.com" className="hover:text-red-500 transition-colors"><FaEnvelope /></a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: imageY }}
            className="order-1 lg:order-2 flex justify-center relative"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-600 to-purple-600 rounded-4xl rotate-6 opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-4xl rotate-3 shadow-2xl"></div>
              <Image
                src="/Murani.jpg"
                alt="Patrick Murani"
                fill
                className="object-cover object-top rounded-4xl shadow-inner relative z-10"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm hidden lg:flex flex-col items-center gap-2"
        >
          <span>Scroll to Explore</span>
          <div className="w-0.5 h-12 bg-linear-to-b from-blue-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-12 relative" id="experience">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-xs sm:text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">My Journey</h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-oswald">
              <RevealText text="Professional Experience" />
            </h3>
          </motion.div>

          <div className="relative space-y-8 md:space-y-0 relative">
            <Experience
              company="BizSolutions 360, Inc."
              position="Software Developer, Business Developer & Social Media Manager"
              year="Nov 2025 - Present"
              description="Driving digital transformation through full-stack development, strategic business growth, and brand management."
              index={0}
            />

            <Experience
              company="Hillgan Innovations"
              position="Software Engineer"
              year="Mar 2025 – Jun 2025"
              description="Led frontend architecture for key products (KaziDesk, KaziPOS), focusing on performance optimization and intuitive UX design."
              index={1}
            />

            {/* Collapsible entries */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxHeight: experienceExpanded ? '2000px' : '0px', opacity: experienceExpanded ? 1 : 0 }}
            >
              <Experience
                company="AWS Student Community Day Kenya"
                position="Graphic Designer"
                year="May 2024 – Sep 2024"
                description="Crafted the visual identity for a major tech conference, designing marketing assets that drove engagement and brand consistency."
                index={2}
              />

              <Experience
                company="Google Developer Groups – UEAB"
                position="UI/UX Lead"
                year="Sep 2023 – Aug 2024"
                description="Pioneered the design chapter, mentoring students in UI/UX principles and leading workshops on creative coding and prototyping."
                index={3}
              />

              <Experience
                company="University of Eastern Africa, Baraton"
                position="Full Stack Developer"
                year="2023 – 2024"
                description="Developed institutional platforms for research and innovation, streamlining grant applications and project showcases."
                index={4}
              />

              <Experience
                company="UEAB Crested Crane"
                position="Graphic Designer & Photographer"
                year="Sep 2022 – Apr 2024"
                description="Visual storyteller for the university, capturing campus life and designing the annual yearbook publication."
                index={5}
              />
            </div>

            <div className="flex flex-col items-center gap-4 pt-3">
              <button
                onClick={() => setExperienceExpanded(e => !e)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-500/40 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all"
              >
                {experienceExpanded ? 'Show less' : 'Show 4 more'}
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${experienceExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              <Link
                href="patrickmurani.pdf"
                target="_blank"
                className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                Download Full Résumé <FaArrowRight className="text-sm animate-pulse" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <LatestPosts />

      {/* APK Strip */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/apks"
              className="group flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6 rounded-2xl bg-linear-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-500/20 hover:border-blue-500/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                  <FaAndroid size={20} />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-bold text-gray-900 dark:text-white">Android Apps</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Native Android apps available for download</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all whitespace-nowrap">
                Browse APKs <FaArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
