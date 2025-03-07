import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null },
    });

    try {
      // Replace with your actual EmailJS service ID, template ID, and public key
      await emailjs.sendForm(
        "service_wktkt7j",
        "template_03w6toc",
        form.current,
        "YfwRbA59kdTP9_-BC"
      );

      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: "Message sent successfully!" },
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Email submission error:", error);
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg: "An error occurred. Please try again later.",
        },
      });
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "Email",
      value: "ken@kensamonte.com",
      link: "mailto:ken@kensamonte.com",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Location",
      value: "Quezon City, Philippines",
      link: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      label: "Connect",
      value: "LinkedIn",
      link: "https://www.linkedin.com/in/kensamonte/",
    },
  ];

  return (
    <section id="contact" className="py-16 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-300">Get In Touch</h2>
        </div>
        <p className="text-slate-400 max-w-3xl mb-12">
          Feel free to reach out to me if you have something in mind or just
          want to connect! I don't bite.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

          <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>

          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <AnimatedInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name"
              />
            </div>

            <div>
              <AnimatedInput
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            <div>
              <AnimatedInput
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div>
              <AnimatedInput
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              className={`w-full py-3 px-4 font-medium rounded-lg cursor-pointer transition duration-200 ${
                status.submitting
                  ? "bg-slate-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={status.submitting}
              whileHover={{
                scale: status.submitting ? 1 : 1.03,
                boxShadow: status.submitting
                  ? "none"
                  : "0 4px 15px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: status.submitting ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {status.submitting ? "Sending..." : "Send Message"}
            </motion.button>

            {status.info.msg && (
              <motion.div
                className={`p-3 rounded-lg text-sm ${
                  status.info.error
                    ? "bg-red-900/50 text-red-200"
                    : "bg-green-900/50 text-green-200"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status.info.msg}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

          <h3 className="text-xl font-bold text-white mb-6">
            Contact Information
          </h3>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400"
                  whileHover={{
                    backgroundColor: "rgba(59, 130, 246, 0.3)",
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {item.icon}
                </motion.div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-400">
                    {item.label}
                  </h4>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-md text-blue-400 hover:text-blue-300 transition"
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-md text-white">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
            <p className="text-md text-slate-300">
              My typical response time is within 24 hours.
            </p>
          </div>
        </motion.div>
      </div>

      <section id="footer" className="">
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-400">
            © {new Date().getFullYear()} Ken Samonte. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Built with React and Vite. All images and creative works on this
            site belong to Ken Samonte.
          </p>
        </div>
      </section>
    </section>
  );
};

const AnimatedInput = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {rows ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder={placeholder}
        />
      )}
    </motion.div>
  );
};

export default Contact;
