import React, { useState, useEffect } from 'react';
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
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className={`flex items-center space-x-2 text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-secondary' : 'text-white'}`}>
              <img src={logoImg} alt="Pet Horizon Logo" className="h-10 w-auto object-contain" />
              <span>Pet Horizon</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors duration-200 ${
                    isScrolled ? 'text-gray-600 hover:text-primary' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#pricing"
                className="bg-primary hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-emerald-500/20 hover:shadow-emerald-600/30 transition-all duration-200"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`focus:outline-none p-2 rounded-lg transition-colors duration-200 ${
                  isScrolled ? 'text-gray-600 hover:text-primary hover:bg-emerald-50' : 'text-white hover:text-emerald-200 hover:bg-white/10'
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
            className="fixed inset-x-0 top-[72px] z-40 md:hidden bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-primary hover:bg-emerald-50 px-3 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 px-3">
                <a
                  href="#pricing"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-primary hover:bg-emerald-600 text-white py-3 rounded-xl font-medium shadow-md shadow-emerald-500/20"
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
