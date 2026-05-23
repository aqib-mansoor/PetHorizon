
import { motion } from 'framer-motion';
import { Layers, Sparkles, LayoutDashboard, LucideIcon } from 'lucide-react';

interface SmartFeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function SmartFeatures() {
  const smartFeats: SmartFeatureItem[] = [
    {
      title: 'Active Pet System',
      description: 'Switch between multiple pet profiles instantly. The entire interface adapts to show schedules, records, and diaries for the active pet with one click.',
      icon: Layers,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Breed-Based Features',
      description: 'Unlock customized feeding guidelines, potential health risk advice, and training checklists automatically based on your pet’s registered breed.',
      icon: Sparkles,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      title: 'Real-Time Dashboard',
      description: 'A live feed showing today’s calendar, medication timetables, activity logs, and system notifications. See your pet’s status at a single glance.',
      icon: LayoutDashboard,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
  ];

  return (
    <section id="smart-features" className="py-24 bg-[#040806] relative overflow-hidden">
      {/* Background soft blur circular blob */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
            Intelligent Companionship
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-6 mb-4">
            Smart Features
          </h2>
          <p className="text-emerald-100/60 text-lg">
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-primary/50 shadow-lg hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)] transition-all duration-300 text-left group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-md shadow-emerald-500/10`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-emerald-100/60 leading-relaxed text-sm">
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
