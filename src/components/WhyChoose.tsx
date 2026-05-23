import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { CheckCircle2, Award, HeartHandshake } from 'lucide-react';

interface BenefitItem {
  title: string;
  desc: string;
}

// Three.js background: slow-rotating wireframe torus knot (lazy loaded)
function WhyChooseBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
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
      camera.position.z = 30;

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

      const torusGeo = new THREE.TorusKnotGeometry(8, 0.4, 100, 8, 2, 3);
      const torusMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.04,
      });
      const torusKnot = new THREE.Mesh(torusGeo, torusMat);
      torusKnot.position.set(12, 0, -10);
      scene.add(torusKnot);

      const partCount = 40;
      const partPositions = new Float32Array(partCount * 3);
      for (let i = 0; i < partCount; i++) {
        partPositions[i * 3] = (Math.random() - 0.5) * 50;
        partPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        partPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      const partGeo = new THREE.BufferGeometry();
      partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
      const partMat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.15,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      scene.add(new THREE.Points(partGeo, partMat));

      let animId = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.001;
        torusKnot.rotation.y += 0.002;
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

// Animated counter
function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numTarget = parseInt(target.replace(/\D/g, ''));
    const duration = 1500;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(numTarget * eased).toString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
      {target.startsWith('#') ? '#' : ''}{display}{suffix}
    </span>
  );
}

export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  const benefits: BenefitItem[] = [
    { title: 'All-in-One Dashboard', desc: 'Schedules, health, and memories unified in a single space.' },
    { title: 'Multi-Pet Adaptability', desc: 'Toggle and manage profiles for all your pets seamlessly.' },
    { title: 'Smart Auto-Reminders', desc: 'Get alerts for feeds, medicines, vaccines, and vet visits.' },
    { title: 'Shared Family Access', desc: 'Coordinate care with family, sitters, and custom permission levels.' },
    { title: 'Detailed Health Logs', desc: 'Track weights, health markers, and long-term diagnostic histories.' },
    { title: 'Built-in Expense Tracker', desc: 'Control costs on food, healthcare, toys, and monitor budgets.' },
    { title: 'Secure & Private Platform', desc: 'Your pet\'s memories and shared records are fully encrypted.' },
    { title: 'Breed-Specific Guidance', desc: 'Access tailored nutrition advice and care tips for specific breeds.' },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="py-14 sm:py-28 bg-[#050b08] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <WhyChooseBackground containerRef={sectionRef} />

      {/* CSS blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, type: 'spring', damping: 20 }}
            className="lg:col-span-5 text-left"
          >
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              The Pet Horizon Advantage
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-6 mb-5 leading-tight">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Pet Horizon?
              </span>
            </h2>
            <p className="text-emerald-100/55 leading-relaxed mb-10 text-lg">
              We design our companion platform to be as loving, careful, and proactive as you are with your furry family members.
            </p>

            {/* Stat cards with animated counters */}
            <div className="space-y-5">
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-center gap-5 p-6 rounded-3xl overflow-hidden relative cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(16,185,129,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                  <Award className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <AnimatedCounter target="#1" suffix="" />
                  <h4 className="font-bold text-white text-sm mt-1">Smart Care App</h4>
                  <p className="text-xs text-emerald-100/45 mt-0.5">Voted best upcoming companion tool in 2026.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-center gap-5 p-6 rounded-3xl overflow-hidden relative cursor-pointer group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(16,185,129,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                  <HeartHandshake className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Vet-Approved</span>
                  <h4 className="font-bold text-white text-sm mt-1">Made by Vet Advisors</h4>
                  <p className="text-xs text-emerald-100/45 mt-0.5">Every feature is guided by professional veterinary advice.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Benefits checklist */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, type: 'spring', damping: 20, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => {
                const isHovered = hoveredBenefit === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    onHoverStart={() => setHoveredBenefit(idx)}
                    onHoverEnd={() => setHoveredBenefit(null)}
                    className="flex items-start gap-4 p-5 rounded-3xl text-left cursor-pointer group relative overflow-hidden"
                    style={{
                      background: isHovered
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.5) 100%)'
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isHovered ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isHovered ? '0 0 30px rgba(16,185,129,0.12)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Shimmer top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{
                        background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                        opacity: isHovered ? 0.6 : 0,
                        transition: 'opacity 0.3s',
                      }}
                    />

                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300"
                      style={{
                        backgroundColor: isHovered ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.1)',
                        border: `1px solid ${isHovered ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.2)'}`,
                        boxShadow: isHovered ? '0 0 15px rgba(16,185,129,0.3)' : 'none',
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-400 transition-transform duration-300"
                        style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
                      />
                    </div>
                    <div>
                      <h4
                        className="font-bold text-sm transition-colors duration-200"
                        style={{ color: isHovered ? '#10b981' : 'white' }}
                      >
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-emerald-100/45 mt-1 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
