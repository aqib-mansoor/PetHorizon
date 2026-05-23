import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Layers, Sparkles, LayoutDashboard, LucideIcon } from 'lucide-react';

interface SmartFeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accent: string;
}

// CSS 3D Orb — replaces per-card WebGL renderer
function CSSOrb({ color, size = 90 }: { color: string; size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size, perspective: `${size * 3}px` }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}28, transparent 65%)`,
          animation: 'orbPulse 3.5s ease-in-out infinite',
        }}
      />
      {/* Main body */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '12%',
          background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}66 45%, ${color}18 85%, transparent)`,
          boxShadow: `0 0 ${size / 3}px ${color}40, 0 0 ${size / 5}px ${color}55`,
          animation: 'orbPulse 4s ease-in-out infinite 0.3s',
        }}
      />
      {/* Ring 1 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '5%',
          borderColor: `${color}30`,
          animation: 'orbRing1 9s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Ring 2 */}
      <div
        className="absolute rounded-full border"
        style={{
          inset: '16%',
          borderColor: `${color}20`,
          animation: 'orbRing2 13s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      />
      {/* Orbiting dots */}
      {[0, 1, 2].map((i) => (
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
            boxShadow: `0 0 5px ${color}`,
            animation: `dotOrbit ${5 + i * 1.5}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}
      {/* Highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.12,
          height: size * 0.12,
          top: '20%',
          left: '26%',
          background: `${color}99`,
          filter: `blur(${size * 0.04}px)`,
        }}
      />
    </div>
  );
}

export default function SmartFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const smartFeats: SmartFeatureItem[] = [
    {
      title: 'Active Pet System',
      description: 'Switch between multiple pet profiles instantly. The entire interface adapts to show schedules, records, and diaries for the active pet with one click.',
      icon: Layers,
      color: '#10b981',
      accent: 'from-emerald-500/15 to-emerald-900/5',
    },
    {
      title: 'Breed-Based Features',
      description: 'Unlock customized feeding guidelines, potential health risk advice, and training checklists automatically based on your pet\'s registered breed.',
      icon: Sparkles,
      color: '#34d399',
      accent: 'from-teal-400/15 to-teal-900/5',
    },
    {
      title: 'Real-Time Dashboard',
      description: 'A live feed showing today\'s calendar, medication timetables, activity logs, and system notifications. See your pet\'s status at a single glance.',
      icon: LayoutDashboard,
      color: '#6ee7b7',
      accent: 'from-emerald-300/15 to-emerald-900/5',
    },
  ];

  // Lazy Three.js background
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
      section.insertBefore(canvas, section.firstChild);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
      camera.position.z = 30;

      const resize = () => {
        const w = section.clientWidth;
        const h = section.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(section);

      // Particle network
      const gridCount = 50;
      const positions = new Float32Array(gridCount * 3);
      const velocities = new Float32Array(gridCount * 3);

      for (let i = 0; i < gridCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        velocities[i * 3] = (Math.random() - 0.5) * 0.015;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      }

      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pointMat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.2,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(pointGeo, pointMat);
      scene.add(points);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      let linesMesh: THREE.LineSegments | null = null;

      let frameCount = 0;
      let animId = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        frameCount++;

        const pos = pointGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < gridCount; i++) {
          pos[i * 3] += velocities[i * 3];
          pos[i * 3 + 1] += velocities[i * 3 + 1];
          pos[i * 3 + 2] += velocities[i * 3 + 2];
          if (Math.abs(pos[i * 3]) > 25) velocities[i * 3] *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 15) velocities[i * 3 + 1] *= -1;
          if (Math.abs(pos[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
        }
        pointGeo.attributes.position.needsUpdate = true;

        if (frameCount % 5 === 0) {
          const linePositions: number[] = [];
          for (let i = 0; i < gridCount; i++) {
            for (let j = i + 1; j < gridCount; j++) {
              const dx = pos[i * 3] - pos[j * 3];
              const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
              const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              if (dist < 10) {
                linePositions.push(
                  pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                  pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                );
              }
            }
          }
          if (linesMesh) {
            scene.remove(linesMesh);
            linesMesh.geometry.dispose();
          }
          const lineGeo = new THREE.BufferGeometry();
          lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
          linesMesh = new THREE.LineSegments(lineGeo, lineMat);
          scene.add(linesMesh);
        }

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
      id="smart-features"
      className="py-14 sm:py-28 bg-[#040806] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      {/* CSS blobs */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm inline-block">
              Intelligent Companionship
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-6 mb-5"
          >
            Smart{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Features
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-emerald-100/60 text-lg"
          >
            Experience next-generation pet care powered by tailored smart engines.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {smartFeats.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -12, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                style={{
                  background: isHovered
                    ? `linear-gradient(160deg, ${item.color}18 0%, rgba(4,8,6,0.95) 100%)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHovered ? item.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isHovered ? `0 0 60px -10px ${item.color}50` : 'none',
                  transition: 'all 0.4s ease',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    opacity: isHovered ? 1 : 0.2,
                  }}
                />

                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}15 0%, transparent 70%)` }}
                  />
                )}

                <div className="p-8 flex flex-col gap-6 text-left h-full">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <CSSOrb color={item.color} size={90} />
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ color: item.color }}
                      >
                        <Icon className="w-6 h-6 drop-shadow-lg" />
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}40`,
                        backgroundColor: `${item.color}12`,
                      }}
                    >
                      AI Powered
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3
                      className="text-xl font-black mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? item.color : 'white' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-emerald-100/55 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className="h-0.5 rounded-full transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, transparent)`,
                      opacity: isHovered ? 0.8 : 0.15,
                      width: isHovered ? '100%' : '30%',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
