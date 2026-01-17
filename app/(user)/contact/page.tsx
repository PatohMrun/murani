'use client'
import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPaperPlane, FaEnvelope, FaPhone, FaLocationDot, FaWhatsapp, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        from_name: "",
        reply_to: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage("");
        setErrorMessage("");

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

        const templateParams = {
            from_name: formData.from_name,
            reply_to: formData.reply_to,
            subject: formData.subject,
            message: formData.message,
        };

        try {
            await emailjs.send(serviceId!, templateId!, templateParams, userId);
            setSuccessMessage("Message sent successfully!");
            setFormData({ from_name: "", reply_to: "", subject: "", message: "" });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                ? `Failed to send message: ${error.message}`
                : "Failed to send message. Please try again later.";
            setErrorMessage(errorMessage);
            console.error('Email send error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative font-poppins pt-24 pb-12 overflow-x-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-xs sm:text-sm font-bold text-blue-500 tracking-widest uppercase mb-2">Get in Touch</h2>
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-oswald text-gray-900 dark:text-white">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Connect</span>
                    </h1>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl">
                            <h3 className="text-2xl font-bold font-oswald mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Email</p>
                                        <a href="mailto:patrickmurani@gmail.com" className="text-sm sm:text-lg font-medium text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors whitespace-nowrap">patrickmurani@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 flex-shrink-0">
                                        <FaPhone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Phone</p>
                                        <a href="tel:+254795556007" className="text-sm sm:text-lg font-medium text-gray-900 dark:text-gray-200 hover:text-blue-500 transition-colors whitespace-nowrap">+254 795 556 007</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 flex-shrink-0">
                                        <FaLocationDot size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">Location</p>
                                        <p className="text-sm sm:text-lg font-medium text-gray-900 dark:text-gray-200">Nairobi, Kenya</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                            {[
                                { icon: FaGithub, href: "https://github.com/PatohMrun", color: "hover:bg-gray-800" },
                                { icon: FaLinkedin, href: "https://www.linkedin.com/in/patrick-murani", color: "hover:bg-blue-700" },
                                { icon: FaWhatsapp, href: "https://wa.me/+254795556007", color: "hover:bg-green-600" },
                                { icon: FaInstagram, href: "https://www.instagram.com/mrunphotography", color: "hover:bg-pink-600" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-600 dark:text-gray-300 transition-all duration-300 hover:text-white hover:-translate-y-1 ${social.color}`}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />

                        <h3 className="text-2xl font-bold font-oswald mb-8 text-gray-900 dark:text-white">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                                        placeholder="e.g. Kamau Juma"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="reply_to"
                                        value={formData.reply_to}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                                        placeholder="kamau@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none dark:text-white"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <FaPaperPlane />
                                    </>
                                )}
                            </button>

                            {successMessage && (
                                <p className="text-green-500 text-center text-sm font-medium animate-pulse">{successMessage}</p>
                            )}
                            {errorMessage && (
                                <p className="text-red-500 text-center text-sm font-medium">{errorMessage}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Contact;