import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, Eye } from 'lucide-react';

interface FeedItem {
  id: number;
  petName: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Others';
  action: 'Walk' | 'Medicine' | 'Food' | 'Grooming';
  text: string;
  timeLabel: string;
  likes: number;
  isLiked?: boolean;
}

const INITIAL_FEED: FeedItem[] = [
  {
    id: 1,
    petName: 'Max',
    petType: 'Dog',
    action: 'Walk',
    text: 'Max (Golden Retriever) — Walk Completed: 2.4-mile outdoor tracking log verified by owner Sarah J.',
    timeLabel: '2 minutes ago',
    likes: 12,
  },
  {
    id: 2,
    petName: 'Luna',
    petType: 'Cat',
    action: 'Medicine',
    text: 'Luna (Siamese Cat) — Medication Logged: Scheduled daily Insulin dosage administered successfully',
    timeLabel: '15 minutes ago',
    likes: 8,
  },
  {
    id: 3,
    petName: 'Buddy',
    petType: 'Dog',
    action: 'Food',
    text: 'Buddy (French Bulldog) — Nutrition Tracker: Finished calculated premium breakfast portion',
    timeLabel: '1 hour ago',
    likes: 15,
  },
  {
    id: 4,
    petName: 'Rio',
    petType: 'Bird',
    action: 'Grooming',
    text: 'Rio (Parrot) — Milestone Logged: Mastered a new custom vocabulary word string',
    timeLabel: '3 hours ago',
    likes: 21,
  },
  {
    id: 5,
    petName: 'Whiskers',
    petType: 'Cat',
    action: 'Grooming',
    text: 'Whiskers (Persian Cat) — Grooming Complete: Daily dental and coat brushing session logged',
    timeLabel: '5 hours ago',
    likes: 11,
  },
  {
    id: 6,
    petName: 'Coco',
    petType: 'Others',
    action: 'Walk',
    text: 'Coco (Domestic Rabbit) — Exercise Log: 20 minutes of supervised free-roaming backyard playtime',
    timeLabel: 'Yesterday',
    likes: 9,
  },
  {
    id: 7,
    petName: 'Bubbles',
    petType: 'Others',
    action: 'Food',
    text: 'Bubbles (Goldfish) — Feeding Complete: Evening automated flake nutrition block dispensed',
    timeLabel: '2 hours ago',
    likes: 6,
  },
];

export default function LiveFeed() {
  const [feed, setFeed] = useState<FeedItem[]>(INITIAL_FEED);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Walk' | 'Medicine' | 'Food' | 'Grooming'>('All');

  const handleLike = (id: number) => {
    setFeed(prev =>
      prev.map(item => {
        if (item.id === id) {
          const liked = !item.isLiked;
          return {
            ...item,
            isLiked: liked,
            likes: liked ? item.likes + 1 : item.likes - 1,
          };
        }
        return item;
      })
    );
  };

  const filteredFeed = feed.filter(item => {
    if (activeFilter === 'All') return true;
    return item.action === activeFilter;
  });

  return (
    <section id="live-feed" className="py-14 sm:py-24 bg-[#F1F5F9] relative overflow-hidden">
      {/* Visual Backdrops & Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive Context */}
          <div className="lg:col-span-5 text-left flex flex-col gap-5">
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm w-fit">
              Social Ecosystem
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Recent App{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Activity Log
              </span>{' '}
              🐾
            </h2>
            
            <p className="text-slate-650 text-base leading-relaxed font-medium">
              See how pet owners are using Pet Horizon to streamline daily care routines. Pet parents around the globe log daily milestones, health marks, medicine dosages, and fitness steps seamlessly.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-semibold">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <span>Filter categories to see specific clinical walks and alarms.</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Simulator Dashboard Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl p-6 sm:p-8 relative overflow-hidden text-left">
              {/* Shimmer top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

              {/* Header Title */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-extrabold text-lg">Active Care Feed</h3>
                    <p className="text-slate-400 text-xs font-semibold">Pre-populated user tracking logs</p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              {/* Filtering Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['All', 'Walk', 'Medicine', 'Food', 'Grooming'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      activeFilter === filter
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {filter === 'All' ? 'All Logs' : filter}
                  </button>
                ))}
              </div>

              {/* Scrolling Container */}
              <div className="max-h-[360px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
                <AnimatePresence mode="popLayout">
                  {filteredFeed.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 30, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/20 hover:bg-slate-100/50 transition flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        {/* Pet type avatar badge */}
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-extrabold text-sm text-emerald-600 flex-shrink-0 shadow-sm">
                          {item.petName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-snug">{item.text}</p>
                          <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1.5 inline-block">
                            {item.action} • {item.timeLabel}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Like Action */}
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition duration-200 cursor-pointer flex-shrink-0 ${
                          item.isLiked
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                        <span>{item.likes}</span>
                      </button>

                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty filter message */}
                {filteredFeed.length === 0 && (
                  <div className="p-10 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <p className="text-xs text-slate-400 font-bold">No active updates in this category.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
