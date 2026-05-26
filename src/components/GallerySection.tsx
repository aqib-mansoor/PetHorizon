import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, X, PlusCircle, AlertCircle } from 'lucide-react';

interface GalleryItem {
  id: number;
  url: string;
  alt: string;
  petName: string;
  category: string;
  defaultHearts: number;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    alt: 'Happy golden retriever running in park using Pet Horizon app tracking tools',
    petName: 'Max',
    category: 'Dog Tracker',
    defaultHearts: 154,
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg',
    alt: 'Tabby cat sleeping peacefully under app-scheduled environmental tracking metrics',
    petName: 'Luna',
    category: 'Cat Schedule',
    defaultHearts: 243,
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    alt: 'Playful companion puppies engaging in social activities tracked by owners',
    petName: 'Buddy & Charlie',
    category: 'Social Event',
    defaultHearts: 189,
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    alt: 'Kitten eating meal tracked by smart nutrition app profile log',
    petName: 'Milo',
    category: 'Diet Log',
    defaultHearts: 312,
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
    alt: 'Two golden dogs playing together in the yard',
    petName: 'Bella & Cooper',
    category: 'Active Walk',
    defaultHearts: 228,
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg',
    alt: 'Colorful pet parrot perched on stand',
    petName: 'Rio',
    category: 'Bird Activity',
    defaultHearts: 97,
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg',
    alt: 'Domestic rabbit eating fresh leafy greens log',
    petName: 'Buster',
    category: 'Rabbit Diet',
    defaultHearts: 142,
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
    alt: 'Exotic fish in modern aquarium with regular maintenance scheduler controls',
    petName: 'Bubbles',
    category: 'Aquarium Life',
    defaultHearts: 74,
  },
  {
    id: 9,
    url: 'https://images.pexels.com/photos/1051738/pexels-photo-1051738.jpeg',
    alt: 'Active hamster exercising on running wheel logged by parent',
    petName: 'Cheeks',
    category: 'Hamster Log',
    defaultHearts: 115,
  },
  {
    id: 10,
    url: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg',
    alt: 'Happy golden dog enjoying outdoor activity tracked by app',
    petName: 'Gizmo',
    category: 'Device View',
    defaultHearts: 204,
  },
];

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryItem[]>(GALLERY_DATA);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Custom uploaded state and modals
  const [parentHearts, setParentHearts] = useState<Record<number, boolean>>({});

  // Load parent likes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pethorizon_gallery_likes');
    if (saved) {
      try {
        setParentHearts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleHeartClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering lightbox opening
    const isLiked = parentHearts[id];
    const nextHearts = { ...parentHearts, [id]: !isLiked };
    setParentHearts(nextHearts);
    localStorage.setItem('pethorizon_gallery_likes', JSON.stringify(nextHearts));

    setGallery(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            defaultHearts: isLiked ? item.defaultHearts - 1 : item.defaultHearts + 1,
          };
        }
        return item;
      })
    );
  };

  const handleShareClick = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    alert(`Copied link to clipboard! Share ${name}’s active moment with your friends.`);
  };

  return (
    <section id="gallery" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 text-left">

        {/* Section Heading & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
          <div>
            <span className="text-emerald-700 font-extrabold tracking-wider text-xs uppercase bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm inline-block mb-4">
              Community Gallery
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Pets Love{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Pet Horizon
              </span>
            </h2>
            <p className="text-slate-500 text-base mt-2 font-medium">
              Staggered moments shared by verified smart pet parents around the globe.
            </p>
          </div>
        </div>{/* end section heading row */}

        {/* High-Performance Staggered Masonry Grid Canvas Layout */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-6 space-y-6 [column-fill:_balance]">
          {gallery.map((item, idx) => {
            const isLiked = parentHearts[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden cursor-pointer group border border-slate-100 bg-slate-50 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-emerald-500/20 mb-6"
              >
                {/* Image element with responsive pulse fallback */}
                <div className="w-full relative overflow-hidden bg-slate-100 rounded-t-3xl">
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Linear Masking Dark Gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left" />
                </div>

                {/* Floating Interactive HUD overlay on hover */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest">{item.category}</span>
                      <h4 className="text-white font-black text-lg mt-0.5">{item.petName}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Heart Clicker */}
                      <button
                        onClick={(e) => handleHeartClick(item.id, e)}
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                          isLiked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-emerald-55 border-none'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                      </button>

                      {/* Share Quick-link */}
                      <button
                        onClick={(e) => handleShareClick(item.petName, e)}
                        className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-emerald-500/20 flex items-center justify-center transition"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Permanent Metric Strip */}
                <div className="flex flex-col min-[380px]:flex-row justify-between min-[380px]:items-center p-3 sm:p-4 bg-slate-50 border-t border-slate-100 rounded-b-3xl gap-1.5 min-[380px]:gap-0">
                  <span className="text-[10px] min-[380px]:text-xs font-bold text-slate-400 uppercase tracking-wider">{item.petName}</span>
                  <div className="flex items-center gap-1.5 text-[10px] min-[380px]:text-xs text-slate-650 font-extrabold">
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-500 text-emerald-500 animate-pulse' : 'text-slate-350'}`} />
                    <span>{item.defaultHearts} likes</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Upload Moment Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Share Your Pet's Moment</h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Fallback Banner Info */}
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed font-semibold">
                  <p className="font-bold">Cloud media syncing arriving in v2.0</p>
                  <p className="text-amber-700/80 mt-1">Platform community synchronization is currently in clinical staging. You can preview details locally.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pet Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Max"
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Category tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Active Walk"
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Upload Photo</label>
                  <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 bg-slate-50">
                    <PlusCircle className="w-8 h-8 mx-auto mb-2 text-slate-350" />
                    <p className="text-xs font-bold">Select File from Device</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black py-3 rounded-xl uppercase tracking-widest text-xs transition cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox full viewport modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-transparent z-10 flex flex-col gap-4 text-left"
            >
              
              {/* Image Frame */}
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl aspect-[4/3] sm:aspect-[16/10] max-h-[80vh] w-full bg-slate-900">
                <img
                  src={gallery[lightboxIndex].url}
                  alt={gallery[lightboxIndex].alt}
                  className="w-full h-full object-contain"
                />
                
                {/* Top Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 bg-black/40 text-white hover:bg-white/10 flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Metadata Info Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-800">
                <div className="max-w-xl">
                  <span className="text-xs text-emerald-600 font-extrabold uppercase tracking-widest">{gallery[lightboxIndex].category}</span>
                  <h3 className="text-2xl font-black mt-1 text-slate-950">Shared by {gallery[lightboxIndex].petName}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{gallery[lightboxIndex].alt}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleHeartClick(gallery[lightboxIndex!].id, e)}
                    className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider border flex items-center gap-2 transition cursor-pointer ${
                      parentHearts[gallery[lightboxIndex].id]
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${parentHearts[gallery[lightboxIndex].id] ? 'fill-white' : ''}`} />
                    <span>{gallery[lightboxIndex].defaultHearts} Likes</span>
                  </button>

                  <button
                    onClick={(e) => handleShareClick(gallery[lightboxIndex!].petName, e)}
                    className="px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
