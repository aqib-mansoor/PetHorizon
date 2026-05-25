import { useState } from 'react';
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
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section id="comparison" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
            Feature Matrix
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4">
            Redefining the Care Standard ⚡
          </h2>
          <p className="text-slate-500 text-lg font-medium">
            A comprehensive look at our features compared to traditional care and free options.
          </p>
        </div>

        {/* Clean Dynamic Table Canvas */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          {/* Table Container */}
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[750px] border-collapse text-sm">
              
              {/* Table Head */}
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase font-black tracking-widest text-slate-400">
                  <th className="p-6 text-left w-[34%] bg-slate-50/50">Features</th>
                  <th className="p-6 text-center w-[22%] bg-slate-50/20">Traditional Care</th>
                  <th className="p-6 text-center w-[22%] bg-slate-50/20">Pet Horizon Free</th>
                  <th className="p-6 text-center w-[22%] bg-emerald-50/30 text-emerald-800 font-extrabold border-l border-emerald-100">
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500/20" />
                      <span>Horizon Premium</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-150 font-semibold text-slate-700">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr 
                    key={idx} 
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`transition-all duration-200 ${
                      hoveredRow === idx ? 'bg-slate-50' : ''
                    }`}
                  >
                    {/* Feature Description Cell */}
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <p className="font-extrabold text-slate-900 leading-snug">{row.feature}</p>
                        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{row.desc}</p>
                      </div>
                    </td>
                    
                    {/* Traditional Care Cell */}
                    <td className="p-6 text-center text-xs">
                      <div className="flex justify-center transition-transform duration-200">
                        {renderCell(row.traditional, false)}
                      </div>
                    </td>
                    
                    {/* Free Cell */}
                    <td className="p-6 text-center text-xs">
                      <div className="flex justify-center transition-transform duration-200">
                        {renderCell(row.free, false)}
                      </div>
                    </td>
                    
                    {/* Premium Cell (Highlighted Column) */}
                    <td className="p-6 text-center text-xs bg-emerald-50/20 border-l border-emerald-100/50">
                      <div className="flex justify-center transition-all duration-250">
                        {renderCell(row.premium, true)}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Final Subscription Costs Row */}
                <tr className="bg-slate-50/50">
                  <td className="p-6">
                    <p className="font-black text-slate-900">Subscription Cost</p>
                    <p className="text-[11px] text-slate-400 font-medium">Clear, transparent plan pricing.</p>
                  </td>
                  <td className="p-6 text-center text-xs text-slate-400 uppercase tracking-wider font-extrabold">
                    Free (Manual)
                  </td>
                  <td className="p-6 text-center text-xs text-slate-400 uppercase tracking-wider font-extrabold">
                    $0 / Forever
                  </td>
                  <td className="p-6 text-center bg-emerald-50/55 border-l border-emerald-150 text-emerald-800 font-black">
                    <span className="text-base uppercase tracking-widest text-emerald-700">
                      $4.99 / Mo
                    </span>
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

function renderCell(val: boolean | string, isPremium: boolean) {
  if (typeof val === 'string') {
    return (
      <span className={`font-bold px-3 py-1.5 rounded-lg text-xs leading-none ${
        isPremium 
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/55' 
          : 'bg-slate-100 text-slate-600 border border-slate-200/55'
      }`}>
        {val}
      </span>
    );
  }

  if (val === true) {
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
      <X className="w-3.5 h-3.5 stroke-[2.5]" />
    </div>
  );
}

