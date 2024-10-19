'use client'
import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";

const Contact:React.FC = () => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous messages
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

        emailjs.send(serviceId!, templateId!, templateParams, userId)
        .then(() => {
            setSuccessMessage("Message sent successfully!");
            setFormData({ from_name: "", reply_to: "", subject: "", message: "" }); // Reset form
        })
        .catch(() => {
            setErrorMessage("Failed to send message. Please try again later.");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };


    return ( 
        <section id="contact" className="p-4 min-h-[80vh]">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-200 mb-6 text-center">Get in Touch</h3>
          <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                value={formData.from_name}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="reply_to"
                placeholder="Your Email"
                value={formData.reply_to}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors md:col-span-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          </form>
        </section>
     );
}
 
export default Contact;