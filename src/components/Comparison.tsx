import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';

interface Row {
  feature: string;
  desc: string;
  premium: boolean | string;
  free: boolean | string;
  traditional: boolean | string;
}

const COMPARISON_ROWS: Row[] = [
  {
    feature: 'Unlimited Pet Provisioning',
    desc: 'Instantly toggle and sync profiles across multiple family pets.',
    premium: 'Unlimited Pets',
    free: '1 Pet Limit',
    traditional: 'Separate Notebooks',
  },
  {
    feature: 'Real-time Family Care Sharing',
    desc: 'Invite pet sitters, co-owners, or veterinarians with unique permissions.',
    premium: true,
    free: false,
    traditional: 'Manual SMS / Calls',
  },
  {
    feature: 'Precision Medication Push Notifications',
    desc: 'Custom schedules, sound alerts, and recurring push indicators.',
    premium: true,
    free: 'Basic Timers',
    traditional: 'Paper Checklists',
  },
  {
    feature: 'Financial Expense Logging',
    desc: 'Audit feed budgets, veterinary bills, and cost graphs visually.',
    premium: true,
    free: true,
    traditional: 'Excel Sheets',
  },
  {
    feature: 'Veterinary Record Exporting',
    desc: 'Download printable emergency files and full health histories.',
    premium: true,
    free: false,
    traditional: 'Physical Folders',
  },
];

export default function Comparison() {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <section id="comparison" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
              Platform Evaluation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4"
          >
            Interactive Comparison Matrix
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium mb-8"
          >
            See how Pet Horizon compares against traditional paper schedules and standard free tools.
          </motion.p>

          {/* Pricing Toggle inside Comparison */}
          <div className="flex items-center justify-center gap-3 p-1 bg-slate-100 border border-slate-200 rounded-2xl w-fit mx-auto mt-4 shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition duration-300 cursor-pointer ${
                !isYearly ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition duration-300 cursor-pointer flex items-center gap-1.5 ${
                isYearly ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Yearly (-17%)</span>
            </button>
          </div>
        </div>

        {/* Enterprise Comparison Grid Wrap with mobile-safe scroll isolation */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden relative max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          {/* Table Container */}
          <div className="w-full overflow-x-auto scrollbar-thin text-left">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              
              {/* Table Head */}
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase font-black tracking-widest text-slate-400">
                  <th className="p-5 w-[30%]">Core Capabilities</th>
                  <th className="p-5 text-center w-[20%]">Traditional Care</th>
                  <th className="p-5 text-center w-[20%]">Pet Horizon Free</th>
                  {/* Highlight Premium Tier Column with emerald borders */}
                  <th className="p-5 text-center w-[30%] bg-emerald-50/30 border-x border-emerald-100 text-emerald-800 font-extrabold relative">
                    <div className="flex items-center justify-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" />
                      <span>Pet Horizon Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="p-5">
                      <p className="font-extrabold text-slate-850 leading-snug">{row.feature}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">{row.desc}</p>
                    </td>
                    
                    <td className="p-5 text-center text-xs text-slate-500 font-medium">
                      {renderCell(row.traditional)}
                    </td>
                    
                    <td className="p-5 text-center text-xs text-slate-600 font-medium">
                      {renderCell(row.free)}
                    </td>
                    
                    {/* Highlighted Premium Column Cell */}
                    <td className="p-5 text-center text-xs bg-emerald-50/30 border-x border-emerald-100 text-emerald-700">
                      {renderCell(row.premium)}
                    </td>
                  </tr>
                ))}

                {/* Final Row Cost Indicators */}
                <tr className="bg-slate-50/30">
                  <td className="p-5">
                    <p className="font-black text-slate-850">Monthly Subscription</p>
                    <p className="text-[10px] text-slate-450 font-medium">Pricing based on the billing interval.</p>
                  </td>
                  <td className="p-5 text-center text-xs text-slate-400 uppercase tracking-widest font-black">
                    $0 (Manual)
                  </td>
                  <td className="p-5 text-center text-xs text-slate-400 uppercase tracking-widest font-black">
                    $0 / Forever
                  </td>
                  <td className="p-5 text-center bg-emerald-50/50 border-x border-emerald-150 text-emerald-800 font-black">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isYearly ? 'yearly' : 'monthly'}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-base uppercase tracking-widest block text-emerald-700"
                      >
                        {isYearly ? '$4.16 / Mo' : '$4.99 / Mo'}
                      </motion.span>
                    </AnimatePresence>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </section>
  );
}

function renderCell(val: boolean | string) {
  if (typeof val === 'string') {
    return <span className="font-extrabold">{val}</span>;
  }
  if (val === true) {
    return (
      <div className="flex items-center justify-center text-emerald-600">
        <Check className="w-5 h-5" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center text-red-400">
      <X className="w-4 h-4" />
    </div>
  );
}
