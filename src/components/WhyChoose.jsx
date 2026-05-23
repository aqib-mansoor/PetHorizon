import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function WhyChoose() {
  const benefits = [
    { title: 'All-in-One Dashboard', desc: 'Schedules, health, and memories unified in a single space.' },
    { title: 'Multi-Pet Adaptability', desc: 'Toggle and manage profiles for all your pets seamlessly.' },
    { title: 'Smart Auto-Reminders', desc: 'Get alerts for feeds, medicines, vaccines, and vet visits.' },
    { title: 'Shared Family Access', desc: 'Coordinate care with family, sitters, and custom permission levels.' },
    { title: 'Detailed Health Logs', desc: 'Track weights, health markers, and long-term diagnostic histories.' },
    { title: 'Built-in Expense Tracker', desc: 'Control costs on food, healthcare, toys, and monitor budgets.' },
    { title: 'Secure & Private Platform', desc: 'Your pet’s memories and shared records are fully encrypted.' },
    { title: 'Breed-Specific Guidance', desc: 'Access tailored nutrition advice and care tips for specific breeds.' },
  ];

  return (
    <section id="why-choose" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual stats and badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left"
          >
            <span className="text-primary font-semibold tracking-wider text-sm uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              The Pet Horizon Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-6 mb-6 leading-tight">
              Why Choose Pet Horizon?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              We design our companion platform to be as loving, careful, and proactive as you are with your furry family members.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-lightgreen border border-emerald-100">
                <div className="bg-white p-3 rounded-xl">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">#1 Smart Care App</h4>
                  <p className="text-xs text-gray-500">Voted best upcoming companion tool in 2026.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-lightgreen border border-emerald-100">
                <div className="bg-white p-3 rounded-xl">
                  <HeartHandshake className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Made by Vet Advisors</h4>
                  <p className="text-xs text-gray-500">Every feature is guided by professional veterinary advice.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 8-item checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="flex items-start space-x-3 p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-gray-50/50 hover:bg-emerald-50/20 transition-all duration-300 text-left"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-secondary text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
