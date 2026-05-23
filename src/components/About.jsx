import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background soft circle */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Dynamic Cards representing features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="grid grid-cols-2 gap-4 max-w-[400px] w-full">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-between h-40 transform hover:-translate-y-1 transition-transform duration-300">
                <Heart className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-bold text-secondary text-base">Pet Well-being</h4>
                  <p className="text-xs text-gray-500 mt-1">Health comes first, always.</p>
                </div>
              </div>
              <div className="bg-emerald-950 text-white p-6 rounded-2xl flex flex-col justify-between h-40 mt-6 transform hover:-translate-y-1 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-bold text-base">Shared Trust</h4>
                  <p className="text-xs text-emerald-200/80 mt-1">Secure family sharing.</p>
                </div>
              </div>
              <div className="col-span-2 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center space-x-4 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Simplifying Daily Schedules</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Automated updates, medicine alerts, and fun memories.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Text Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 text-left"
          >
            <span className="text-primary font-semibold tracking-wider text-sm uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-6 mb-6 leading-tight">
              About Pet Horizon
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Pet Horizon is a modern pet care management platform designed to help pet owners organize and simplify every aspect of their pet’s life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From feeding schedules and medicine reminders to budget tracking, activity timelines, and birthday celebrations — Pet Horizon keeps everything connected in one place. We remove the stress of manual tracking so you can focus on building lifelong memories with your pets.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
