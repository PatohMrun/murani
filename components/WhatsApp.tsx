import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp: React.FC = () => {
    return (
        <section className="fixed bottom-4 right-4 z-50">
            <Link
                href="https://wa.me/+254795556007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 hover:scale-110 transition-all duration-300 shadow-lg shadow-green-900/20 text-white"
            >
                <FaWhatsapp size={20} />
            </Link>
        </section>
    );
}

export default WhatsApp;