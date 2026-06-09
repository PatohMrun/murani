'use client'
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { MdMenuOpen, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleToggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            if (isOpen) setIsOpen(false); // Close menu on scroll
        };

        const handleOutsideClick = (e: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Skills", href: "/skills" },
        { name: "Creations", href: "/creations" },
        { name: "APKs", href: "/apks" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    // Blog post pages have a full-bleed hero image behind the transparent nav
    const isHeroPage = /^\/blog\/.+/.test(pathname)
    const heroUnscrolled = isHeroPage && !scrolled

    return (
        <nav
            className={`fixed w-full z-50 font-inter transition-all duration-500 ease-in-out
                ${scrolled ? 'py-3' : 'py-5'}`}
        >
            {/* Always-on top scrim — anchors nav content against hero images */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
            {/* Blur/bg layer — fades in on scroll or when mobile menu is open */}
            <div className={`absolute inset-0 -z-10 backdrop-blur-md transition-all duration-300 ease-in-out
                ${scrolled
                    ? 'opacity-100 bg-white/80 dark:bg-primary/80 shadow-lg'
                    : isOpen
                        ? 'opacity-100 bg-white/95 dark:bg-primary/95'
                        : 'opacity-0'
                }`}
            />
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Brand */}
                <Link href="/" className="group">
                    <h1 className={`font-bold text-xl sm:text-2xl font-oswald tracking-wide transition-all duration-300
                        ${heroUnscrolled ? 'text-white drop-shadow-md' : 'text-gray-900 dark:text-white'}`}>
                        Patrick <span className='text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500'>Murani</span>
                    </h1>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <div className='flex gap-2'>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden
                                    ${heroUnscrolled
                                        ? 'text-white drop-shadow-sm hover:text-white/80'
                                        : isActive(link.href)
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-800"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className='pl-6 border-l border-gray-200 dark:border-gray-700'>
                        <ThemeSwitch />
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeSwitch />
                    <button
                        onClick={handleToggleMenu}
                        className={`p-2 rounded-lg transition-colors
                            ${heroUnscrolled
                                ? 'text-white drop-shadow-md hover:bg-white/10'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        {isOpen ? <MdClose size={28} /> : <MdMenuOpen size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white/95 dark:bg-primary/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <div ref={menuRef} className="container mx-auto px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between
                                        ${isActive(link.href)
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {link.name}
                                    {isActive(link.href) && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;