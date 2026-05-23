import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, PlusCircle, X, ChevronDown, Check } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Review {
  id: number;
  ownerName: string;
  ownerLocation: string;
  ownerPhoto: string;
  petName: string;
  petType: 'Dog' | 'Cat' | 'Bird' | 'Others';
  petPhoto: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    ownerName: 'Sarah J.',
    ownerLocation: 'Austin, TX',
    ownerPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    petName: 'Max',
    petType: 'Dog',
    petPhoto: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    rating: 5,
    text: "Best app ever! My golden retriever never misses walk times, and his clinical weight log is immaculate.",
    date: '2 days ago',
    verified: true,
    helpfulCount: 24
  },
  {
    id: 2,
    ownerName: 'Marcus K.',
    ownerLocation: 'Seattle, WA',
    ownerPhoto: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    petName: 'Luna',
    petType: 'Cat',
    petPhoto: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg',
    rating: 5,
    text: "The specialized medicine reminders saved my diabetic cat. Tracking glucose trends is incredibly seamless.",
    date: '1 week ago',
    verified: true,
    helpfulCount: 18
  },
  {
    id: 3,
    ownerName: 'Elena R.',
    ownerLocation: 'Miami, FL',
    ownerPhoto: 'https://images.pexels.com/photos/3817103/pexels-photo-3817103.jpeg',
    petName: 'Oliver',
    petType: 'Bird',
    petPhoto: 'https://images.pexels.com/photos/1343592/pexels-photo-1343592.jpeg',
    rating: 5,
    text: "Love tracking my parrot's daily activities, behavioral shifts, and specialized nutritional adjustments.",
    date: '3 days ago',
    verified: true,
    helpfulCount: 12
  },
  {
    id: 4,
    ownerName: 'David T.',
    ownerLocation: 'Chicago, IL',
    ownerPhoto: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    petName: 'Buster, Chloe, Coco',
    petType: 'Others',
    petPhoto: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg',
    rating: 5,
    text: "Managing 3 high-maintenance pets finally feels easy. The interactive profile toggles work flawlessly.",
    date: '5 days ago',
    verified: true,
    helpfulCount: 30
  },
  {
    id: 5,
    ownerName: 'Chloe W.',
    ownerLocation: 'Denver, CO',
    ownerPhoto: 'https://images.pexels.com/photos/3995209/pexels-photo-3995209.jpeg',
    petName: 'Bella',
    petType: 'Dog',
    petPhoto: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    rating: 5,
    text: "This app taught me everything about puppy developmental timelines, socialization blocks, and vaccination charts.",
    date: '4 days ago',
    verified: true,
    helpfulCount: 9
  },
  {
    id: 6,
    ownerName: 'James L.',
    ownerLocation: 'Boston, MA',
    ownerPhoto: 'https://images.pexels.com/photos/3756439/pexels-photo-3756439.jpeg',
    petName: 'Rocky',
    petType: 'Dog',
    petPhoto: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    rating: 5,
    text: "Vet appointment tracking and the built-in emergency export files are absolute lifesavers.",
    date: '1 week ago',
    verified: true,
    helpfulCount: 42
  }
];

