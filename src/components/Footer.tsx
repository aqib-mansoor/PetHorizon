import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import logoImg from '../assets/PH-logo.png';
import appStoreImg from '../assets/app-store.svg';
import googlePlayImg from '../assets/google-play.svg';
import appAndroidImg from '../assets/app-android.svg';

// Three.js background: slow ascending particles like fireflies
function FooterBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerEl = container as HTMLElement;

    let cleanup: (() => void) | null = null;

    function init() {
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
      camera.position.z = 20;

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

      // Firefly particles rising slowly
      const count = 50;
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count);
      const phases = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        velocities[i] = Math.random() * 0.01 + 0.005;
        phases[i] = Math.random() * Math.PI * 2;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.2,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Gentle wireframe sphere in corner
      const sphereGeo = new THREE.IcosahedronGeometry(4, 1);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.03,
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(15, -5, -10);
      scene.add(sphere);

      let animId = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        const pos = geo.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] += velocities[i];
          pos[i * 3] += Math.sin(time + phases[i]) * 0.003;
          // Reset when too high
          if (pos[i * 3 + 1] > 12) {
            pos[i * 3 + 1] = -12;
            pos[i * 3] = (Math.random() - 0.5) * 40;
          }
        }
        geo.attributes.position.needsUpdate = true;

        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;

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
          cleanup = init();
        } else if (!entry.isIntersecting && cleanup) {
          cleanup();
          cleanup = null;
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(containerEl);

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
    };
  }, [containerRef]);

  return null;
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      className="bg-section-light text-gray-600 pt-24 pb-12 relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <FooterBackground containerRef={footerRef} />

      {/* Top border shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)',
          opacity: 0.5,
        }}
      />

      {/* CSS Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative animate-fade-in" style={{ zIndex: 1 }}>

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 pb-16 mb-12" style={{ borderBottom: '1px solid rgba(229,231,235,0.6)' }}>

          {/* Column 1: Brand Info (4 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 md:col-span-4 text-left"
          >
            <div className="flex items-center gap-3 text-xl font-bold mb-6">
              <div
                className="rounded-full p-1 bg-white border border-slate-200 shadow-sm"
              >
                <img
                  src={logoImg}
                  alt="Pet Horizon Logo"
                  className="h-9 w-auto object-contain rounded-full"
                />
              </div>
              <span className="flex items-center text-xl font-black tracking-tight text-slate-900 select-none">
                Pet<span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent font-extrabold">Horizon</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm font-medium">
              Your complete veterinary-approved smart pet longevity assistant. Log medication regimens, track fitness, calculate budgets, and sync family care logs seamlessly.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'Facebook',
                  href: '#facebook',
                  svg: <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />,
                },
                {
                  label: 'Twitter',
                  href: '#twitter',
                  svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                },
                {
                  label: 'Instagram',
                  href: '#instagram',
                  svg: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                    </>
                  ),
                  noFill: true,
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 cursor-pointer group bg-slate-100 border border-slate-200 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill={social.noFill ? 'none' : 'currentColor'}>
                    {social.svg}
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Platform Links (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 text-left"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-6">
              Platform
            </h3>
            <ul className="space-y-3.5 text-sm font-semibold">
              {[
                { label: 'Home Dashboard', href: '#home' },
                { label: 'Core Features', href: '#features' },
                { label: 'Case Studies', href: '#transformations' },
                { label: 'Pricing Plans', href: '#pricing' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Community Links (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 text-left"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-6">
              Community
            </h3>
            <ul className="space-y-3.5 text-sm font-semibold">
              {[
                { label: 'Community Hub', href: '#community' },
                { label: 'Member Reviews', href: '#reviews' },
                { label: 'Pet Photo Gallery', href: '#gallery' },
                { label: 'Profile Badges', href: '#badges' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Support (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 text-left"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-6">
              Support
            </h3>
            <ul className="space-y-3.5 text-sm font-semibold">
              {[
                { label: 'Get in Touch', href: '#contact' },
                { label: 'Help Center', href: '#contact' },
                { label: 'Telemetry API', href: '#home' },
                { label: 'Status Monitor', href: '#home' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Apps (2 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="md:col-span-2 text-left"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-6">
              Apps
            </h3>
            <div className="flex flex-col gap-2.5 max-w-[140px]">
              {[
                {
                  href: 'https://apps.apple.com',
                  img: appStoreImg,
                  alt: 'Download on the App Store',
                },
                {
                  href: 'https://play.google.com',
                  img: googlePlayImg,
                  alt: 'Get it on Google Play',
                },
                {
                  href: 'https://play.google.com',
                  img: appAndroidImg,
                  alt: 'Download for Android',
                },
              ].map((badge, index) => (
                <a
                  key={index}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-2 block cursor-pointer group bg-slate-100 border border-slate-200 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-50/50 hover:shadow-sm hover:scale-[1.02]"
                >
                  <img src={badge.img} alt={badge.alt} className="w-full h-auto brightness-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4"
        >
          <p className="font-medium">Pet Horizon © 2026 | All Rights Reserved</p>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 animate-pulse" />
            <span>for pet parents worldwide.</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
