import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import SmartFeatures from './components/SmartFeatures';
import WhyChoose from './components/WhyChoose';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased font-sans select-none selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. About Section */}
      <About />

      {/* 4. Core Features */}
      <Features />

      {/* 5. Pricing Section (with Google Play / App Store Badges) */}
      <Pricing />

      {/* 6. How It Works stepper */}
      <HowItWorks />

      {/* 7. Smart Features */}
      <SmartFeatures />

      {/* 8. Why Choose Pet Horizon checklist */}
      <WhyChoose />

      {/* 9. CTA Section */}
      <CTA />

      {/* 10. Contact Us Section */}
      <Contact />

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
