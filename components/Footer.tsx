import React from 'react';
import { FaFacebook, FaInstagram, FaThreads, FaWhatsapp, FaTelegram, FaXTwitter, FaReddit, FaPinterest, FaLinkedin, FaGithub, FaYoutube, FaTiktok } from "react-icons/fa6";

const Footer:React.FC = () => {
    return ( 
        <section className='bg-white dark:bg-primary p-4 font-poppins shadow-md shadow-white flex justify-center items-center gap-8 flex-col sm:flex-row'>
            <div className='border-b border-primary dark:border-gray-300 sm:border-b-0 sm:border-r sm:border-primary pb-3 sm:pr-16 text-center sm:text-left w-full sm:w-auto'>
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-200">Patrick Murani</h2>
                <p>Copyright &copy; {new Date().getFullYear() === 2024 ? 2024 : `2024 - ${new Date().getFullYear()}`}</p>
                <p>All Rights Reserved</p>
            </div>

            {/* socials */}
            <div className='flex gap-4 flex-wrap justify-center items-center'>
                <a href="https://www.facebook.com/mrunphotography1" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaFacebook /></a>
                <a href="https://www.instagram.com/mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaInstagram /></a>
                <a href="https://www.threads.net/@mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaThreads /></a>
                <a href="https://api.whatsapp.com/send?phone=254795556007" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaWhatsapp /></a>
                <a href="https://t.me/mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaTelegram /></a>
                <a href="https://www.x.com/mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaXTwitter /></a>
                <a href="https://www.reddit.com/user/mrunphotography/" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaReddit /></a>
                <a href="https://www.pinterest.com/mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaPinterest /></a>
                <a href="https://www.linkedin.com/in/patrick-murani" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaLinkedin /></a>
                <a href="https://github.com/PatohMrun" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaGithub /></a>
                <a href="https://www.youtube.com/@mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaYoutube /></a>
                <a href="https://www.tiktok.com/@mrunphotography" target='_blank' rel="noopener noreferrer" className='text-lg lg:text-xl font-semibold text-primary dark:text-gray-200 hover:text-blue-600  dark:hover:text-blue-500'><FaTiktok /></a>

            </div>

        </section>
     );
}
 
export default Footer;