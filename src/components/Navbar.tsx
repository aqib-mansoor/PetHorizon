import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/PH-logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Transformations', href: '#transformations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Community', href: '#community' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center space-x-2.5 text-2xl font-black hover:opacity-90 transition-opacity"
            >
              <img
                src={logoImg}
                alt="Pet Horizon Logo"
                className="h-10 w-auto object-contain rounded-full bg-emerald-500/10 p-0.5 border border-emerald-500/20"
              />
              <span className={`tracking-wide transition-all duration-300 bg-gradient-to-r bg-clip-text text-transparent ${
                isScrolled
                  ? 'from-emerald-600 via-emerald-500 to-teal-500'
                  : 'from-slate-900 via-slate-800 to-emerald-600'
              }`}>
                Pet Horizon
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-semibold text-slate-700 hover:text-emerald-600 transition-all duration-200 hover:scale-105 text-sm"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#pricing"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-emerald-500/10 hover:shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.03] text-sm"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`focus:outline-none p-2 rounded-xl transition-all duration-200 border ${
                  isScrolled
                    ? 'text-slate-800 hover:text-emerald-600 hover:bg-slate-50 border-slate-100'
                    : 'text-slate-800 hover:text-emerald-600 hover:bg-slate-50 border-slate-200/60'
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[76px] z-40 md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-700 hover:text-emerald-600 hover:bg-slate-50 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 px-1">
                <a
                  href="#pricing"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-500/25"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
