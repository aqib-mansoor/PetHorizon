import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { PawPrint, Sparkles, Zap, ArrowRight } from 'lucide-react';

// Three.js background: orbiting ring of particles around CTA
function CTABackground({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
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

      // Spiraling particle ring
      const ringCount = 100;
      const ringPositions = new Float32Array(ringCount * 3);
      const ringAngles = new Float32Array(ringCount);

      for (let i = 0; i < ringCount; i++) {
        ringAngles[i] = (i / ringCount) * Math.PI * 2;
        const r = 12 + Math.sin(i * 0.3) * 3;
        ringPositions[i * 3] = Math.cos(ringAngles[i]) * r;
        ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
        ringPositions[i * 3 + 2] = Math.sin(ringAngles[i]) * r;
      }

      const ringGeo = new THREE.BufferGeometry();
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
      const ringMat = new THREE.PointsMaterial({
        color: 0x10b981,
        size: 0.3,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ringPoints = new THREE.Points(ringGeo, ringMat);
      scene.add(ringPoints);

      // Center glowing sphere
      const centerGeo = new THREE.SphereGeometry(2, 20, 20);
      const centerMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      scene.add(centerMesh);

      let animId = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        ringPoints.rotation.y += 0.003;
        ringPoints.rotation.x = Math.sin(Date.now() * 0.0003) * 0.2;
        centerMesh.rotation.y += 0.005;
        centerMesh.rotation.x += 0.002;
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

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 bg-[#040806] relative overflow-hidden"
      style={{ isolation: 'isolate' }}
    >
      <CTABackground containerRef={sectionRef} />

      {/* CSS overlay glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative" style={{ zIndex: 1 }}>

        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', damping: 20 }}
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(4,8,6,0.95) 40%, rgba(52,211,153,0.06) 100%)',
            border: '1px solid rgba(16,185,129,0.3)',
            boxShadow: '0 0 80px rgba(16,185,129,0.15), inset 0 0 60px rgba(16,185,129,0.03)',
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)',
            }}
          />

          {/* Corner glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />

          {/* Floating paw prints */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [12, 18, 12] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-16 pointer-events-none hidden md:block"
          >
            <PawPrint className="w-16 h-16 text-emerald-500/10" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-45, -38, -45] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-8 right-20 pointer-events-none hidden md:block"
          >
            <PawPrint className="w-12 h-12 text-emerald-500/10" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 lg:p-20 max-w-3xl mx-auto text-center flex flex-col items-center">

            {/* Badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2 mb-8"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(52,211,153,0.15))',
                  border: '1px solid rgba(16,185,129,0.4)',
                  boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                }}
              >
                <Sparkles className="w-4 h-4 text-emerald-300 fill-emerald-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">Start Today</span>
              </div>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
              Ready to simplify your{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                pet care experience?
              </span>
            </h2>

            <p className="text-emerald-100/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              Start managing your pets smarter with Pet Horizon today 🐾
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#pricing"
                className="relative overflow-hidden font-black px-10 py-4 rounded-2xl text-white cursor-pointer flex items-center justify-center gap-2 group"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  boxShadow: '0 0 30px rgba(16,185,129,0.5)',
                }}
              >
                <Zap className="w-4 h-4" />
                <span className="relative z-10">Download App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                {/* Shine */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#pricing"
                className="font-bold px-10 py-4 rounded-2xl text-white cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)';
                  e.currentTarget.style.background = 'rgba(16,185,129,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                Join Premium
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
