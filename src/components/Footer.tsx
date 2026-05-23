
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/PH-logo.png';
import appStoreImg from '../assets/app-store.svg';
import googlePlayImg from '../assets/google-play.svg';
import appAndroidImg from '../assets/app-android.svg';

export default function Footer() {
  return (
    <footer className="bg-[#030605] text-emerald-100/80 pt-24 pb-12 relative overflow-hidden border-t border-emerald-500/10">
      {/* Subtle Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5 mb-12">
          
          {/* Column 1: Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 text-left"
          >
            <div className="flex items-center space-x-2.5 text-xl font-bold mb-6">
              <img
                src={logoImg}
                alt="Pet Horizon Logo"
                className="h-10 w-auto object-contain rounded-full bg-white/5 p-1 border border-white/10 shadow-sm"
              />
              <span className="bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent tracking-wide">
                Pet Horizon
              </span>
            </div>
            <p className="text-emerald-100/50 text-sm leading-relaxed mb-6 max-w-sm">
              Your complete smart pet care companion platform. Manage health, schedules, meals, budgets, and capture memories in one beautiful dashboard.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#facebook" className="bg-white/5 hover:bg-primary border border-white/10 hover:border-primary p-2.5 rounded-xl text-emerald-400 hover:text-white transition-all duration-300 shadow-sm" aria-label="Facebook">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#twitter" className="bg-white/5 hover:bg-primary border border-white/10 hover:border-primary p-2.5 rounded-xl text-emerald-400 hover:text-white transition-all duration-300 shadow-sm" aria-label="Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#instagram" className="bg-white/5 hover:bg-primary border border-white/10 hover:border-primary p-2.5 rounded-xl text-emerald-400 hover:text-white transition-all duration-300 shadow-sm" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 text-left"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Quick Navigation</h3>
            <ul className="space-y-3.5 text-sm text-emerald-100/50">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Core Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing Plans</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
          </motion.div>

          {/* Column 3: App Store Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-4 text-left"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Download Companion App</h3>
            <div className="flex flex-col gap-4 max-w-[170px]">
              
              {/* Apple App Store */}
              <a
                href="https://apps.apple.com/us/app/rover-dog-boarding-walking/id547328133"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 rounded-2xl p-2 transition-all duration-300 shadow-sm block hover:scale-105"
              >
                <img src={appStoreImg} alt="Download on the App Store" className="w-full h-auto" />
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=com.rover.android"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 rounded-2xl p-2 transition-all duration-300 shadow-sm block hover:scale-105"
              >
                <img src={googlePlayImg} alt="Get it on Google Play" className="w-full h-auto" />
              </a>

              {/* Android Download */}
              <a
                href="https://play.google.com/store/apps/details?id=com.rover.android"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 rounded-2xl p-2 transition-all duration-300 shadow-sm block hover:scale-105"
              >
                <img src={appAndroidImg} alt="Download for Android" className="w-full h-auto" />
              </a>

            </div>
          </motion.div>

        </div>

        {/* Bottom Panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/30 gap-4"
        >
          <p>Pet Horizon © 2026 | Smart Pet Care Platform 🐾</p>
          <div className="flex items-center space-x-1.5">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />
            <span>for pet owners worldwide.</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
