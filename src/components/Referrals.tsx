import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Award, Check } from 'lucide-react';

interface Referrer {
  rank: number;
  name: string;
  count: number;
  credits: string;
}

const LEADERBOARD: Referrer[] = [
  { rank: 1, name: 'Arthur Mitchell', count: 42, credits: '$420' },
  { rank: 2, name: 'Sarah Jenkins', count: 28, credits: '$280' },
  { rank: 3, name: 'Marcus Helms', count: 19, credits: '$190' },
];

export default function Referrals() {
  const [copied, setCopied] = useState<boolean>(false);
  const inviteLink = 'pethorizon.com/invite/petparent';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="referrals" className="py-14 sm:py-24 bg-[#F1F5F9] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Incentive Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block mb-4">
              Viral Rewards
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Give $10, Get $10 in Premium Credits
          </h2>
          <p className="text-slate-500 text-lg mt-2 font-medium">
            Refer your pet parent friends and earn premium care subscription credits.
          </p>
        </div>

        {/* Asymmetric Referral layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* LEFT COLUMN: The Copy command panel (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between gap-6 text-left relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Gift className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Your Unique Referral Link</h3>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-medium">
                Copy your customized invitation reference path. When a friend signs up for Pet Horizon Premium, you both get a $10 credit.
              </p>
            </div>

            {/* Read-Only text copy container */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-mono font-bold select-all truncate">
                {inviteLink}
              </div>
              
              <div className="relative">
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>

                {/* Copied Tooltip Micro-interaction */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest pointer-events-none z-20 shadow-lg"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Metrics stats tracker strip */}
            <div className="border-t border-slate-100 pt-4 mt-2 flex items-center justify-between text-xs text-slate-400 font-black uppercase tracking-wider">
              <span>3 Friends Invited</span>
              <span className="text-emerald-600 font-extrabold">• $30 Earned</span>
            </div>
          </div>

          {/* RIGHT COLUMN: referral Leaderboard Scoreboard (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between gap-5 text-left relative shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500 fill-amber-500/20" />
              <h3 className="text-lg font-black text-slate-900">Scoreboard</h3>
            </div>

            {/* Scoreboard List */}
            <div className="space-y-3.5 my-2 flex-1 flex flex-col justify-center">
              {LEADERBOARD.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold text-[10px]">
                      {item.rank}
                    </span>
                    <span className="font-extrabold text-slate-800">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-3 font-bold">
                    <span className="text-slate-400 text-[10px] uppercase font-black tracking-widest">{item.count} invites</span>
                    <span className="text-emerald-600 font-extrabold">{item.credits}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-450 uppercase tracking-wider font-extrabold text-center mt-auto">
              Leaderboard updates every 24 hours.
            </p>
          </div>

          {/* Viral Scoreboard bottom watermark check */}

        </div>

      </div>
    </section>
  );
}
