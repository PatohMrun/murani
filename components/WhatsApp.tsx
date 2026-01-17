import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp: React.FC = () => {
    return (
        <section className="fixed bottom-16 right-3 z-50 rounded-lg bg-green-600 hover:bg-green-700 p-1 shadow-lg shadow-primary dark:shadow-gray-800 drop-shadow-2xl">
            <Link href="https://wa.me/+254795556007" target="_blank" rel="noopener noreferrer" className=" text-primary dark:text-white "><FaWhatsapp size={32} /></Link>

        </section>
    );
}

export default WhatsApp;