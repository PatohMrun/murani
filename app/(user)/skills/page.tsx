import React from 'react';
import { FaLaptopCode, FaDatabase } from "react-icons/fa6";
import { FaCodeBranch } from "react-icons/fa";
import { SiFramework } from "react-icons/si";
import { AiTwotoneApi } from "react-icons/ai";
import { PiGraphicsCardFill } from "react-icons/pi";
import { IoMdCamera } from "react-icons/io";

const Skills:React.FC = () => {
    return ( 
        <section className="p-8" id="skills">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 text-center mb-6">Core Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Skill 1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaLaptopCode className="text-red-500 dark:text-red-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Programming Languages</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Python, Dart, JavaScript, TypeScript, HTML, CSS</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
         
            {/* Skill 2 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <SiFramework className="text-green-500 dark:text-green-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Frameworks</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">React.js, NextJS, Tailwind CSS, NodeJS, Flutter, Prisma</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaDatabase className="text-blue-500 dark:text-blue-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Databases</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">MySQL, PostgreSQL, MongoDB</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            {/* Skill 4 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <FaCodeBranch className="text-cyan-500 dark:text-cyan-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Version Control</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Git, GitHub</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            {/* Skill 5 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <AiTwotoneApi className="text-pink-500 dark:text-pink-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">API Development & Integration</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Postman, RESTful APIs</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            {/* Skill 6 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <PiGraphicsCardFill className="text-yellow-500 dark:text-yellow-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Graphic Design & UI/UX</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe XD, Figma</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            {/* Skill 7 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <IoMdCamera className="text-orange-500 dark:text-orange-400" size={40} />
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">Photography, Videography & Animation</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-400 mb-3">Adobe Photoshop, Adobe Lightroom, Adobe Premiere Pro, Adobe After Effects, Adobe Audition, Blender</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>



            {/* Add more skills as needed */}
          </div>
        </section>

     );
}
 
export default Skills;