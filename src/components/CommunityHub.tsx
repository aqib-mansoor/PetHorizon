import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Trophy, ChevronDown, Award, Users, Star } from 'lucide-react';

interface QAItem {
  id: number;
  question: string;
  answersCount: number;
  bestAnswer: string;
  askedBy: string;
}

interface Contributor {
  name: string;
  role: string;
  upvotes: number;
  avatar: string;
}

const QA_DATA: QAItem[] = [
  {
    id: 1,
    question: 'How many daily miles are recommended for an 18-month Husky?',
    answersCount: 5,
    bestAnswer: 'For an 18-month Siberian Husky, veterinarians generally recommend 3 to 5 miles of structured cardiovascular activity daily, split into morning and evening walks. Keep logs consistent using Pet Horizon to avoid over-exertion during high temperatures.',
    askedBy: 'Marcus H. • Portland, OR',
  },
  {
    id: 2,
    question: 'Safest grain-free wet diets for senior cats with renal concerns?',
    answersCount: 12,
    bestAnswer: 'Always consult your vet first, but renal-safe diets require low phosphorus levels. Look for wet diets specifically formulated for kidney health. Logging water consumption and tracking urinalysis markers in Pet Horizon helps prevent dehydration crises.',
    askedBy: 'Clara D. • Seattle, WA',
  },
  {
    id: 3,
    question: 'Tips for introducing a conure to adult dogs?',
    answersCount: 8,
    bestAnswer: 'Always introduce birds and dogs in a controlled, neutral space. Keep the conure in its cage initially while rewarding your dog for calm behavior. Progress slowly and never leave them unsupervised.',
    askedBy: 'Ryan P. • Chicago, IL',
  },
  {
    id: 4,
    question: 'Is coconut oil safe for grooming dry skin on cats?',
    answersCount: 6,
    bestAnswer: 'In small, external amounts, pure virgin coconut oil is safe and can help soothe dry feline skin. Avoid excessive application since cats will lick it off, which might cause digestive issues. Monitor skin progress via your Pet Horizon journal notes.',
    askedBy: 'Elena R. • Miami, FL',
  },
  {
    id: 5,
    question: 'What temperature is too cold for outdoor dog training?',
    answersCount: 9,
    bestAnswer: "Generally, temperatures below 45°F (7°C) start to feel uncomfortable for most short-haired breeds. Under 32°F (0°C), smaller dogs and seniors should not spend extended periods outside. Log your session temperatures in the app to track your dog's physical limits.",
    askedBy: 'David T. • Chicago, IL',
  },
];

const TOP_CONTRIBUTORS: Contributor[] = [
  {
    name: 'Dr. Arthur Mitchell',
    role: 'Vet Advisor',
    upvotes: 4120,
    avatar: 'https://images.pexels.com/photos/3756439/pexels-photo-3756439.jpeg',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Husky Parent',
    upvotes: 2890,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    name: 'Clara Dunst',
    role: 'Cat Behaviorist',
    upvotes: 1940,
    avatar: 'https://images.pexels.com/photos/3995209/pexels-photo-3995209.jpeg',
  },
];

export default function CommunityHub() {
  const [openQA, setOpenQA] = useState<number | null>(null);

  const toggleQA = (id: number) => {
    setOpenQA(openQA === id ? null : id);
  };

  return (
    <section id="community" className="py-14 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
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
              Interactive Community
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4"
          >
            Specialized Community Hub
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium"
          >
            Coordinate care tips, review community discussions, and celebrate top contributors.
          </motion.p>
        </div>

        {/* 2-Column Community Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Q&A Accordion Matrix (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <MessageSquare className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xl font-black text-slate-900">Recent Q&A Board</h3>
            </div>

            <div className="space-y-4">
              {QA_DATA.map((item) => {
                const isOpen = openQA === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 shadow-sm"
                  >
                    <button
                      onClick={() => toggleQA(item.id)}
                      className="w-full p-4 flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-800 focus:outline-none cursor-pointer hover:bg-slate-50 transition"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 duration-300 ${
                          isOpen ? 'rotate-180 text-emerald-500' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-emerald-50/40 border-t border-slate-100 text-xs text-slate-650 leading-relaxed font-semibold">
                            <div className="flex items-center justify-between text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider mb-2.5">
                              <span>Verified Answer</span>
                              <span>{item.answersCount} replies</span>
                            </div>
                            <p>{item.bestAnswer}</p>
                            <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                              Asked by: {item.askedBy}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: Weekly Champion & Leaderboard (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            
            {/* Pet of the Week Spotlight Frame */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm p-5 flex flex-col gap-4 relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h3 className="text-lg font-black text-slate-900">Pet of the Week</h3>
              </div>

              {/* Champion Image */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-inner relative group">
                <img
                  src="https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg"
                  alt="Pet of the Week"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-widest">Active Champion</span>
                  </div>
                  <h4 className="text-lg font-black mt-0.5">Buster (Rabbit)</h4>
                </div>
              </div>

              {/* Leaderboard contributors block */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-black tracking-widest border-b border-slate-100 pb-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Top Contributors</span>
                </div>

                <div className="space-y-3">
                  {TOP_CONTRIBUTORS.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-extrabold text-slate-800 leading-tight">{c.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{c.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                        <span>{c.upvotes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

