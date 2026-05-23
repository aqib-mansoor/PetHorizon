import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, LayoutDashboard } from 'lucide-react';

export default function SmartFeatures() {
  const smartFeats = [
    {
      title: 'Active Pet System',
      description: 'Switch between multiple pet profiles instantly. The entire interface adapts to show schedules, records, and diaries for the active pet with one click.',
      icon: Layers,
      color: 'bg-emerald-50 text-primary border-emerald-100',
    },
    {
      title: 'Breed-Based Features',
      description: 'Unlock customized feeding guidelines, potential health risk advice, and training checklists automatically based on your pet’s registered breed.',
      icon: Sparkles,
      color: 'bg-emerald-50 text-primary border-emerald-100',
    },
    {
      title: 'Real-Time Dashboard',
      description: 'A live feed showing today’s calendar, medication timetables, activity logs, and system notifications. See your pet’s status at a single glance.',
      icon: LayoutDashboard,
      color: 'bg-emerald-50 text-primary border-emerald-100',
    },
  ];

  return (
    <section id="smart-features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold tracking-wider text-sm uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
            Intelligent Companionship
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mt-6 mb-4">
            Smart Features
          </h2>
          <p className="text-gray-600 text-lg">
            Experience next-generation pet care powered by tailored smart engines.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {smartFeats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-3xl border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 text-left"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} border flex items-center justify-center mb-6`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
