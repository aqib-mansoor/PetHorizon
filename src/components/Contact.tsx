import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Heart } from 'lucide-react';

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormDataState>({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the fields!");
      return;
    }
    alert("Message sent (demo)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#050b08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/10 via-[#050b08] to-[#040806] relative overflow-hidden">
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Info card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl"
          >
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-6 mb-6">
              Contact Us
            </h2>
            <p className="text-emerald-100/60 leading-relaxed mb-8">
              Have questions about premium subscriptions, or want to suggest new features? Shoot us a message! We love feedback.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:support@pethorizon.com"
                className="flex items-center space-x-4 group p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
              >
                <div className="bg-primary/10 group-hover:bg-primary border border-primary/20 group-hover:border-primary text-primary group-hover:text-white p-3 rounded-2xl transition-all duration-300 shadow-md">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Email Support</h4>
                  <p className="text-emerald-100/50 text-sm group-hover:text-primary transition-colors duration-200">
                    support@pethorizon.com
                  </p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-2 border border-transparent">
                <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-2xl shadow-md">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Response Time</h4>
                  <p className="text-emerald-100/50 text-sm">Within 24 hours on business days.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-8 flex items-center space-x-2 text-xs text-emerald-100/30">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" />
              <span>for pet owners worldwide.</span>
            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label htmlFor="contact-name" className="block text-sm font-semibold text-emerald-100/80 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="contact-email" className="block text-sm font-semibold text-emerald-100/80 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="contact-message" className="block text-sm font-semibold text-emerald-100/80 mb-2">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  placeholder="Write your message here..."
                  className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200 resize-none"
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-600/35 flex items-center justify-center space-x-2 transition-all duration-200 cursor-pointer"
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
