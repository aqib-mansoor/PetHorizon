import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Heart } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the fields!");
      return;
    }
    alert("Message sent (demo)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-lightgreen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left bg-white p-8 md:p-10 rounded-3xl border border-emerald-100 shadow-sm"
          >
            <span className="text-primary font-semibold tracking-wider text-sm uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold text-secondary mt-6 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Have questions about premium subscriptions, or want to suggest new features? Shoot us a message! We love feedback.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:support@pethorizon.com"
                className="flex items-center space-x-4 group p-1.5 rounded-xl hover:bg-emerald-50/50 transition-colors"
              >
                <div className="bg-emerald-50 group-hover:bg-primary/10 border border-emerald-100 text-primary p-3 rounded-xl transition-colors duration-200">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Email Support</h4>
                  <p className="text-gray-500 text-sm group-hover:text-primary transition-colors duration-200">
                    support@pethorizon.com
                  </p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-1.5">
                <div className="bg-emerald-50 border border-emerald-100 text-primary p-3 rounded-xl">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Response Time</h4>
                  <p className="text-gray-500 text-sm">Within 24 hours on business days.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-10 pt-8 flex items-center space-x-2 text-xs text-gray-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />
              <span>for pet lovers worldwide.</span>
            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-emerald-100 shadow-sm w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-secondary mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white rounded-2xl p-4 text-sm text-secondary focus:outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white rounded-2xl p-4 text-sm text-secondary focus:outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-secondary mb-2">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white rounded-2xl p-4 text-sm text-secondary focus:outline-none transition-all duration-200 resize-none"
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
