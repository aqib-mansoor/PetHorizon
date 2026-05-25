import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Search, Info, ShieldAlert } from 'lucide-react';

interface Row {
  feature: string;
  desc: string;
  category: 'Logistics' | 'Health' | 'Finance';
  premium: boolean | string;
  free: boolean | string;
  traditional: boolean | string;
  tooltipText: string;
}

const COMPARISON_ROWS: Row[] = [
  {
    feature: 'Unlimited Pet Provisioning',
    desc: 'Instantly toggle and sync profiles across multiple family pets.',
    category: 'Logistics',
    premium: 'Unlimited Pets',
    free: '1 Pet Limit',
    traditional: 'Separate Notebooks',
    tooltipText: 'Traditional notebooks require flipping pages. Free apps limit you to one pet. Premium offers unlimited sync.',
  },
  {
    feature: 'Real-time Family Care Sharing',
    desc: 'Invite pet sitters, co-owners, or veterinarians with unique permissions.',
    category: 'Logistics',
    premium: true,
    free: false,
    traditional: 'Manual SMS / Calls',
    tooltipText: 'Sitters get instant push notifications of finished tasks, avoiding double-feeding or missed medicine.',
  },
  {
    feature: 'Precision Medication Alerts',
    desc: 'Custom schedules, sound alerts, and recurring push indicators.',
    category: 'Health',
    premium: true,
    free: 'Basic Timers',
    traditional: 'Paper Checklists',
    tooltipText: 'Get critical alerts that repeat until acknowledged. Traditional checklists rely entirely on memory.',
  },
  {
    feature: 'Financial Expense Logging',
    desc: 'Audit feed budgets, veterinary bills, and cost graphs visually.',
    category: 'Finance',
    premium: true,
    free: true,
    traditional: 'Excel Sheets',
    tooltipText: 'Free & Premium offer built-in calculators, but Premium adds smart categorization and expense forecasting.',
  },
  {
    feature: 'Veterinary Record Exporting',
    desc: 'Download printable emergency files and full health histories.',
    category: 'Health',
    premium: true,
    free: false,
    traditional: 'Physical Folders',
    tooltipText: 'Instantly compile PDF records to share with ER vets. Traditional folders are easily lost during crises.',
  },
  {
    feature: 'Custom Vaccine Timelines',
    desc: 'Automated breed-specific core and non-core vaccination tracking.',
    category: 'Health',
    premium: true,
    free: false,
    traditional: 'Clinic Stickers',
    tooltipText: 'Keeps track of boosters based on your pet’s exact age and local regional requirements.',
  },
  {
    feature: 'Breed-Specific Analytics',
    desc: 'Compare weight developmental metrics against certified global averages.',
    category: 'Finance',
    premium: true,
    free: false,
    traditional: 'Google Searches',
    tooltipText: 'Instant weight and growth charts to detect early-stage developmental issues before they become severe.',
  },
];

