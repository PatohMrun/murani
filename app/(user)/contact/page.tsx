'use client'
import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

    const headerRef = React.useRef(null);
    const formRef = React.useRef(null);

    const isHeaderInView = useInView(headerRef, { once: true });
    const isFormInView = useInView(formRef, { once: true });

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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="contact" className="p-4 min-h-[80vh]">
            <motion.h3
                ref={headerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6 text-center"
            >
                Get in Touch
            </motion.h3>
            
            <motion.form
                ref={formRef}
                variants={containerVariants}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
                className="max-w-2xl mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.input
                        variants={itemVariants}
                        type="text"
                        name="from_name"
                        placeholder="Your Name"
                        value={formData.from_name}
                        onChange={handleChange}
                        className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isSubmitting}
                    />
                    <motion.input
                        variants={itemVariants}
                        type="email"
                        name="reply_to"
                        placeholder="Your Email"
                        value={formData.reply_to}
                        onChange={handleChange}
                        className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isSubmitting}
                    />
                    <motion.input
                        variants={itemVariants}
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                        required
                        disabled={isSubmitting}
                    />
                    <motion.textarea
                        variants={itemVariants}
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                        required
                        disabled={isSubmitting}
                    />
                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors md:col-span-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </motion.button>
                </div>
                {successMessage && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-500 mt-4 text-center"
                    >
                        {successMessage}
                    </motion.p>
                )}
                {errorMessage && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 mt-4 text-center"
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </motion.form>
        </section>
    );
}

export default Contact;