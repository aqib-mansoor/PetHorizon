import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, HelpCircle, Activity, Award, Flame, Wallet, CheckSquare, BellRing } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
}

export default function AnalyticsPreview() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string) => {
    const newToast = { id: Date.now(), message };
    setToasts(prev => [newToast, ...prev].slice(0, 3)); // keep max 3 toasts
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4500);
  };

  return (
    <section id="analytics" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Technical Description */}
          <div className="lg:col-span-5 text-left flex flex-col gap-5">
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm w-fit">
              Longevity Metrics
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Advanced Analytics{' '}
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Dashboard Preview
              </span>
            </h2>
            
            <p className="text-slate-650 text-base leading-relaxed font-medium">
              Unlock the secrets of your pet's metabolic lifespan. Our analytical models track biological activity trends, diet consistencies, spending categories, and medication adherence to map long-term wellness scores.
            </p>

            {/* Click Action Preview Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-700 font-extrabold flex items-center gap-2.5 shadow-sm">
              <AreaChart className="w-4.5 h-4.5 animate-pulse" />
              <span>Click any dashboard metric widget to test predictive diagnostic projections.</span>
            </div>
          </div>

          {/* Right Column: Executive-Level Mockup Board */}
          <div className="lg:col-span-7 relative">
            <div
              onClick={() => addToast('Advanced predictive analytics unlocking in v2.0! 🐾')}
              className="rounded-[2.5rem] border border-slate-200 bg-slate-50/50 shadow-sm p-6 sm:p-8 relative overflow-hidden flex flex-col gap-6 text-left cursor-pointer hover:border-emerald-500/20 hover:shadow-md transition-all duration-300"
            >
              {/* Top Shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              {/* Mockup Title bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Activity className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Diagnostics Panel</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Adherence Tracking Platform</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] uppercase font-black tracking-widest">
                  <Award className="w-3.5 h-3.5" />
                  <span>Elite Mode</span>
                </div>
              </div>

              {/* Grid Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* WIDGET 1: Speedometer SVG (Health Score) */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-3 relative group hover:border-emerald-500/20 transition shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Health & Longevity</span>
                    <Tooltip text="Cumulative metabolic score based on daily activity, consistent hydration, and vaccination logs." />
                  </div>

                  <div className="relative w-36 h-20 mx-auto flex items-center justify-center overflow-hidden mt-2">
                    {/* SVG Semi-Circle Arc */}
                    <svg className="w-32 h-32 absolute top-0" viewBox="0 0 100 100">
                      {/* Back circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(0,0,0,0.05)"
                        strokeWidth="8"
                        strokeDasharray="125.6 125.6"
                        strokeDashoffset="125.6"
                        strokeLinecap="round"
                        transform="rotate(-180 50 50)"
                      />
                      {/* Fore circle (94/100 value) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray="125.6 125.6"
                        strokeDashoffset={125.6 * (1 - 94 / 100)}
                        strokeLinecap="round"
                        transform="rotate(-180 50 50)"
                        className="transition-all duration-1000"
                      />
                    </svg>

                    <div className="absolute bottom-1 text-center">
                      <span className="text-2xl font-black text-slate-900">94%</span>
                      <p className="text-[8px] text-emerald-600 font-extrabold uppercase tracking-widest">Optimal Range</p>
                    </div>
                  </div>
                </div>

                {/* WIDGET 2: Activity Streak Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between gap-3 group hover:border-emerald-500/20 transition shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Activity Streak</span>
                    <Tooltip text="Unbroken days of walking sessions and medicine registers logged in Pet Horizon." />
                  </div>

                  <div className="flex items-center gap-3.5 my-2">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 text-orange-650 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                      <Flame className="w-6 h-6 fill-orange-500 text-orange-500" />
                    </div>
                    <div className="text-left">
                      <span className="text-3xl font-black text-slate-900">15 Days</span>
                      <p className="text-[9px] text-orange-600 font-extrabold uppercase tracking-widest mt-0.5">Consecutive 🔥</p>
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 font-semibold">Next milestone: 20 Days (Bronze)</span>
                </div>

                {/* WIDGET 3: Care Budget Progress Track */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-3 group hover:border-emerald-500/20 transition shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Monthly Care Budget</span>
                    <Tooltip text="Real-time expense logs tracked against your custom designated budget caps." />
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-left">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                        <span>$150 Left</span>
                        <span className="text-slate-400 font-semibold">$350 of $500</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* WIDGET 4: Medication Adherence Rate */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col gap-3 group hover:border-emerald-500/20 transition shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Medication Adherence</span>
                    <Tooltip text="Percentage of programmatically scheduled medical doses checked off in Pet Horizon." />
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-left">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                        <span>98% Adherence</span>
                        <span className="text-emerald-600 font-bold">Perfect Streak</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Custom Warning message bar */}
              <div className="mt-2 p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-3">
                <BellRing className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  Alarms fully bound to mobile device notifications. Sync rate: stable.
                </span>
              </div>

            </div>

            {/* Dynamic Toast Overlay System */}
            <div className="absolute bottom-5 right-5 z-40 flex flex-col gap-2 pointer-events-none">
              <AnimatePresence>
                {toasts.map(toast => (
                  <motion.div
                    key={toast.id}
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.9 }}
                    className="px-5 py-3 rounded-2xl bg-white border border-emerald-500/20 text-emerald-800 shadow-2xl text-xs font-extrabold flex items-center gap-2 pointer-events-auto"
                  >
                    <span>{toast.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

// Inline custom tooltip indicator triggered on hover
function Tooltip({ text }: { text: string }) {
  return (
    <div className="relative group/tooltip flex items-center justify-center">
      <HelpCircle className="w-4.5 h-4.5 text-slate-300 hover:text-slate-600 cursor-pointer transition" />
      <div className="absolute bottom-7 right-[-20px] w-52 p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xl text-[10px] text-slate-600 leading-relaxed font-semibold opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-300 pointer-events-none z-50">
        {text}
      </div>
    </div>
  );
}
