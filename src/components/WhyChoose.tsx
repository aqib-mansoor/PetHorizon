
import { motion } from 'framer-motion';
import { CheckCircle2, Award, HeartHandshake } from 'lucide-react';

interface BenefitItem {
  title: string;
  desc: string;
}

export default function WhyChoose() {
  const benefits: BenefitItem[] = [
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
    <section id="why-choose" className="py-24 bg-[#050b08] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/10 via-[#050b08] to-[#040806] relative overflow-hidden">
      {/* Decorative background blur blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

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
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              The Pet Horizon Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-6 leading-tight">
              Why Choose Pet Horizon?
            </h2>
            <p className="text-emerald-100/60 leading-relaxed mb-8">
              We design our companion platform to be as loving, careful, and proactive as you are with your furry family members.
            </p>

            <div className="space-y-6">
              {/* Stat 1 */}
              <div className="flex items-center space-x-4 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group">
                <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">#1 Smart Care App</h4>
                  <p className="text-xs text-emerald-100/50 mt-1">Voted best upcoming companion tool in 2026.</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center space-x-4 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 group">
                <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Made by Vet Advisors</h4>
                  <p className="text-xs text-emerald-100/50 mt-1">Every feature is guided by professional veterinary advice.</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="flex items-start space-x-4 p-5 rounded-3xl border border-white/10 hover:border-primary/50 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 text-left group"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.2)]" />
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{benefit.title}</h4>
                    <p className="text-xs text-emerald-100/50 mt-1 leading-relaxed">{benefit.desc}</p>
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
