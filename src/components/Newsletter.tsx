import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Send, CheckCircle2, User, PawPrint } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Newsletter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petType: 'Dog' as 'Dog' | 'Cat' | 'Bird' | 'Others',
    allowReminders: true,
  });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill out your name and email address!');
      return;
    }

    // Launch beautiful, multi-layered canvas-confetti blast
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#3b82f6'],
    });

    setIsSuccess(true);
  };

  return (
    <section id="newsletter" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Asymmetric Split Layout Card Container */}
        <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-slate-200 bg-[#F8FAFC] overflow-hidden shadow-sm relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
            
            {/* LEFT REGION: Elite Vector Illustration / Brand Panel (5 Cols) */}
            <div className="md:col-span-5 bg-emerald-50/70 border-r border-slate-200 p-8 sm:p-10 flex flex-col justify-between text-left relative overflow-hidden">
              {/* Internal glow backdrop blob */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

              <div className="flex flex-col gap-4 relative z-10">
                <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-250 bg-emerald-100/60 w-fit">
                  Parent Insights
                </span>
                
                <h3 className="text-3xl font-black text-slate-900 leading-tight">
                  Unlock Smart Care Secrets
                </h3>
                
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                  Subscribe to receive weekly diagnostic insights, custom vaccine reminders, birthday party tip kits, and optimal nutrition guides tailored specifically for your pet's breed.
                </p>
              </div>

              {/* Graphic Mascot Frame */}
              <div className="my-8 relative flex justify-center items-center h-48">
                {/* Spinning orbital background lines */}
                <div className="absolute w-44 h-44 rounded-full border border-emerald-550/10 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="absolute w-36 h-36 rounded-full border border-teal-500/10 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />

                {/* Styled illustration badge overlapping */}
                <div className="relative w-28 h-28 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
                  <PawPrint className="w-12 h-12 fill-emerald-500/10 animate-pulse text-emerald-500" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest relative z-10">
                <span>Over 50,000+ Subscribers</span>
              </div>
            </div>

            {/* RIGHT REGION: Interactive Data Processing fields (7 Cols) */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center text-left bg-white">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <h4 className="text-2xl font-black text-slate-900">Join the Family Newsletter</h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">Get custom longevity tips delivered straight to your inbox.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Your Name input */}
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Your Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
                            required
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 pl-11 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition"
                            required
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Dropdown pet select */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Primary Pet Category</label>
                        <select
                          value={formData.petType}
                          onChange={(e) => setFormData({ ...formData, petType: e.target.value as any })}
                          className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl p-3.5 text-sm text-slate-800 focus:outline-none transition appearance-none"
                        >
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      {/* Vaccine custom alerts checkbox */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="allow-reminders"
                          checked={formData.allowReminders}
                          onChange={(e) => setFormData({ ...formData, allowReminders: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-350 bg-white text-emerald-500 focus:ring-emerald-500 transition flex-shrink-0 cursor-pointer mt-0.5"
                        />
                        <label htmlFor="allow-reminders" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none font-semibold">
                          Send me automated birthday celebration kits and vaccine reminders for my pet.
                        </label>
                      </div>

                      {/* Action button */}
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/10 uppercase tracking-widest text-xs transition cursor-pointer flex items-center justify-center gap-2 group mt-6"
                      >
                        <Send className="w-4 h-4" />
                        <span>Subscribe Insights</span>
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center p-8 gap-5 bg-white"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-slate-900">You Are In! 🎉</h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-sm mx-auto font-medium">
                        Welcome to Pet Horizon Insights, <span className="text-emerald-600 font-extrabold">{formData.name}</span>. We've queued vaccine timeline indicators and breed benchmarks for your <span className="text-emerald-600 font-extrabold">{formData.petType}</span>!
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      Subscribe Another Pet
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
