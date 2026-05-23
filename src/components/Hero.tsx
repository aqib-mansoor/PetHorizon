import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const bgImages = [
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1600'
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3000);

    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
      
      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, delay: 0.2 }
      )
      .fromTo(subheadlineRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        '-=0.7'
      )
      .fromTo(buttonsRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0 }, 
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20"
    >
      {/* Background Image Slideshow with smooth crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
          />
        </AnimatePresence>
        {/* Dark vignette overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
        <div className="max-w-3xl">
          
          {/* Logo/Icon mini-heading */}
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-primary px-4 py-2 rounded-full mb-6">
            <PawPrint className="w-4 h-4 fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Smart Pet Care Platform</span>
          </div>

          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Your Complete <span className="bg-primary text-white px-3 py-1 rounded-2xl inline-block shadow-lg shadow-emerald-500/20">Smart Pet Care</span> Companion 🐾
          </h1>
          
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl"
          >
            Manage your pet’s daily life, health, schedules, expenses, family access, reminders, and memories — all in one powerful, unified platform.
          </p>
          
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#pricing"
              className="bg-primary hover:bg-emerald-600 text-white text-center px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/35 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#features"
              className="border-2 border-white/30 hover:border-white text-white bg-white/10 hover:bg-white/20 text-center px-8 py-4 rounded-2xl font-bold backdrop-blur-sm transition-all duration-200"
            >
              Explore Features
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}
