import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Check, Star, Zap, Shield } from 'lucide-react';

// CSS 3D Crystal — replaces per-card WebGL renderer
function CSSCrystal({ isPremium }: { isPremium: boolean }) {
  const size = 120;
  const color = isPremium ? '#10b981' : '#6ee7b7';

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size, perspective: `${size * 3}px` }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}${isPremium ? '30' : '20'}, transparent 65%)`,
          animation: 'orbPulse 3.5s ease-in-out infinite',
        }}
      />
      {/* Main shape — diamond/octahedron for premium, cube-ish for free */}
      <div
        className="absolute"
        style={{
          inset: isPremium ? '15%' : '18%',
          background: `radial-gradient(circle at 28% 28%, ${color}dd, ${color}55 50%, ${color}15 100%)`,
          boxShadow: `0 0 ${size / 3}px ${color}44, 0 0 ${size / 5}px ${color}55, inset 0 0 ${size / 4}px ${color}20`,
          borderRadius: isPremium ? '20% 50% 50% 50%' : '22%',
          animation: isPremium ? 'crystalSpin 10s linear infinite' : 'cubeFloat 14s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Ring 1 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '5%',
          borderColor: `${color}${isPremium ? '40' : '25'}`,
          borderWidth: isPremium ? '1.5px' : '1px',
          animation: 'orbRing1 8s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Ring 2 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '12%',
          borderColor: `${color}20`,
          animation: 'orbRing2 12s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Orbiting dots for premium */}
      {isPremium && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4,
                height: 4,
                top: '50%',
                left: '50%',
                marginLeft: -2,
                marginTop: -2,
                background: color,
                boxShadow: `0 0 6px ${color}`,
                animation: `dotOrbit ${5 + i}s linear infinite`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </>
      )}
      {/* Highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.15,
          height: size * 0.15,
          top: '20%',
          left: '25%',
          background: `${color}88`,
          filter: `blur(${size * 0.05}px)`,
        }}
      />
    </div>
  );
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [hoveredPlan, setHoveredPlan] = useState<'free' | 'premium' | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const freeFeatures: string[] = [
    '1 Pet Limit',
    'Basic Pet Management',
    'Feeding & Schedule Tracking',
    'Journal System',
    'Expense Tracking',
    'Birthday Features',
  ];

  const premiumFeatures: string[] = [
    'Unlimited Pets',
    'Family Sharing',
    'Invite Members',
    'Advanced Permissions',
    'Premium Dashboard Features',
    'Shared Activity Management',
    'Multi-Pet Access',
  ];

  // Lazy Three.js background
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanup: (() => void) | null = null;

    function init(sectionEl: HTMLElement) {
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const canvas = renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      sectionEl.insertBefore(canvas, sectionEl.firstChild);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 500);
      camera.position.z = 35;

      const resize = () => {
        const w = sectionEl.clientWidth;
        const h = sectionEl.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(sectionEl);

      const hexGroup = new THREE.Group();
      scene.add(hexGroup);

      for (let i = 0; i < 16; i++) {
        const geo = new THREE.CircleGeometry(Math.random() * 2 + 1, 6);
        const mat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          wireframe: true,
          transparent: true,
          opacity: Math.random() * 0.05 + 0.02,
        });
        const hex = new THREE.Mesh(geo, mat);
        hex.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 5,
        );
        hex.rotation.z = Math.random() * Math.PI;
        hexGroup.add(hex);
      }

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        hexGroup.rotation.z += 0.0005;
        hexGroup.children.forEach((c) => {
          (c as THREE.Mesh).rotation.z += 0.002;
        });
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cleanup) {
          cleanup = init(section);
        } else if (!entry.isIntersecting && cleanup) {
          cleanup();
          cleanup = null;
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-14 sm:py-28 bg-section-light relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* CSS glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
              Flexible Plans
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mt-6 mb-4"
          >
            Simple,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600">
              Transparent
            </span>{' '}
            Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mb-10"
          >
            Choose the perfect companion plan for your pet family.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 p-1.5 bg-gray-100 border border-gray-200/80 rounded-2xl w-fit mx-auto"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                !isYearly
                  ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                isYearly
                  ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Yearly
              <span className="text-[10px] bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-full">
                -17%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">

          {/* Free Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 20 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredPlan('free')}
            onHoverEnd={() => setHoveredPlan(null)}
            className="relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
              background: '#ffffff',
              border: `1px solid ${hoveredPlan === 'free' ? 'rgba(16,185,129,0.35)' : 'rgba(229,231,235,0.8)'}`,
              boxShadow: hoveredPlan === 'free' ? '0 10px 30px rgba(16,185,129,0.06)' : '0 1px 3px rgba(0,0,0,0.02)',
              transition: 'all 0.4s ease',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{ background: 'linear-gradient(90deg, transparent, #6ee7b7, transparent)', opacity: hoveredPlan === 'free' ? 0.8 : 0.2 }} />

            <div className="p-8 md:p-10">
              <div className="flex items-start gap-5 mb-8">
                <CSSCrystal isPremium={false} />
                <div className="pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Free Forever</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Free Plan</h3>
                  <p className="text-gray-500 text-sm">Essential pet care tools</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-8 pl-1">
                <span className="text-6xl font-black text-gray-900">$0</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {freeFeatures.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 text-gray-600 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full border border-emerald-500/30 bg-emerald-500/8 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span>{feat}</span>
                  </motion.li>
                ))}
              </ul>

              <button
                onClick={() => alert('Welcome to Pet Horizon Free!')}
                className="w-full py-4 rounded-2xl font-bold text-sm border border-gray-200 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 bg-gray-50 hover:bg-emerald-50 transition-all duration-300 cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </motion.div>

          {/* Premium Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 20, delay: 0.1 }}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredPlan('premium')}
            onHoverEnd={() => setHoveredPlan(null)}
            className="relative rounded-3xl overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #e6fcf5 100%)',
              border: '1px solid rgba(16,185,129,0.45)',
              boxShadow: hoveredPlan === 'premium'
                ? '0 15px 35px rgba(16,185,129,0.12), inset 0 0 60px rgba(16,185,129,0.02)'
                : '0 8px 20px rgba(16,185,129,0.06)',
              transition: 'all 0.4s ease',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)',
                opacity: hoveredPlan === 'premium' ? 1 : 0.6,
              }}
            />

            <div
              className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
            />

            <div className="absolute top-5 right-5">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-[0_4px_15px_rgba(16,185,129,0.35)] uppercase tracking-wider"
              >
                <Star className="w-3 h-3 fill-white" />
                Most Popular
              </motion.div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex items-start gap-5 mb-8">
                <CSSCrystal isPremium={true} />
                <div className="pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-widest">Premium Access</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-1">Premium Plan</h3>
                  <p className="text-gray-500 text-sm">Unlimited smart care</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-2 pl-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    {isYearly ? '$4.16' : '$4.99'}
                  </motion.span>
                </AnimatePresence>
                <div>
                  <div className="text-gray-500 text-sm">/month</div>
                  {isYearly && <div className="text-emerald-600 text-xs font-bold">billed yearly</div>}
                </div>
              </div>
              {isYearly && <p className="text-emerald-600/80 text-xs mb-6 pl-1">Save $10.36 per year vs monthly</p>}
              {!isYearly && <div className="mb-6" />}

              <ul className="space-y-3.5 mb-8">
                {premiumFeatures.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 text-gray-700 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800">{feat}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('Redirecting to Premium checkout...')}
                className="w-full py-4 rounded-2xl font-black text-white cursor-pointer relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Join Premium
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-gray-400 text-xs font-medium"
        >
          {['Secure Stripe checkout', 'Cancel anytime', 'Secure & encrypted', '24h support'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
