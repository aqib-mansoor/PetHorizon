
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#050b08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/10 via-[#050b08] to-[#040806] relative overflow-hidden">
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Dynamic Premium Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center w-full"
          >
            <div className="grid grid-cols-2 gap-5 max-w-[480px] w-full">
              {/* Card 1 */}
              <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col justify-between h-44 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] hover:border-primary/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Pet Well-being</h4>
                  <p className="text-xs text-emerald-100/50 mt-1">Health comes first, always.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-black/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-emerald-500/20 flex flex-col justify-between h-44 mt-6 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Shared Trust</h4>
                  <p className="text-xs text-emerald-100/60 mt-1">Secure family sharing.</p>
                </div>
              </div>

              {/* Card 3 (Double width) */}
              <div className="col-span-2 bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 flex items-center space-x-5 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] hover:border-primary/40 transition-all duration-300 group">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-yellow-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Sparkles className="w-6 h-6 fill-yellow-500" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm">Simplifying Daily Schedules</h4>
                  <p className="text-xs text-emerald-100/50 mt-1">Automated updates, medicine alerts, and fun memories.</p>
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
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-6 leading-tight">
              About Pet Horizon
            </h2>
            <p className="text-lg text-emerald-100/70 leading-relaxed mb-6">
              Pet Horizon is a modern pet care management platform designed to help pet owners organize and simplify every aspect of their pet’s life.
            </p>
            <p className="text-emerald-100/50 leading-relaxed text-sm">
              From feeding schedules and medicine reminders to budget tracking, activity timelines, and birthday celebrations — Pet Horizon keeps everything connected in one place. We remove the stress of manual tracking so you can focus on building lifelong memories with your pets.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
