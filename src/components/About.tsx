import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-24 bg-section-light relative overflow-hidden text-left">
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Premium Floating Pet Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center w-full"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-[480px] aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-emerald-500/20 shadow-2xl bg-emerald-950/10 group cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800"
                alt="Happy Beagle Dog Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Premium overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-4.5 h-4.5 text-emerald-400 fill-emerald-400/20" />
                  <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-widest">Platform Integrity</span>
                </div>
                <h4 className="text-white font-black text-xl mt-1">Smarter Daily Care Decisions</h4>
                <p className="text-emerald-100/60 text-xs mt-0.5">Logs, schedules, medical trackers, and daily routines unified.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Text Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-6 leading-tight">
              About Pet Horizon
            </h2>
            <p className="text-lg text-emerald-100/70 leading-relaxed mb-6">
              Pet Horizon is a modern pet care management platform designed to help pet owners organize and simplify every aspect of their pet's life.
            </p>
            <p className="text-emerald-100/45 leading-relaxed text-sm">
              From feeding schedules and medicine reminders to budget tracking, activity timelines, and birthday celebrations — Pet Horizon keeps everything connected in one place. We remove the stress of manual tracking so you can focus on building lifelong memories with your pets.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
