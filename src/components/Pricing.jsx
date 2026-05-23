import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const freeFeatures = [
    '1 Pet Limit',
    'Basic Pet Management',
    'Feeding & Schedule Tracking',
    'Journal System',
    'Expense Tracking',
    'Birthday Features',
  ];

  const premiumFeatures = [
    'Unlimited Pets',
    'Family Sharing',
    'Invite Members',
    'Advanced Permissions',
    'Premium Dashboard Features',
    'Shared Activity Management',
    'Multi-Pet Access',
  ];

  return (
    <section id="pricing" className="py-24 bg-[#080d0b] relative overflow-hidden">
      {/* Background soft light */}
      <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
            Flexible Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-4">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Transparent</span> Pricing
          </h2>
          <p className="text-emerald-100/60 text-lg">
            Choose the perfect companion plan for your pet family.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-sm font-semibold transition-colors duration-200 ${!isYearly ? 'text-white' : 'text-emerald-100/40'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-1 transition-colors duration-200 focus:outline-none relative cursor-pointer"
            >
              <motion.div
                layout
                className="w-6 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors duration-200 ${isYearly ? 'text-white' : 'text-emerald-100/40'} flex items-center space-x-1.5`}>
              <span>Yearly</span>
              <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                Save 17%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-20">
          
          {/* Free Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 text-left">
                <h3 className="text-2xl font-extrabold text-white mb-2">Free Plan</h3>
                <p className="text-emerald-100/50 text-sm">Essential pet care tools</p>
              </div>
              <div className="flex items-baseline text-white mb-8 text-left">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-emerald-100/40 text-sm ml-1">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-left">
                {freeFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start text-emerald-100/70 text-sm hover:translate-x-1 transition-transform duration-200">
                    <div className="bg-primary/20 border border-primary/30 p-0.5 rounded-full mr-3 flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => alert("Welcome to Pet Horizon Free!")}
              className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold border border-white/10 transition-all duration-200 shadow-sm cursor-pointer backdrop-blur-sm"
            >
              Get Started
            </button>
          </motion.div>

          {/* Premium Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="bg-gradient-to-br from-primary/20 via-emerald-900/40 to-black/40 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-primary/50 shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)] flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/40 rounded-full blur-[60px] pointer-events-none group-hover:scale-110 group-hover:bg-primary/50 transition-all duration-500"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="text-left z-10 relative">
                  <span className="bg-gradient-to-r from-primary to-emerald-400 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    Most Popular
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-2">Premium Plan</h3>
                  <p className="text-emerald-100/60 text-sm">Unlimited smart care</p>
                </div>
                <div className="bg-primary/20 border border-primary/30 p-2 rounded-xl">
                  <Star className="w-6 h-6 text-primary fill-primary animate-pulse" />
                </div>
              </div>
              <div className="flex items-baseline text-white mb-8 text-left">
                <span className="text-5xl font-extrabold">
                  {isYearly ? '$4.16' : '$4.99'}
                </span>
                <span className="text-emerald-100/50 text-sm ml-1 font-medium">
                  {isYearly ? '/month (billed yearly)' : '/month'}
                </span>
              </div>
              <ul className="space-y-4 mb-8 text-left">
                {premiumFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start text-white text-sm hover:translate-x-1 transition-transform duration-200">
                    <div className="bg-primary p-0.5 rounded-full mr-3 flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-medium text-emerald-50">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => alert("Redirecting to Premium checkout...")}
              className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-emerald-400 hover:to-emerald-600 text-white py-4 rounded-2xl font-bold shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all duration-300 cursor-pointer relative z-10 hover:scale-[1.02]"
            >
              Join Premium
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
