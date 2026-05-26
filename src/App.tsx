import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UserReviews from './components/UserReviews';
import GallerySection from './components/GallerySection';
import Transformations from './components/Transformations';
import CommunityHub from './components/CommunityHub';
import Badges from './components/Badges';
import ContactUs from './components/ContactUs';
import Partners from './components/Partners';
import Comparison from './components/Comparison';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans select-none selection:bg-emerald-500/20 selection:text-emerald-700 relative overflow-hidden">
      
      {/* Constellation Particle Network Backdrop */}
      <BackgroundCanvas />

      {/* Sticky Navigation Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

       {/* Community Photo Gallery */}
      <GallerySection />

      {/* Pet Health Transformation Case Studies */}
      <Transformations />

      {/* Community Hub */}
      <CommunityHub />

      {/* Gamification & Achievement Badges */}
      <Badges />

      {/* User Reviews & Testimonials */}
      <UserReviews />

      {/* Contact Us Form */}
      <ContactUs />

      {/* Partner Logos Ribbon */}
      <Partners />

      {/* Feature Comparison Matrix */}
      <Comparison />

  

      {/* Footer */}
      <Footer />
      
    </div>
  );
}