export default function UserReviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeTab, setActiveTab] = useState<'All' | 'Dog' | 'Cat' | 'Bird' | 'Others'>('All');
  const [sortBy, setSortBy] = useState<'Recent' | 'Highest' | 'Helpful'>('Helpful');
  const [visibleCount, setVisibleCount] = useState<number>(3);
  
  // Local interaction helpful clicks state
  const [clickedHelpful, setClickedHelpful] = useState<Record<number, boolean>>({});

  // Review creation states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: '',
    petName: '',
    petType: 'Dog' as 'Dog' | 'Cat' | 'Bird' | 'Others',
    rating: 5,
    text: '',
  });

  // Load helpfulness records from localStorage safely
  useEffect(() => {
    const saved = localStorage.getItem('pethorizon_helpful_clicks');
    if (saved) {
      try {
        setClickedHelpful(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleHelpfulClick = (id: number) => {
    const isClicked = clickedHelpful[id];
    const nextClicked = { ...clickedHelpful, [id]: !isClicked };
    setClickedHelpful(nextClicked);
    localStorage.setItem('pethorizon_helpful_clicks', JSON.stringify(nextClicked));

    setReviewsList(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            helpfulCount: isClicked ? r.helpfulCount - 1 : r.helpfulCount + 1,
          };
        }
        return r;
      })
    );
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || !newReview.petName) {
      alert('Please fill out all fields!');
      return;
    }

    const reviewObject: Review = {
      id: Date.now(),
      ownerName: newReview.name,
      ownerLocation: newReview.location || 'Verified Parent',
      ownerPhoto: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      petName: newReview.petName,
      petType: newReview.petType,
      petPhoto: newReview.petType === 'Dog' 
        ? 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg'
        : newReview.petType === 'Cat'
        ? 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg'
        : 'https://images.pexels.com/photos/1343592/pexels-photo-1343592.jpeg',
      rating: newReview.rating,
      text: newReview.text,
      date: 'Just now',
      verified: true,
      helpfulCount: 0,
    };

    setReviewsList([reviewObject, ...reviewsList]);
    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
    setNewReview({
      name: '',
      location: '',
      petName: '',
      petType: 'Dog',
      rating: 5,
      text: '',
    });
  };

  // Filter strategy implementation
  const filteredReviews = reviewsList.filter(r => {
    if (activeTab === 'All') return true;
    return r.petType === activeTab;
  });

  // Sort strategy implementation
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'Recent') {
      return b.id - a.id;
    }
    if (sortBy === 'Highest') {
      return b.rating - a.rating;
    }
    return b.helpfulCount - a.helpfulCount;
  });

  const displayedReviews = sortedReviews.slice(0, visibleCount);

  return (
    <section id="reviews" className="py-14 sm:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Glow layers */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block">
              User Testimonials
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-slate-900 mt-6 mb-4"
          >
            Loved by 10,000+ Pet Parents 🐾
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-medium"
          >
            Real stories from happy pets and their families
          </motion.p>
        </div>

        {/* Controls Panel */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between pb-8 mb-10 border-b border-slate-200">
          
          {/* Tab Selection Row */}
          <div className="flex flex-wrap gap-2 items-center">
            {(['All', 'Dog', 'Cat', 'Bird', 'Others'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setVisibleCount(3);
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white border border-slate-200 text-slate-650 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'All' ? 'All Classes' : tab + 's'}
              </button>
            ))}
          </div>

          {/* Sort Filter Options & Dialog Launcher */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            
            {/* Sorting Dropdown Selection */}
            <div className="relative flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-semibold shadow-sm">
              <span className="text-slate-400 mr-2">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-800 font-bold pr-5 focus:outline-none cursor-pointer appearance-none border-none"
              >
                <option value="Helpful">Most Helpful</option>
                <option value="Recent">Most Recent</option>
                <option value="Highest">Highest Rating</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 pointer-events-none" />
            </div>

            {/* Launch Review Form Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Write Review
            </button>
          </div>

        </div>

        {/* Core Layout Canvas (Desktop Dynamic Grid Layout) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isHelpfulClicked={clickedHelpful[review.id]}
                onHelpfulClick={handleHelpfulClick}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Alternative Layout Canvas (Mobile Touch Swiper Interface) */}
        <div className="block md:hidden">
          <Swiper spaceBetween={16} slidesPerView={1.1} className="py-4">
            {sortedReviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard
                  review={review}
                  isHelpfulClicked={clickedHelpful[review.id]}
                  onHelpfulClick={handleHelpfulClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Empty Search Filter Result State */}
        {sortedReviews.length === 0 && (
          <div className="p-16 text-center bg-white border border-slate-200 rounded-3xl">
            <p className="text-slate-500 font-semibold">No reviews matching the selection class yet. Be the first to write one!</p>
          </div>
        )}

        {/* Grid Infinite Load Reveal Actions */}
        {sortedReviews.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
            >
              Load More Reviews
            </button>
          </div>
        )}

      </div>

      {/* Review Interactive Input Form Modal Frame */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Main Modal Dialog Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-left"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Submit Pet Parent Review</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateReview} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Name</label>
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Sarah J."
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Location</label>
                    <input
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      placeholder="e.g. Austin, TX"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pet Name</label>
                    <input
                      type="text"
                      value={newReview.petName}
                      onChange={(e) => setNewReview({ ...newReview, petName: e.target.value })}
                      placeholder="e.g. Max"
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pet Type</label>
                    <select
                      value={newReview.petType}
                      onChange={(e) => setNewReview({ ...newReview, petType: e.target.value as any })}
                      className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none appearance-none"
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 font-black">Rating Scale</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none p-1 cursor-pointer"
                      >
                        <Star className={`w-6 h-6 transition-colors ${
                          star <= newReview.rating 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-slate-300 hover:text-amber-300'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Detailed Testimony</label>
                  <textarea
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    rows={4}
                    placeholder="Describe your pet longevity and schedule management experience..."
                    className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs transition cursor-pointer"
                >
                  Submit Parent Review ✅
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confetti Micro-Notification Banner View */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-55 bg-emerald-500 text-white font-black px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400"
          >
            <span className="text-xl">🎉</span>
            <div>
              <p className="text-sm">Review Submitted Successfully!</p>
              <p className="text-[10px] text-emerald-100 font-medium">Thank you for sharing your experience!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

function ReviewCard({
  review,
  isHelpfulClicked,
  onHelpfulClick,
}: {
  review: Review;
  isHelpfulClicked: boolean;
  onHelpfulClick: (id: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 flex flex-col gap-5 shadow-sm shadow-slate-100/50 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden text-left"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Profile Identity Details Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={review.ownerPhoto}
            alt={review.ownerName}
            className="w-12 h-12 rounded-full object-cover border border-emerald-500/10 bg-slate-50"
            loading="lazy"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-extrabold text-slate-800 leading-tight">{review.ownerName}</p>
              {review.verified && (
                <span className="flex items-center justify-center text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Verified
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{review.ownerLocation}</p>
          </div>
        </div>

        {/* Internal Pet Visual Meta Nodes */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-slate-100 overflow-hidden shadow-inner bg-slate-50">
            <img src={review.petPhoto} alt={review.petName} className="w-full h-full object-cover" />
          </div>
          <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wide">{review.petName.split(',')[0]}</span>
        </div>
      </div>

      {/* Stars Metric Tracker Layout */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
            }`}
          />
        ))}
        <span className="text-slate-400 text-xs ml-2 uppercase font-black tracking-widest">{review.petType}</span>
      </div>

      {/* Copy Content Block */}
      <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1">
        "{review.text}"
      </p>

      {/* Bottom Footer Meta Operations */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <span className="text-[11px] text-slate-400 font-bold">{review.date}</span>
        
        <button
          onClick={() => onHelpfulClick(review.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold transition-all duration-300 cursor-pointer ${
            isHelpfulClicked
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-350'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Helpful ({review.helpfulCount})</span>
        </button>
      </div>

    </motion.div>
  );
}