export default function Comparison() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Logistics' | 'Health' | 'Finance'>('All');
  const [focusedColumn, setFocusedColumn] = useState<'premium' | 'free' | 'traditional'>('premium');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Filter rows based on search query and category
  const filteredRows = COMPARISON_ROWS.filter(row => {
    const matchesCategory = activeCategory === 'All' || row.category === activeCategory;
    const matchesSearch = row.feature.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          row.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="comparison" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            Interactive Plan Matrix 📊
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium mb-8"
          >
            Filter categories, search capabilities, and tap columns to compare systems dynamically.
          </motion.p>

          {/* Billing Interval Switcher */}
          <div className="flex items-center justify-center gap-3 p-1 bg-slate-100 border border-slate-200 rounded-2xl w-fit mx-auto mt-4 shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                !isYearly ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                isYearly ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Yearly (-17%)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {(['All', 'Logistics', 'Health', 'Finance'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 border border-slate-200 text-slate-650 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Features' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features..."
              className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-800 focus:outline-none transition shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

        </div>

        {/* Desktop Interactive Table View */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden relative max-w-5xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          <div className="w-full overflow-x-auto scrollbar-thin text-left">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase font-black tracking-widest text-slate-400 select-none">
                  <th className="p-5 w-[35%] bg-slate-50/50">Core Capability</th>
                  
                  {/* Traditional Care Column Header */}
                  <th 
                    onClick={() => setFocusedColumn('traditional')}
                    className={`p-5 text-center w-[20%] cursor-pointer transition-all duration-300 ${
                      focusedColumn === 'traditional' ? 'bg-amber-50/10 text-slate-700 font-extrabold shadow-sm' : 'hover:bg-slate-50'
                    }`}
                  >
                    Traditional Care
                  </th>
                  
                  {/* Free Column Header */}
                  <th 
                    onClick={() => setFocusedColumn('free')}
                    className={`p-5 text-center w-[20%] cursor-pointer transition-all duration-300 ${
                      focusedColumn === 'free' ? 'bg-blue-50/10 text-slate-700 font-extrabold shadow-sm' : 'hover:bg-slate-50'
                    }`}
                  >
                    Pet Horizon Free
                  </th>
                  
                  {/* Premium Column Header */}
                  <th 
                    onClick={() => setFocusedColumn('premium')}
                    className={`p-5 text-center w-[25%] cursor-pointer transition-all duration-300 border-l border-emerald-100 ${
                      focusedColumn === 'premium' ? 'bg-emerald-50/40 text-emerald-800 font-black' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" />
                      <span>Horizon Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                <AnimatePresence mode="popLayout">
                  {filteredRows.map((row, idx) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={row.feature} 
                      className="hover:bg-slate-50/30 transition group"
                    >
                      {/* Feature detail */}
                      <td className="p-5 relative bg-slate-50/20">
                        <div className="flex items-start gap-2">
                          <div>
                            <p className="font-extrabold text-slate-850 leading-snug flex items-center gap-1.5">
                              {row.feature}
                              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-black ${
                                row.category === 'Health' ? 'bg-red-50 text-red-600 border border-red-100' :
                                row.category === 'Finance' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}>
                                {row.category}
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-medium">{row.desc}</p>
                          </div>
                          
                          {/* Interactive Info Icon to toggle custom tooltips */}
                          <button 
                            onClick={() => setActiveTooltip(activeTooltip === idx ? null : idx)}
                            className="text-slate-350 hover:text-slate-600 transition cursor-pointer p-0.5"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Interactive cell explanation popup */}
                        {activeTooltip === idx && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute z-20 top-12 left-5 right-5 bg-slate-900 text-white rounded-xl p-4 text-xs font-semibold shadow-xl border border-slate-800"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="leading-relaxed">{row.tooltipText}</p>
                              <button 
                                onClick={() => setActiveTooltip(null)}
                                className="text-slate-400 hover:text-white font-extrabold uppercase text-[9px] tracking-wider"
                              >
                                Close
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </td>

                      {/* Traditional Care Cell */}
                      <td className={`p-5 text-center text-xs transition duration-300 ${
                        focusedColumn === 'traditional' ? 'bg-amber-50/5 font-extrabold text-slate-800' : 'text-slate-500 font-medium'
                      }`}>
                        {renderCell(row.traditional)}
                      </td>

                      {/* Pet Horizon Free Cell */}
                      <td className={`p-5 text-center text-xs transition duration-300 ${
                        focusedColumn === 'free' ? 'bg-blue-50/5 font-extrabold text-slate-800' : 'text-slate-650 font-medium'
                      }`}>
                        {renderCell(row.free)}
                      </td>

                      {/* Pet Horizon Premium Cell */}
                      <td className={`p-5 text-center text-xs border-l border-emerald-100 transition duration-300 ${
                        focusedColumn === 'premium' ? 'bg-emerald-50/20 font-black text-emerald-800' : 'text-emerald-700/80 font-medium'
                      }`}>
                        {renderCell(row.premium)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>

                {/* Final Row Pricing Indicator */}
                <tr className="bg-slate-50/30">
                  <td className="p-5">
                    <p className="font-black text-slate-850">Subscription Model</p>
                    <p className="text-[10px] text-slate-450 font-medium">Billed dynamically based on selection.</p>
                  </td>
                  <td className={`p-5 text-center text-xs uppercase tracking-widest font-black transition duration-300 ${
                    focusedColumn === 'traditional' ? 'bg-slate-100/50' : 'text-slate-400'
                  }`}>
                    FREE (Manual)
                  </td>
                  <td className={`p-5 text-center text-xs uppercase tracking-widest font-black transition duration-300 ${
                    focusedColumn === 'free' ? 'bg-slate-100/50' : 'text-slate-400'
                  }`}>
                    $0 / Forever
                  </td>
                  <td className={`p-5 text-center border-l border-emerald-100 bg-emerald-50/40 text-emerald-800 font-black transition duration-300 ${
                    focusedColumn === 'premium' ? 'scale-105' : ''
                  }`}>
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

        {/* Empty state fallback */}
        {filteredRows.length === 0 && (
          <div className="max-w-5xl mx-auto p-12 text-center bg-slate-50 border border-slate-200 rounded-3xl mt-4">
            <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No capabilities match your search query or filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 text-xs font-black uppercase tracking-wider underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function renderCell(val: boolean | string) {
  if (typeof val === 'string') {
    return <span className="font-extrabold tracking-wide">{val}</span>;
  }
  if (val === true) {
    return (
      <div className="flex items-center justify-center text-emerald-600">
        <Check className="w-5 h-5 stroke-[3]" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center text-slate-300">
      <X className="w-4 h-4" />
    </div>
  );
}
