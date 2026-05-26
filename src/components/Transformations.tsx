import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Eye, X, ShieldCheck, ArrowLeftRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  petName: string;
  breed: string;
  problem: string;
  solution: string;
  detailedText: string;
  beforeUrl: string;
  afterUrl: string;
  metrics: string;
  vetName: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    petName: 'Bella',
    breed: 'Corgi',
    problem: 'Excess weight (32 lbs), joint stiffness, and lethargy.',
    solution: 'Lost 5 lbs of excess weight within 90 days via a tailored walking cadence and caloric tracking metrics.',
    detailedText: "Bella's veterinarian warned that joint issues would escalate without weight loss. Using Pet Horizon, we programmatically restricted her caloric food logs to 380kcal/day and logged three 20-minute walk sessions daily. Her agility recovered completely, and her veterinary diagnostics are now perfect.",
    beforeUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600&sat=-60&blur=8&bri=-15',
    afterUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    metrics: 'Lost 5 lbs (-15.6%) | Joint Pain: Zero',
    vetName: 'Dr. Arthur Mitchell, DVM',
  },
  {
    id: 2,
    petName: 'Charlie',
    breed: 'Labrador',
    problem: 'Chronic lethargy, high glucose spikes, and diabetic alarms.',
    solution: 'Reverted severe chronic lethargy and blood glucose instability via programmatic insulin alarms.',
    detailedText: "Charlie suffered from diabetes, requiring twice-daily insulin injections exactly 12 hours apart. With Pet Horizon's shared family hubs, his owners set programmatic alerts and medicine minimum stock limits to ensure they never ran out of insulin. The activity timeline logs also helped maintain a consistent blood glucose plateau.",
    beforeUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600&sat=-60&blur=8&bri=-15',
    afterUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
    metrics: 'Glucose Deviation: -40% | Walk Rate: +80%',
    vetName: 'Dr. Linda Ross, DVM',
  },
  {
    id: 3,
    petName: 'Luna',
    breed: 'Rescue Cat',
    problem: 'Severe over-grooming stress, social anxiety, and patch baldness.',
    solution: 'Overcame severe grooming stress and social isolation anxiety through structured behavioral tracking.',
    detailedText: "Luna began self-mutilating and over-grooming due to separation anxiety. Her owners used Pet Horizon's Journal and Activity Timeline to track daily anxiety triggers, feeding habits, and play. Programmatic grooming reminders allowed the family to target brushing sessions with calming triggers, leading to full hair regrowth.",
    beforeUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600&sat=-60&blur=8&bri=-15',
    afterUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    metrics: 'Anxiety Episodes: Zero | Fur Regrowth: 100%',
    vetName: 'Dr. Samuel Vance, Feline Behaviorist',
  },
];

export default function Transformations() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  return (
    <section id="transformations" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Visual glowing backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
              Clinical Case Studies
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4 leading-tight"
          >
            Real Pet Health{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Transformations
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-550 text-lg font-medium"
          >
            Witness the measurable, scientific improvements logged by verified veterinary guidance.
          </motion.p>
        </div>

        {/* 3 Case Study Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-5 hover:border-emerald-500/20 hover:shadow-md transition-all duration-300 relative text-left"
            >
              {/* Shimmer top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              {/* Slider Component Frame */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-slate-200 shadow-inner">
                <CompareSlider beforeUrl={study.beforeUrl} afterUrl={study.afterUrl} />
              </div>

              {/* Study Info Card */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{study.petName}</h3>
                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest">{study.breed}</p>
                  </div>
                  
                  {/* Hospital verified badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] uppercase font-black tracking-widest">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Vet Verified</span>
                  </div>
                </div>

                {/* Health Metrics Indicator */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-emerald-700 font-extrabold text-xs">
                  Result: {study.metrics}
                </div>

                <div className="text-xs flex flex-col gap-2">
                  <p className="text-slate-650 leading-relaxed font-semibold">
                    <span className="text-emerald-600 font-black">Before:</span> {study.problem}
                  </p>
                  <p className="text-slate-650 leading-relaxed font-semibold">
                    <span className="text-emerald-700 font-black">Recovery:</span> {study.solution}
                  </p>
                </div>
              </div>

              {/* Story Expand Action */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <button
                  onClick={() => setActiveStory(study.id)}
                  className="w-full bg-slate-50 hover:bg-emerald-500 hover:text-white border border-slate-200 hover:border-emerald-500 text-slate-600 font-black py-3 rounded-xl text-xs uppercase tracking-widest transition duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read Clinical Story</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Expanded Story overlay */}
      <AnimatePresence>
        {activeStory !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Content Card */}
            {(() => {
              const study = CASE_STUDIES.find(s => s.id === activeStory)!;
              return (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden text-slate-800"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest">{study.vetName}</span>
                      <h3 className="text-2xl font-black text-slate-900 mt-0.5">{study.petName}’s Clinical Report</h3>
                    </div>
                    <button
                      onClick={() => setActiveStory(null)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-850 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Story Detailed text */}
                  <div className="space-y-4 text-slate-650 text-sm leading-relaxed font-semibold">
                    
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                      <p><span className="font-extrabold text-emerald-700">Diagnosis Problem:</span> {study.problem}</p>
                      <p><span className="font-extrabold text-emerald-700">Programmatic Action:</span> {study.solution}</p>
                    </div>

                    <p className="indent-4">{study.detailedText}</p>
                    
                    <p className="text-xs text-slate-400 font-medium">
                      *This case study is approved by {study.vetName} using calculated app metrics. Individual results may vary based on breed character and parent adherence rate.
                    </p>
                  </div>

                  {/* Bottom Verification Seal */}
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs text-slate-850 font-extrabold">{study.vetName}</span>
                    </div>
                    <button
                      onClick={() => setActiveStory(null)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      Close Report
                    </button>
                  </div>

                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

// Custom touch and click drag comparative slider using polygon clip-paths
function CompareSlider({ beforeUrl, afterUrl }: { beforeUrl: string; afterUrl: string }) {
  const [sliderVal, setSliderVal] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const relativeX = clientX - left;
    const nextPercent = Math.max(0, Math.min(100, (relativeX / width) * 100));
    setSliderVal(nextPercent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
      className="relative w-full h-full cursor-ew-resize select-none overflow-hidden"
    >
      {/* Before Image (Clipped Overlay Layer on the Left) */}
      <img
        src={afterUrl}
        alt="After recovery"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
        Before
      </div>

      {/* After Image (Background Layer on the Right) */}
      <img
        src={beforeUrl}
        alt="Before recovery"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`,
        }}
      />
      <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-emerald-500/90 text-white text-[10px] font-black uppercase tracking-widest border border-emerald-400/20">
        After
      </div>

      {/* Central drag line handler */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-emerald-400 z-30 pointer-events-none"
        style={{ left: `${sliderVal}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg text-white">
          <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}
