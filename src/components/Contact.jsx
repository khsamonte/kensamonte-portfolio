import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
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
      // This would normally be an API call to your backend or a service like Formspree
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

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
      value: "khsamonte@gmail.com",
      link: "mailto:khsamonte@gmail.com",
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
        <h2 className="text-3xl font-bold mb-4 text-blue-300">Get In Touch</h2>
        <p className="text-slate-400 max-w-3xl mb-12">
          Feel free to reach out if you have a project in mind or just want to
          connect.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Name"
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Subject"
              />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
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
              whileHover={{ scale: status.submitting ? 1 : 1.03 }}
              whileTap={{ scale: status.submitting ? 1 : 0.98 }}
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
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Contact Information
          </h3>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                  {item.icon}
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-400">
                    {item.label}
                  </h4>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-lg text-blue-400 hover:text-blue-300 transition"
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
                    <p className="text-lg text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
            <p className="text-slate-300">
              My typical response time is within 24 hours.
            </p>

            {/* <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-400 mb-2">
                Preferred Working Hours
              </h4>
              <p className="text-white">
                Monday to Friday: 9:00 AM - 6:00 PM (PHT / GMT+8)
              </p>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-400">
          © {new Date().getFullYear()} Ken Samonte. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Built with React and Vite.
        </p>
      </div>
    </section>
  );
};

export default Contact;
