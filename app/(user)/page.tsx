import Image from "next/image";
import Link from "next/link";
import Experience from "@/components/Experience";
// import Skills from "./skills/page";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary transition-colors duration-500 font-poppins">
      {/* Header */}
      {/* <header className="top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-md md:text-xl font-bold text-gray-900 dark:text-gray-200">
              Hi, I&apos;m Michael Wanje
            </h1>
            <nav className="hidden md:block">
              <NavLinks />
            </nav>
            <div className="flex items-center space-x-4">
              <button type='button'
                onClick={toggleMenu}
                className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
              </button>
        <div className={`border-l border-l-gray-900 dark:border-l-white pl-4`}><ThemeSwitch /></div>
            </div>
          </div>
        </div>  
      </header> */}

      {/* Mobile Menu */}
      {/* {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 py-4 px-6 mt-12 md:mt-0 shadow-md z-50"
        >
          <NavLinks mobile={true} />
        </div>
      )} */}

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="text-gray-800 dark:text-gray-300 mb-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <Image
              src="/Murani.jpg"
              alt="Michael Wanje"
              width={250}
              height={250}
              className="rounded-full mx-4 my-2 lg:mr-8"
              priority
            />
            <div className="mt-4 lg:mt-0">
              <h2 className="text-2xl lg:text-3xl font-bold font-poppins mb-4">Software Engineer | Aspiring Machine Learning Engineer | Graphic Designer | Photographer </h2>
              <p className="text-lg leading-relaxed max-w-3xl font-poppins">
                I&apos;m <span className="font-semibold text-blue-900 dark:text-blue-500">Patrick Murani</span>, a Bachelor&apos;s degree holder in <span className="font-semibold text-blue-900 dark:text-blue-500">Software Engineering</span> from the University of Eastern Africa, Baraton. <br /> 
                I am accredited by the <a href="https://mediacouncil.or.ke" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-900 dark:text-blue-500 underline">Media Council of Kenya</a> as a <span className="font-semibold text-blue-900 dark:text-blue-500">Graphic Designer</span>. <br /> 
                I&apos;m also an experienced and skilled <span className="font-semibold text-blue-900 dark:text-blue-500">Photographer</span>.
              </p>

              <Link href={"Resume.pdf"} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded" >Download Résumé</Link>

            </div>
          </div>
        </section>

        {/* Projects Section
        <section className="mb-16" id="projects">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6">Notable Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            Project 1
            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md group overflow-hidden">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">Project Name</h4>
              <p className="text-gray-700 dark:text-gray-400 mb-4">Brief description of the project.</p>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <a href="#" className="text-white bg-blue-500 px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">View Project</a>
              </div>
            </div>
            Add more projects as needed
          </div>
        </section> */}

        {/* Experience Section */}
        <section id="experience">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6 font-poppins">Experience</h3>
          <Experience company = "Hillgan Innovations" position = "Front-end Developer" year = "May 2024 - July 2024" description = "Handled the front-end for Kazi Desk HR Management System and also for the Hillgan Bulk SMS system" />
          
          <Experience company = "Centri Closet" position = "UI Designer" year = "January 2022 - April 2024" description = "Designed some of the UI concepts for the Centri closet e-commerce platform" />
          
          <Experience company = "University of Eastern Africa, Baraton - Yearbook Department" position = "Graphic Designer & Photographer" year = "September 2022 - April 2024" description = "A Graphic Designer for the 2022/2023 Yearbook and a Photographer/Graphic Designer for the 2023/2024 Yearbook" />
          
          <Experience company = "University of Eastern Africa, Baraton - Journalism Department" position = "Graphic Designer" year = "November 2023 - February 2024" description = "The Designer for the First and Second releases of The Baratonian Newsletter" />

          <Experience company = "Elimu Publishers" position = "Graphic Designer" year = "September 2023 - October 2023" description = "The Designer for book covers and Illustrations" />

        </section>


        
      </main>
    </div>
  );
}