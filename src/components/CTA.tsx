
import { motion } from 'framer-motion';
import { PawPrint, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-[#040806] relative overflow-hidden">
      {/* Soft background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-emerald-950 via-[#06100c] to-emerald-950 text-white rounded-[2rem] p-10 md:p-16 overflow-hidden shadow-2xl border border-emerald-500/20"
        >
          {/* Decorative floating shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 left-12 text-primary/10 pointer-events-none hidden md:block"
          >
            <PawPrint className="w-16 h-16 rotate-12" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-6 right-16 text-primary/10 pointer-events-none hidden md:block"
          >
            <PawPrint className="w-10 h-10 -rotate-45" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            <div className="bg-primary/20 text-emerald-300 border border-primary/30 p-2.5 rounded-2xl flex items-center justify-center space-x-2 mb-6 animate-pulse shadow-md">
              <Sparkles className="w-4 h-4 fill-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-wider">Start Today</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              Ready to simplify your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">pet care experience?</span>
            </h2>
            <p className="text-emerald-100/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Start managing your pets smarter with Pet Horizon today 🐾
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="bg-primary hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-600/35 transition-all duration-200 text-center"
              >
                Download App
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/50 font-bold px-8 py-4 rounded-2xl transition-all duration-200 text-center backdrop-blur-sm shadow-sm"
              >
                Join Premium
              </motion.a>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
