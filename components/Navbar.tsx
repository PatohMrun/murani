'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import { MdMenuOpen, MdClose } from "react-icons/md";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            isOpen &&
            menuRef.current &&
            !menuRef.current.contains((e.target as Node) || null)
        ) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
            window.addEventListener("scroll", handleScroll);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);


    return (
        <nav className='fixed w-full z-50 bg-white shadow-sm shadow-gray-400 dark:shadow-gray-900  dark:bg-primary flex justify-between items-center px-6 py-5 font-poppins text-primary dark:text-white h-12 '>
            <div>
                {/* <Image 
                    width={45}
                    height={45}
                    src={currentLogo}
                    alt='Logo'
                /> */}
                <h1 className='font-bold text-sm sm:text-md md:text-lg text-primary dark:text-blue-300'>Hi, I&apos;m <span className=''>Patrick Murani</span></h1>
            </div>

            {/* Theme switch and large screen nav links */}
            <div className='flex gap-4 items-center'>
                {/* Large screen navlinks */}
                <div className='hidden sm:flex gap-4 text-primary dark:text-white'>
                    <Link href='/' className={`navlinks ${pathname === "/" ? "active" : ""}`}>Home</Link>
                    <Link href='/skills' className={`navlinks ${pathname === "/skills" ? "active" : ""}`}>Skills</Link>
                    <Link href='/creations' className={`navlinks ${pathname.includes("/creations") ? "active" : ""}`}>Creations</Link>
                    <Link href='/contact' className={`navlinks ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
                </div>

                {/* Mobile menu toggle icon */}
                <div className="sm:hidden ml-2 mr-2">
                    {isOpen ? (
                        <MdClose
                            className="text-primary dark:text-white text-3xl"
                            onClick={handleToggleMenu}
                        />
                    ) : (
                        <MdMenuOpen
                            className="text-primary dark:text-white text-3xl"
                            onClick={handleToggleMenu}
                        />
                    )}
                </div>

                {/* Navlinks mobile */}
                <div
                    className={`${isOpen ? "flex" : "hidden"
                        } absolute top-12 left-0 w-full flex-col sm:hidden bg-white dark:bg-primary shadow-sm shadow-primary mt-0 pt-4 pb-2 items-center `}
                >
                    <div
                        ref={menuRef}
                        className="flex flex-col gap-2 text-primary dark:text-white w-[95%] bg-slate-50 dark:bg-[#11202c] py-2  items-center rounded-xl"
                    >
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/"
                            className={`navlinks ${pathname === "/" ? "active" : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/skills"
                            className={`navlinks ${pathname === "/skills" ? "active" : ""}`}
                        >
                            Skills
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/creations"
                            className={`navlinks ${pathname.includes("/creations") ? "active" : ""}`}
                        >
                            Creations
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/contact"
                            className={`navlinks ${pathname === "/contact" ? "active" : ""}`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                <div className={`border-l border-l-gray-900 dark:border-l-white pl-4`}><ThemeSwitch /></div>
            </div>
        </nav>
    );
}

export default Navbar;