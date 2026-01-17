import React from 'react';
import Link from 'next/link';
import {
    FaFacebook, FaInstagram, FaThreads, FaWhatsapp, FaTelegram,
    FaXTwitter, FaReddit, FaPinterest, FaLinkedin, FaGithub,
    FaYoutube, FaTiktok, FaEnvelope, FaPhone, FaLocationDot
} from "react-icons/fa6";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/PatohMrun", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/patrick-murani", label: "LinkedIn" },
        { icon: <FaXTwitter />, href: "https://www.x.com/mrunphotography", label: "X (Twitter)" },
        { icon: <FaInstagram />, href: "https://www.instagram.com/mrunphotography", label: "Instagram" },
        { icon: <FaYoutube />, href: "https://www.youtube.com/@mrunphotography", label: "YouTube" },
        { icon: <FaTiktok />, href: "https://www.tiktok.com/@mrunphotography", label: "TikTok" },
        { icon: <FaWhatsapp />, href: "https://api.whatsapp.com/send?phone=254795556007", label: "WhatsApp" },
        { icon: <FaTelegram />, href: "https://t.me/mrunphotography", label: "Telegram" },
        { icon: <FaFacebook />, href: "https://www.facebook.com/mrunphotography1", label: "Facebook" },
        { icon: <FaThreads />, href: "https://www.threads.net/@mrunphotography", label: "Threads" },
        { icon: <FaReddit />, href: "https://www.reddit.com/user/mrunphotography/", label: "Reddit" },
        { icon: <FaPinterest />, href: "https://www.pinterest.com/mrunphotography", label: "Pinterest" },
    ];

    return (
        <footer className="relative z-10 font-poppins mt-20 transition-colors duration-500">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-oswald text-gray-900 dark:text-white">
                            Patrick Murani
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Crafting digital experiences through code, design, and photography.
                            Let's build something amazing together.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/creations" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Creations
                                </Link>
                            </li>
                            <li>
                                <Link href="/skills" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h3>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-500" />
                                <a href="mailto:patrickmurani@gmail.com" className="hover:text-blue-500 transition-colors">
                                    patrickmurani@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaPhone className="text-blue-500" />
                                <a href="tel:+254795556007" className="hover:text-blue-500 transition-colors">
                                    +254 795 556 007
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaLocationDot className="text-blue-500" />
                                <span>Nairobi, Kenya</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 flex items-center justify-center text-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500 dark:text-gray-500">
                    <p>
                        Copyright &copy; {currentYear === 2024 ? 2024 : `2024 - ${currentYear}`} Patrick Murani. <span className="block sm:inline">All Rights Reserved.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;