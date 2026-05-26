import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, CheckCircle, Share2 } from 'lucide-react';

interface Badge {
  id: number;
  title: string;
  desc: string;
  status: 'Unlocked' | 'Locked';
  percent: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

const BADGES_DATA: Badge[] = [
  {
    id: 1,
    title: 'Longevity Master',
    desc: 'Maintained optimal diagnostic feeds for 90 days straight.',
    status: 'Unlocked',
    percent: 100,
    rarity: 'Legendary',
  },
  {
    id: 2,
    title: 'Precision Tracker',
    desc: 'Logged medical indices and custom updates perfectly.',
    status: 'Unlocked',
    percent: 100,
    rarity: 'Rare',
  },
  {
    id: 3,
    title: 'Social Butterfly',
    desc: 'Completed 5 companion socialization block activities.',
    status: 'Locked',
    percent: 40,
    rarity: 'Common',
  },
  {
    id: 4,
    title: 'Vet VIP',
    desc: 'Completed 5 bi-annual general checkups with exported history records.',
    status: 'Locked',
    percent: 80,
    rarity: 'Epic',
  },
];

export default function Badges() {
  const [badges] = useState<Badge[]>(BADGES_DATA);
  const [showToast, setShowToast] = useState(false);
  const [activeBadgeTitle, setActiveBadgeTitle] = useState('');

  const handleShareBadge = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setActiveBadgeTitle(title);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section id="badges" className="py-14 sm:py-24 bg-[#F1F5F9] relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
              Gamified Achievements
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4"
          >
            Gamification & Profile Achievements
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium"
          >
            Gamify your pet care routines. Earn rare badges as you log walks, meals, and medical adherence.
          </motion.p>
        </div>

        {/* 6-Card Badge Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => {
            const isUnlocked = badge.status === 'Unlocked';
            return (
              <motion.div
                key={badge.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl border p-6 flex flex-col justify-between text-left transition-all duration-300 h-[220px] ${
                  isUnlocked
                    ? 'bg-white border-emerald-200 shadow-md shadow-emerald-500/5'
                    : 'bg-slate-200/50 border-slate-300/60 opacity-40 select-none'
                }`}
              >
                {/* Top line */}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    badge.rarity === 'Legendary'
                      ? 'text-amber-700 border-amber-200 bg-amber-50'
                      : badge.rarity === 'Rare'
                      ? 'text-purple-750 border-purple-200 bg-purple-50'
                      : badge.rarity === 'Epic'
                      ? 'text-teal-700 border-teal-200 bg-teal-50'
                      : 'text-emerald-700 border-emerald-200 bg-emerald-50'
                  }`}>
                    {badge.rarity}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> Unlocked</span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400"><Lock className="w-3.5 h-3.5" /> Locked</span>
                    )}
                  </div>
                </div>

                {/* Mid content */}
                <div className="flex items-center gap-4 my-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isUnlocked
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                      : 'bg-slate-200 border border-slate-300 text-slate-400'
                  }`}>
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg leading-tight">{badge.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-snug font-medium">{badge.desc}</p>
                  </div>
                </div>

                {/* Foot progress */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                    <span>Completion Track</span>
                    <span>{badge.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${badge.percent}%` }}
                    />
                  </div>
                </div>

                {/* Social Share Trigger */}
                {isUnlocked && (
                  <button
                    onClick={(e) => handleShareBadge(badge.title, e)}
                    className="absolute bottom-5 right-5 w-8 h-8 rounded-lg bg-slate-50 hover:bg-emerald-500 hover:text-white border border-slate-200 text-slate-550 flex items-center justify-center transition cursor-pointer"
                    title="Share Badge"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                )}

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Copy Alert Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-55 bg-emerald-500 text-white font-black px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-450 text-xs"
          >
            <span>Badge progress link copied for "{activeBadgeTitle}"!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
