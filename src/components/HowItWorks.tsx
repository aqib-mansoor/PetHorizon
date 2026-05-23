import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { UserCheck, PlusCircle, CalendarClock, PenTool, Share2, LucideIcon } from 'lucide-react';

interface StepItem {
  step: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// CSS 3D Step Badge — replaces per-card WebGL renderer
function CSSStepBadge({ number, color, isActive }: { number: string; color: string; isActive: boolean }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 72, height: 72, perspective: '220px' }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-400"
        style={{
          background: `radial-gradient(circle, ${color}${isActive ? '35' : '15'}, transparent 70%)`,
          animation: 'orbPulse 3s ease-in-out infinite',
        }}
      />
      {/* Main sphere */}
      <div
        className="absolute rounded-full transition-all duration-400"
        style={{
          inset: '14%',
          background: `radial-gradient(circle at 30% 30%, ${color}${isActive ? 'cc' : '55'}, ${color}${isActive ? '55' : '22'} 60%, transparent)`,
          boxShadow: isActive ? `0 0 20px ${color}55, 0 0 8px ${color}77` : `0 0 10px ${color}22`,
        }}
      />
      {/* Ring */}
      <div
        className="absolute rounded-full border transition-all duration-400"
        style={{
          inset: '3%',
          borderColor: `${color}${isActive ? '55' : '25'}`,
          borderWidth: isActive ? '2px' : '1px',
          animation: 'orbRing1 7s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Number overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-black text-lg transition-all duration-300"
          style={{ color, textShadow: isActive ? `0 0 20px ${color}` : 'none' }}
        >
          {number}
        </span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps: StepItem[] = [
    {
      step: 'Step 1',
      number: '01',
      title: 'Create Account & Verify',
      description: 'Sign up in seconds and verify your email to unlock your personal pet care dashboard.',
      icon: UserCheck,
      color: '#10b981',
    },
    {
      step: 'Step 2',
      number: '02',
      title: 'Add Pet Profile',
      description: 'Enter your pet\'s name, breed, age, weight, vaccine status, and unique temperament tags.',
      icon: PlusCircle,
      color: '#34d399',
    },
    {
      step: 'Step 3',
      number: '03',
      title: 'Set Schedules & Reminders',
      description: 'Setup custom feeding slots, routine medicines, daily walks, and custom sound alerts.',
      icon: CalendarClock,
      color: '#6ee7b7',
    },
    {
      step: 'Step 4',
      number: '04',
      title: 'Track Daily Life',
      description: 'Log weights, food consumption, coordinate medical alerts, journals, and expense sheets.',
      icon: PenTool,
      color: '#10b981',
    },
    {
      step: 'Step 5',
      number: '05',
      title: 'Invite Shared Caregivers',
      description: 'Add family members or pet sitters with individual permission settings for unified care.',
      icon: Share2,
      color: '#34d399',
    },
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
      camera.position.z = 30;

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

      // DNA helix dots
      const count = 150;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 8;
        const strand = i % 2;
        const radius = 8;
        positions[i * 3] = Math.cos(t + strand * Math.PI) * radius + (Math.random() - 0.5) * 2;
        positions[i * 3 + 1] = (i / count - 0.5) * 60;
        positions[i * 3 + 2] = Math.sin(t + strand * Math.PI) * radius + (Math.random() - 0.5) * 2;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.25,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        points.rotation.y += 0.002;
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
      id="how-it-works"
      className="py-14 sm:py-28 bg-[#060e0a] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* CSS blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Getting Started
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-6 mb-5"
          >
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Works
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/60 text-lg"
          >
            Start organizing your pet family's routines in 5 powerful steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((item, index) => {
            const IconComp = item.icon;
            const isEven = index % 2 === 0;
            const isActive = activeStep === index;

            return (
              <StepCard
                key={index}
                item={item}
                index={index}
                isEven={isEven}
                isActive={isActive}
                onHover={setActiveStep}
                IconComp={IconComp}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  item,
  index,
  isEven,
  isActive,
  onHover,
  IconComp,
}: {
  item: StepItem;
  index: number;
  isEven: boolean;
  isActive: boolean;
  onHover: (i: number | null) => void;
  IconComp: LucideIcon;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, type: 'spring', damping: 20 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 items-stretch max-w-4xl mx-auto`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* CSS Badge Side */}
      <div className="flex md:flex-col items-center justify-center w-full md:w-32 py-4 md:py-0 flex-shrink-0">
        <CSSStepBadge number={item.number} color={item.color} isActive={isActive} />

        {/* Connector line */}
        {index < 4 && (
          <motion.div
            className="hidden md:block w-0.5 flex-1 mt-3"
            style={{
              background: `linear-gradient(to bottom, ${item.color}60, transparent)`,
              minHeight: '40px',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex-1 relative rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: isActive
            ? `linear-gradient(135deg, ${item.color}18 0%, rgba(10,18,14,0.95) 100%)`
            : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isActive ? item.color + '50' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isActive ? `0 0 50px -10px ${item.color}60` : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            opacity: isActive ? 1 : 0.2,
            transition: 'opacity 0.4s',
          }}
        />

        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at ${isEven ? '0%' : '100%'} 50%, ${item.color}15 0%, transparent 60%)`,
            }}
          />
        )}

        <div className="p-8 md:p-10 flex flex-col md:flex-row items-start gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400"
            style={{
              backgroundColor: isActive ? `${item.color}25` : `${item.color}12`,
              border: `1px solid ${item.color}${isActive ? '50' : '25'}`,
              boxShadow: isActive ? `0 0 25px ${item.color}40` : 'none',
            }}
          >
            <IconComp className="w-7 h-7 transition-all duration-300" style={{ color: item.color }} />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{
                  color: item.color,
                  backgroundColor: `${item.color}15`,
                  borderColor: `${item.color}30`,
                }}
              >
                {item.step}
              </span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full"
                >
                  ● Active
                </motion.span>
              )}
            </div>
            <h3
              className="text-xl md:text-2xl font-black mb-3 transition-colors duration-300"
              style={{ color: isActive ? item.color : 'white' }}
            >
              {item.title}
            </h3>
            <p className="text-emerald-100/55 leading-relaxed text-sm md:text-base">
              {item.description}
            </p>
          </div>

          <div
            className="hidden lg:block text-[120px] font-black leading-none flex-shrink-0 transition-all duration-400 select-none"
            style={{ color: item.color, opacity: isActive ? 0.07 : 0.03 }}
          >
            {item.number}
          </div>
        </div>

        <div
          className="h-0.5 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${item.color}, ${item.color}40, transparent)`,
            opacity: isActive ? 0.7 : 0.15,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
