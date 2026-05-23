import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, PlusCircle, CalendarClock, PenTool, Share2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: 'Step 1',
      title: 'Create Account & Verify',
      description: 'Sign up in seconds and verify your email to unlock your personal pet care dashboard.',
      icon: UserCheck,
    },
    {
      step: 'Step 2',
      title: 'Add Pet Profile',
      description: 'Enter your pet’s name, breed, age, weight, vaccine status, and unique temperament tags.',
      icon: PlusCircle,
    },
    {
      step: 'Step 3',
      title: 'Set Schedules & Reminders',
      description: 'Setup custom feeding slots, routine medicines, daily walks, and custom sound alerts.',
      icon: CalendarClock,
    },
    {
      step: 'Step 4',
      title: 'Track Daily Life',
      description: 'Log weights, food consumption, coordinate medical alerts, journals, and expense sheets.',
      icon: PenTool,
    },
    {
      step: 'Step 5',
      title: 'Invite Shared Caregivers',
      description: 'Add family members or pet sitters with individual permission settings for unified care.',
      icon: Share2,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0a120e] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
            Getting Started
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-4">
            How It Works
          </h2>
          <p className="text-emerald-100/70 text-lg">
            Start organizing your pet family’s routines in 5 simple steps.
          </p>
        </div>

        {/* Timeline Stepper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-8 lg:left-1/2 top-2 bottom-2 w-1 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2 hidden md:block rounded-full"></div>

          <div className="space-y-16">
            {steps.map((item, index) => {
              const IconComp = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge (Circle) */}
                  <div className="absolute left-8 lg:left-1/2 top-4 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0a120e] border-[3px] border-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] z-20 hidden md:flex group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                    {index + 1}
                  </div>

                  {/* Left/Right Container */}
                  <div className="w-full md:w-1/2 md:px-12 text-left">
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] hover:border-primary/40 transition-all duration-300 relative group">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-primary/20 text-emerald-300 border border-primary/30 font-extrabold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {item.step}
                        </span>
                        <div className="text-primary md:hidden">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                        <span>{item.title}</span>
                        <div className="text-emerald-100/30 group-hover:text-primary transition-colors duration-300 hidden md:block">
                          <IconComp className="w-6 h-6" />
                        </div>
                      </h3>
                      <p className="text-emerald-100/60 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty Spacer For Desktop Alignment */}
                  <div className="w-full md:w-1/2 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
