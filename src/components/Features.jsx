import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PawPrint,
  Calendar,
  Activity,
  BookOpen,
  Cake,
  DollarSign,
  Package,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Features() {
  const coreFeatures = [
    {
      title: 'Pet Management',
      description: 'Create detailed profiles for breeds, medical histories, and customized character tags.',
      icon: PawPrint,
    },
    {
      title: 'Smart Scheduling',
      description: 'Set recurring tasks for meals, walks, grooming sessions, and vet appointments.',
      icon: Calendar,
    },
    {
      title: 'Activity Timeline',
      description: 'Log and review all health checks, medication updates, and milestones chronologically.',
      icon: Activity,
    },
    {
      title: 'Journal & Memories',
      description: 'Document special moments, snap photos, and write journals to save precious memories.',
      icon: BookOpen,
    },
    {
      title: 'Birthday System 🎂',
      description: 'Never miss a celebration. Log birthdays, set reminders, and receive custom party tips.',
      icon: Cake,
    },
    {
      title: 'Expense & Budget Tracking',
      description: 'Monitor feeding budgets, vet bills, accessories, and analyze costs visually.',
      icon: DollarSign,
    },
    {
      title: 'Inventory Management',
      description: 'Track food supplies, favorite toys, medicines, and receive alerts when stocks run low.',
      icon: Package,
    },
    {
      title: 'Family & Sharing',
      description: 'Invite co-owners, partners, or pet sitters, setting permissions for shared care.',
      icon: Users,
    },
    {
      title: 'Notifications & Alerts',
      description: 'Get push alerts, SMS, or email reminders so you never forget crucial appointments.',
      icon: Bell,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = coreFeatures.length - visibleCards;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section id="features" className="py-24 bg-[#09100d] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-[#09100d] to-[#080d0b] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-4 leading-tight">
              Powerful Features for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Modern Pet Care</span>
            </h2>
            <p className="text-emerald-100/70 text-lg">
              Explore the primary features designed to keep your pet care organized and stress-free.
            </p>
          </div>
          
          {/* Slider Controllers */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer"
              aria-label="Previous Feature"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary text-white flex items-center justify-center transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer"
              aria-label="Next Feature"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden -mx-4 px-4 py-4">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * (100 / visibleCards)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {coreFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 px-4 flex-shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] hover:border-primary/50 transition-all duration-300 group text-left h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg shadow-emerald-500/10">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                        {feat.title}
                      </h3>
                      <p className="text-emerald-100/60 leading-relaxed text-sm">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-2.5 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === i ? 'w-8 bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
