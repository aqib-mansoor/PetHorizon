import { useState, FormEvent, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Mail, Send, Heart, Clock, Shield } from 'lucide-react';

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

// Three.js background: gentle wave of particles
function ContactBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup: (() => void) | null = null;

    function init(containerEl: HTMLElement) {
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const canvas = renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      containerEl.insertBefore(canvas, containerEl.firstChild);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
      camera.position.z = 25;

      const resize = () => {
        const w = containerEl.clientWidth;
        const h = containerEl.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(containerEl);

      // Wave grid of particles
      const gridSize = 20;
      const count = gridSize * gridSize;
      const positions = new Float32Array(count * 3);

      for (let ix = 0; ix < gridSize; ix++) {
        for (let iz = 0; iz < gridSize; iz++) {
          const i = ix * gridSize + iz;
          positions[i * 3] = (ix - gridSize / 2) * 2.5;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (iz - gridSize / 2) * 2.5 - 15;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.15,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(geo, mat);
      points.rotation.x = -0.4;
      scene.add(points);

      let animId = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        const pos = geo.attributes.position.array as Float32Array;

        for (let ix = 0; ix < gridSize; ix++) {
          for (let iz = 0; iz < gridSize; iz++) {
            const i = ix * gridSize + iz;
            pos[i * 3 + 1] = Math.sin(ix * 0.4 + time) * 0.8 + Math.cos(iz * 0.4 + time * 0.7) * 0.6;
          }
        }
        geo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cleanup) {
          cleanup = init(container);
        } else if (!entry.isIntersecting && cleanup) {
          cleanup();
          cleanup = null;
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
    };
  }, [containerRef]);

  return null;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormDataState>({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the fields!");
      return;
    }
    alert("Message sent (demo)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 bg-[#050b08] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <ContactBackground containerRef={sectionRef} />

      {/* CSS blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, type: 'spring', damping: 20 }}
            className="lg:col-span-5 text-left"
          >
            {/* Info card */}
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  opacity: 0.4,
                }}
              />

              <div className="p-8 md:p-10">
                <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
                  Get In Touch
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-white mt-6 mb-5">
                  Contact{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    Us
                  </span>
                </h2>
                <p className="text-emerald-100/55 leading-relaxed mb-10 text-base">
                  Have questions about premium subscriptions, or want to suggest new features? Shoot us a message! We love feedback.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <a
                    href="mailto:support@pethorizon.com"
                    className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer group"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
                      e.currentTarget.style.background = 'rgba(16,185,129,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                      <Mail className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Email Support</h4>
                      <p className="text-emerald-400 text-xs mt-0.5 group-hover:text-emerald-300 transition-colors">support@pethorizon.com</p>
                    </div>
                  </a>

                  {/* Response time */}
                  <div
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Response Time</h4>
                      <p className="text-emerald-100/45 text-xs mt-0.5">Within 24 hours on business days.</p>
                    </div>
                  </div>

                  {/* Secure */}
                  <div
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Secure & Encrypted</h4>
                      <p className="text-emerald-100/45 text-xs mt-0.5">All communications are end-to-end encrypted.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/8 mt-8 pt-6 flex items-center gap-2 text-xs text-emerald-100/30">
                  <span>Made with</span>
                  <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
                  <span>for pet owners worldwide.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, type: 'spring', damping: 20, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  opacity: 0.4,
                }}
              />

              <div className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="text-left">
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-emerald-100/70 mb-2.5">
                      Your Name
                    </label>
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        boxShadow: focusedField === 'name' ? '0 0 20px rgba(16,185,129,0.15)' : 'none',
                      }}
                    >
                      {focusedField === 'name' && (
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                      )}
                      <input
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/8 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="text-left">
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-emerald-100/70 mb-2.5">
                      Email Address
                    </label>
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        boxShadow: focusedField === 'email' ? '0 0 20px rgba(16,185,129,0.15)' : 'none',
                      }}
                    >
                      {focusedField === 'email' && (
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                      )}
                      <input
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="name@example.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/8 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-left">
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-emerald-100/70 mb-2.5">
                      How can we help?
                    </label>
                    <div
                      className="relative rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        boxShadow: focusedField === 'message' ? '0 0 20px rgba(16,185,129,0.15)' : 'none',
                      }}
                    >
                      {focusedField === 'message' && (
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                      )}
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        placeholder="Write your message here..."
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/8 rounded-2xl p-4 text-sm text-white placeholder-emerald-100/20 focus:outline-none transition-all duration-300 resize-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-2xl font-black text-white cursor-pointer relative overflow-hidden group flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #34d399)',
                      boxShadow: '0 0 25px rgba(16,185,129,0.4)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
