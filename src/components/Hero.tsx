import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, Star, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import appStoreImg from '../assets/app-store.svg';
import googlePlayImg from '../assets/google-play.svg';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // SEO Optimization
  useEffect(() => {
    document.title = 'Pet Horizon – Complete Smart Assistant for Your Pet’s Longevity';
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Manage custom medicine regimens, log daily health markers, coordinate shared family pet-sitting tasks, and optimize nutrition with a clinical, veterinarian-approved tracking engine.';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // GSAP Entrance Sequence Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      
      tl.fromTo(leftColRef.current, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, delay: 0.3 }
      )
      .fromTo(rightColRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0 }, 
        '-=0.9'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 sm:py-24 bg-white"
    >
      {/* Visual Backdrops & Light Mode Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Premium High-Conversion Copy & Actions */}
          <div ref={leftColRef} className="lg:col-span-7 text-center sm:text-left flex flex-col gap-6">
            
            {/* Active App Live Badge */}
            <div className="inline-flex items-center space-x-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-full w-fit mx-auto sm:mx-0 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-xs font-bold uppercase tracking-wider">Version 2.0 Now Live on iOS & Android 🚀</span>
            </div>

            {/* Premium Typography Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-2">
              The Ultimate Smart Assistant For Your{' '}
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
                Pet’s Longevity & Life
              </span>
            </h1>

            {/* Authoritative Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              Manage specialized medication regimens, log daily health markers, coordinate shared family pet-sitting tasks, and optimize nutrition tracking with a clinical, veterinarian-approved tracking engine built directly into your pocket.
            </p>

            {/* Interactive Asymmetric CTA Block */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(16,185,129,0.3)' }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 group transition-all duration-300 relative overflow-hidden shadow-lg shadow-emerald-500/20"
              >
                <span>Get Started Free</span>
                <span className="relative z-10 block transition-transform group-hover:translate-x-1 duration-300">→</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className="border-2 border-slate-200 hover:border-emerald-500/40 text-slate-800 bg-slate-50/80 hover:bg-slate-100 px-8 py-3.5 rounded-2xl font-bold transition-all duration-300"
              >
                Explore Features
              </motion.a>
            </div>{/* end CTA block */}

            {/* App Store Badges & Ratings Block */}
            <div className="flex flex-wrap items-center gap-5 mt-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-4 py-3 shadow-md">
                <motion.a 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  href="https://play.google.com/store/apps" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center transition-all duration-200"
                >
                  <img src={googlePlayImg} alt="Get it on Google Play" className="h-[44px] w-auto object-contain hover:opacity-90" />
                </motion.a>
                <div className="w-px h-8 bg-white/20" />
                <motion.a 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  href="https://apps.apple.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center transition-all duration-200"
                >
                  <img src={appStoreImg} alt="Download on the App Store" className="h-[44px] w-auto object-contain hover:opacity-90" />
                </motion.a>
              </div>

              <div className="flex flex-col text-left justify-center">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-slate-900 font-extrabold text-sm ml-1.5">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Over 145,000+ Reviews &bull; 100% Secure &amp; Encrypted
                </p>
              </div>
            </div>

          </div>{/* end left column */}


          {/* RIGHT COLUMN: App Showcase Viewport Mockup & Retriever */}
          <div ref={rightColRef} className="lg:col-span-5 relative flex items-center justify-center min-h-[480px] sm:min-h-[580px]">
            
            {/* Background floating Retriever Card Portrait */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[280px] sm:w-[360px] aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl z-0 right-4 sm:right-10 top-4 filter contrast-105"
            >
              <img
                src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg"
                alt="Happy Golden Retriever Showcase"
                className="w-full h-full object-cover"
                loading="eager"
              />
              {/* High-Contrast Gradient Readability Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-left flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-black text-sm uppercase tracking-widest">Premium Member</span>
                </div>
                <h4 className="text-white font-black text-xl">Max’s Active Log</h4>
                <p className="text-emerald-200 text-xs font-semibold">100% Adherence • Immune Status: Safe</p>
              </div>
            </motion.div>

            {/* Silver Premium Light-Theme Phone Mockup UI */}
            <motion.div
              animate={{ y: [12, 0, 12] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.03 }}
              className="relative w-[230px] sm:w-[270px] bg-slate-50 rounded-[3rem] border-4 border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.15)] z-10 left-[-40px] sm:left-[-80px] bottom-[-40px] sm:bottom-[-60px] overflow-hidden flex flex-col cursor-pointer transition-all duration-500"
              style={{ perspective: 1000 }}
            >
              {/* Notch */}
              <div className="w-24 h-5 bg-slate-200 rounded-full mx-auto mt-2.5 flex items-center justify-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                <div className="w-8 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* Application Dashboard Content Screen */}
              <div className="p-4 sm:p-5 text-left flex flex-col gap-4 bg-white flex-1 min-h-[360px]">
                
                {/* Profile Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Active Profile</p>
                    <h3 className="font-extrabold text-sm text-slate-800">Max (Retriever)</h3>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>

                {/* Longevity Health Gauge Card */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Health Score</span>
                    <span className="text-emerald-600 text-xs font-black">94 / 100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '94%' }} />
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium">Clinical diagnostics fully stable</span>
                </div>

                {/* Daily Static Metrics Checklist */}
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Daily Schedule</p>
                  
                  {/* Row item 1 */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div className="text-[11px] text-slate-700">
                      <p className="font-bold">Caloric Meal</p>
                      <p className="text-[9px] text-slate-400">08:00 AM • Completed</p>
                    </div>
                  </div>

                  {/* Row item 2 */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div className="text-[11px] text-slate-700">
                      <p className="font-bold">Medicine Pill</p>
                      <p className="text-[9px] text-slate-400">12:00 PM • Completed</p>
                    </div>
                  </div>

                  {/* Row item 3 */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50/50 border border-slate-100/50 opacity-60">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 flex-shrink-0" />
                    <div className="text-[11px] text-slate-600">
                      <p className="font-bold">Outdoor Run</p>
                      <p className="text-[9px] text-slate-400">06:30 PM • Scheduled</p>
                    </div>
                  </div>
                </div>

                {/* Micro-Notification Alarm Badge */}
                <div className="mt-auto p-2.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <div className="text-[10px]">
                    <p className="font-extrabold text-emerald-800">Medication Alarm Alert</p>
                    <p className="text-slate-500 font-semibold">Glucose Check in 15m</p>
                  </div>
                </div>

              </div>

              {/* Bottom Navigation Indicator Bar */}
              <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mb-2" />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}