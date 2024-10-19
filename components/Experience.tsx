import React from 'react';

interface ExperienceProps {
    company: string;
    year: string;
    position: string;
    description: string;
}

const Experience:React.FC<ExperienceProps> = ({company, year, position, description}) => {
    return (
        <section className="mb-16 font-poppins" id="experience">
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-1">{company}</h4>
              <p className="text-gray-700 dark:text-gray-400 mb-2">{position} • {year}</p>
              <p className="text-gray-700 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </section>
      );
}
 
export default Experience;