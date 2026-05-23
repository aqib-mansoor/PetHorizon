import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  PawPrint,
  Calendar,
  Activity,
  BookOpen,
  Cake,
  DollarSign,
  Package,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Sparkles,
} from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  accent: string;
}

// CSS 3D Orb — replaces per-card WebGL renderer
function CSSOrb({ color, size = 80 }: { color: string; size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size, perspective: `${size * 3}px` }}>
      {/* Outer glow pulse */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}30, transparent 70%)`,
          animation: 'orbPulse 3s ease-in-out infinite',
        }}
      />
      {/* Main sphere body */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '12%',
          background: `radial-gradient(circle at 32% 32%, ${color}dd, ${color}77 42%, ${color}22 80%, transparent)`,
          boxShadow: `0 0 ${size / 3}px ${color}44, 0 0 ${size / 6}px ${color}66`,
          animation: 'orbPulse 4s ease-in-out infinite 0.5s',
        }}
      />
      {/* 3D Ring 1 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '4%',
          borderColor: `${color}35`,
          animation: 'orbRing1 8s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* 3D Ring 2 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '15%',
          borderColor: `${color}22`,
          animation: 'orbRing2 12s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Highlight dot */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.12,
          height: size * 0.12,
          top: '22%',
          left: '28%',
          background: `${color}aa`,
          filter: `blur(${size * 0.04}px)`,
        }}
      />
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  const coreFeatures: FeatureItem[] = [
    {
      title: 'Pet Management',
      description: 'Create detailed profiles for breeds, medical histories, and customized character tags.',
      icon: PawPrint,
      color: '#10b981',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
      accent: 'from-emerald-500/20 to-emerald-900/10',
    },
    {
      title: 'Smart Scheduling',
      description: 'Set recurring tasks for meals, walks, grooming sessions, and vet appointments.',
      icon: Calendar,
      color: '#34d399',
      glow: 'shadow-[0_0_40px_rgba(52,211,153,0.35)]',
      accent: 'from-emerald-400/20 to-teal-900/10',
    },
    {
      title: 'Activity Timeline',
      description: 'Log and review all health checks, medication updates, and milestones chronologically.',
      icon: Activity,
      color: '#6ee7b7',
      glow: 'shadow-[0_0_40px_rgba(110,231,183,0.35)]',
      accent: 'from-teal-400/20 to-emerald-900/10',
    },
    {
      title: 'Journal & Memories',
      description: 'Document special moments, snap photos, and write journals to save precious memories.',
      icon: BookOpen,
      color: '#10b981',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
      accent: 'from-emerald-500/20 to-green-900/10',
    },
    {
      title: 'Birthday System 🎂',
      description: 'Never miss a celebration. Log birthdays, set reminders, and receive custom party tips.',
      icon: Cake,
      color: '#34d399',
      glow: 'shadow-[0_0_40px_rgba(52,211,153,0.35)]',
      accent: 'from-emerald-400/20 to-emerald-900/10',
    },
    {
      title: 'Expense & Budget',
      description: 'Monitor feeding budgets, vet bills, accessories, and analyze costs visually.',
      icon: DollarSign,
      color: '#6ee7b7',
      glow: 'shadow-[0_0_40px_rgba(110,231,183,0.35)]',
      accent: 'from-teal-300/20 to-emerald-900/10',
    },
    {
      title: 'Inventory Management',
      description: 'Track food supplies, favorite toys, medicines, and receive alerts when stocks run low.',
      icon: Package,
      color: '#10b981',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
      accent: 'from-emerald-500/20 to-emerald-900/10',
    },
    {
      title: 'Family & Sharing',
      description: 'Invite co-owners, partners, or pet sitters, setting permissions for shared care.',
      icon: Users,
      color: '#34d399',
      glow: 'shadow-[0_0_40px_rgba(52,211,153,0.35)]',
      accent: 'from-emerald-400/20 to-teal-900/10',
    },
    {
      title: 'Notifications & Alerts',
      description: 'Get push alerts, SMS, or email reminders so you never forget crucial appointments.',
      icon: Bell,
      color: '#6ee7b7',
      glow: 'shadow-[0_0_40px_rgba(110,231,183,0.35)]',
      accent: 'from-teal-400/20 to-emerald-900/10',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = coreFeatures.length - visibleCards;

  useEffect(() => {
    if (hoveredCard !== null) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, [maxIndex, hoveredCard]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  // Lazy Three.js background — only init when section is in view
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
      const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
      camera.position.z = 25;

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

      const shapes: THREE.Mesh[] = [];
      const shapeData: { vx: number; vy: number; rx: number; ry: number }[] = [];
      const color = new THREE.Color(0x10b981);

      for (let i = 0; i < 12; i++) {
        const geo = i % 3 === 0
          ? new THREE.OctahedronGeometry(Math.random() * 0.8 + 0.3)
          : i % 3 === 1
            ? new THREE.TetrahedronGeometry(Math.random() * 0.6 + 0.2)
            : new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.2, 0);

        const mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: Math.random() * 0.15 + 0.03,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
        );
        shapes.push(mesh);
        shapeData.push({
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          rx: (Math.random() - 0.5) * 0.005,
          ry: (Math.random() - 0.5) * 0.008,
        });
        scene.add(mesh);
      }

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        shapes.forEach((s, i) => {
          s.position.x += shapeData[i].vx;
          s.position.y += shapeData[i].vy;
          s.rotation.x += shapeData[i].rx;
          s.rotation.y += shapeData[i].ry;
          if (Math.abs(s.position.x) > 26) shapeData[i].vx *= -1;
          if (Math.abs(s.position.y) > 16) shapeData[i].vy *= -1;
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
      id="features"
      className="py-12 sm:py-24 bg-[#07100c] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* CSS glow blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-500/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                Platform Capabilities
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-2 mb-4 leading-tight"
            >
              Powerful Features for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Modern Pet Care
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-emerald-100/60 text-lg"
            >
              9 powerful tools designed to keep your pet care organized and stress-free.
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <span className="text-emerald-100/40 text-sm font-medium">
              {activeIndex + 1} / {maxIndex + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md group"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-400 flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md"
                aria-label="Next Feature"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden -mx-6 px-6 sm:-mx-8 sm:px-8 py-6">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * (100 / visibleCards)}%` }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          >
            {coreFeatures.map((feat, index) => {
              const Icon = feat.icon;
              const isHovered = hoveredCard === index;
              return (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 px-3 flex-shrink-0"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`
                      relative rounded-3xl border overflow-hidden h-full flex flex-col
                      bg-gradient-to-br ${feat.accent}
                      backdrop-blur-2xl
                      border-white/10 hover:border-emerald-500/40
                      ${isHovered ? feat.glow : ''}
                      transition-all duration-500
                      cursor-pointer
                    `}
                    style={{
                      background: isHovered
                        ? `linear-gradient(135deg, ${feat.color}18 0%, rgba(0,0,0,0.4) 100%)`
                        : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {/* Animated top border gradient */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)`,
                        opacity: isHovered ? 1 : 0.3,
                      }}
                    />

                    {/* Inner glow on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `radial-gradient(ellipse at 50% 0%, ${feat.color}20 0%, transparent 70%)`,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="p-7 flex flex-col gap-5 flex-1">
                      {/* CSS 3D Orb + icon row */}
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <CSSOrb color={feat.color} size={80} />
                          {/* Icon overlay on orb */}
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ color: feat.color }}
                          >
                            <Icon className="w-5 h-5 drop-shadow-lg" />
                          </div>
                        </div>
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                            style={{
                              color: feat.color,
                              borderColor: `${feat.color}40`,
                              backgroundColor: `${feat.color}15`,
                            }}
                          >
                            Feature {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3
                          className="text-xl font-black text-white mb-3 transition-colors duration-300"
                          style={{ color: isHovered ? feat.color : 'white' }}
                        >
                          {feat.title}
                        </h3>
                        <p className="text-emerald-100/55 leading-relaxed text-sm">
                          {feat.description}
                        </p>
                      </div>

                      {/* Bottom bar */}
                      <div
                        className="h-0.5 rounded-full mt-2 transition-all duration-500"
                        style={{
                          background: `linear-gradient(90deg, ${feat.color}, transparent)`,
                          opacity: isHovered ? 0.8 : 0.2,
                          width: isHovered ? '100%' : '40%',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-400 cursor-pointer ${
                activeIndex === i
                  ? 'w-10 h-2.5 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                  : 'w-2.5 h-2.5 bg-white/15 hover:bg-white/35'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
