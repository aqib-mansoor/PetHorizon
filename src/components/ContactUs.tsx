import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, User, MessageSquare, Phone } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields!');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4">
            We'd Love to Hear From You ✉️
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            Have questions about Pet Horizon or need assistance? Reach out today.
          </p>
        </div>

        {/* Asymmetric Split Layout Card Container */}
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-slate-200 bg-[#F8FAFC] overflow-hidden shadow-sm relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            
            {/* LEFT REGION: Brand & Info Panel (5 Cols) */}
            <div className="md:col-span-5 bg-emerald-50/70 border-r border-slate-200 p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-250 bg-emerald-100/60 w-fit">
                  Contact Info
                </span>
                
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Connect Directly With Our Pet Experts
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Our dedicated support team is available 24/7 to help you with pet scheduling, breed tracking configurations, and app features.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                      <p className="text-sm font-bold text-slate-700">support@pethorizon.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                      <p className="text-sm font-bold text-slate-700">+1 (800) PET-HORIZON</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10 pt-8">
                <span>Fast response within 24 hours</span>
              </div>
            </div>

            {/* RIGHT REGION: Interactive Form (7 Cols) */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center text-left bg-white">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h4 className="text-2xl font-black text-slate-900">Send Us a Message</h4>
                      <p className="text-slate-500 text-sm mt-1 font-medium">Fill out the form below and we will get back to you shortly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Your Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
                            required
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address *</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
                            required
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Phone Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Subject Option */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-none transition appearance-none"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Message *</label>
                        <div className="relative">
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="How can we help you and your pet companion?"
                            rows={4}
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition resize-none"
                            required
                          />
                          <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-6" />
                        </div>
                      </div>

                      {/* Action button */}
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/10 uppercase tracking-widest text-xs transition cursor-pointer flex items-center justify-center gap-2 group mt-6"
                      >
                        <Send className="w-4 h-4 animate-pulse" />
                        <span>Send Message</span>
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-8 gap-5 bg-white"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-slate-900">Message Sent! 🎉</h4>
                      <p className="text-slate-500 text-sm mt-1.5 leading-relaxed max-w-sm mx-auto font-medium">
                        Thank you, <span className="text-emerald-600 font-extrabold">{formData.name}</span>. We have received your inquiry regarding <span className="text-slate-800 font-extrabold">{formData.subject}</span> and will get back to you shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
