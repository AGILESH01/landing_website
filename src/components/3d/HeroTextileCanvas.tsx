import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SwatchType {
  id: string;
  name: string;
  weaveType: 'poplin' | 'twill' | 'check' | 'linen';
  baseColor: number;
  threadColor: number;
  roughness: number;
  bumpScale: number;
  description: string;
}

const SWATCHES: SwatchType[] = [
  {
    id: 'cotton-ecru',
    name: 'Pure Cotton Poplin',
    weaveType: 'poplin',
    baseColor: 0xF7F4EE,
    threadColor: 0xE8E3D7,
    roughness: 0.85,
    bumpScale: 0.05,
    description: 'Fine 40s plain weave with balanced warp & weft density',
  },
  {
    id: 'indigo-twill',
    name: 'Structured 2/1 Twill',
    weaveType: 'twill',
    baseColor: 0x14253B,
    threadColor: 0x2A4B75,
    roughness: 0.75,
    bumpScale: 0.08,
    description: 'Diagonal ridge construction for enhanced durability',
  },
  {
    id: 'gold-yarn-dyed',
    name: 'Artisan Yarn-Dyed Check',
    weaveType: 'check',
    baseColor: 0xC5A059,
    threadColor: 0x1A202C,
    roughness: 0.8,
    bumpScale: 0.06,
    description: 'Pre-dyed yarns woven into timeless dimensional patterns',
  },
  {
    id: 'slate-poly',
    name: 'Poly-Cotton Blend',
    weaveType: 'linen',
    baseColor: 0x4A5568,
    threadColor: 0x2D3748,
    roughness: 0.7,
    bumpScale: 0.04,
    description: 'Resilient crease-recovery cloth with smooth tactile surface',
  },
];

/**
 * Procedural Weave Pattern Generator creates high-resolution tactile bump & diffuse
 * textures directly in browser canvas without downloading heavy texture files.
 */
function createWeaveTexture(swatch: SwatchType): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const baseHex = `#${swatch.baseColor.toString(16).padStart(6, '0')}`;
  const threadHex = `#${swatch.threadColor.toString(16).padStart(6, '0')}`;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  if (swatch.weaveType === 'twill') {
    // 2/1 Diagonal Twill Lines
    ctx.strokeStyle = threadHex;
    ctx.lineWidth = 3;
    for (let x = -256; x < 512; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 256, 256);
      ctx.stroke();
    }
    // Cross-thread stippling
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let y = 0; y < 256; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
  } else if (swatch.weaveType === 'check') {
    // Yarn-dyed check grid
    ctx.fillStyle = threadHex;
    for (let x = 0; x < 256; x += 32) {
      ctx.fillRect(x, 0, 16, 256);
    }
    ctx.fillStyle = 'rgba(13,27,42,0.4)';
    for (let y = 0; y < 256; y += 32) {
      ctx.fillRect(0, y, 256, 16);
    }
  } else {
    // Micro plain weave (Poplin / Linen)
    ctx.fillStyle = threadHex;
    for (let x = 0; x < 256; x += 4) {
      for (let y = 0; y < 256; y += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  return texture;
}

export const HeroTextileCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeSwatch, setActiveSwatch] = useState<SwatchType>(SWATCHES[0]);
  const [hasWebGL, setHasWebGL] = useState(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 560;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup with cinematic perspective
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 3. Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      setHasWebGL(false);
      return;
    }

    // 4. Lighting setup (Editorial textile showroom lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc5a059, 1.4);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    const softFill = new THREE.PointLight(0xffffff, 0.8, 10);
    softFill.position.set(0, 1, 3);
    scene.add(softFill);

    // 5. Cloth Mesh (Segmented plane with tactile fold geometry)
    const geometry = new THREE.PlaneGeometry(3.6, 4.4, 48, 48);
    const texture = createWeaveTexture(activeSwatch);

    const material = new THREE.MeshStandardMaterial({
      color: activeSwatch.baseColor,
      map: texture,
      roughness: activeSwatch.roughness,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    const clothMesh = new THREE.Mesh(geometry, material);
    clothMesh.rotation.x = -0.15;
    clothMesh.rotation.y = 0.22;
    clothMesh.rotation.z = -0.06;
    scene.add(clothMesh);
    meshRef.current = clothMesh;

    // Background thread accent ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xc5a059, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.position.z = -0.5;
    scene.add(ring);

    // 6. Mouse parallax tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX * 0.4;
      mouseRef.current.targetY = normY * 0.4;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop with subtle, realistic drape ripple
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (meshRef.current) {
        // Perspective tilt
        meshRef.current.rotation.y = 0.22 + mouseRef.current.x * 0.35;
        meshRef.current.rotation.x = -0.15 - mouseRef.current.y * 0.25;

        // Realistic cloth wave vertex displacement
        if (!mediaQuery.matches) {
          const position = geometry.attributes.position;
          for (let i = 0; i < position.count; i++) {
            const u = position.getX(i);
            const v = position.getY(i);
            // S-curve fold simulation
            const wave1 = Math.sin(u * 1.8 + elapsedTime * 1.2) * 0.12;
            const wave2 = Math.cos(v * 2.2 + elapsedTime * 0.8) * 0.08;
            const fold = Math.sin(u * 3.0 + v * 1.5) * 0.05;
            position.setZ(i, wave1 + wave2 + fold);
          }
          position.needsUpdate = true;
          geometry.computeVertexNormals();
        }
      }

      if (ring) {
        ring.rotation.z = elapsedTime * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize observer
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (rendererRef.current && rendererRef.current.domElement) {
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  // Update material when swatch changes
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.color.setHex(activeSwatch.baseColor);
    materialRef.current.roughness = activeSwatch.roughness;
    const newTexture = createWeaveTexture(activeSwatch);
    materialRef.current.map = newTexture;
    materialRef.current.needsUpdate = true;
  }, [activeSwatch]);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] flex flex-col items-center justify-center">
      {/* 3D WebGL Canvas or High-Fidelity Tactile Fallback */}
      {hasWebGL ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
          aria-label="Interactive 3D woven fabric swatch viewer. Drag mouse to inspect fabric drape and weave reflections."
        />
      ) : (
        /* Accessible Fallback when WebGL is unavailable */
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl border border-gold-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-weave-pattern opacity-20" />
          <div className="relative z-10 text-center max-w-sm">
            <div className="w-48 h-56 mx-auto bg-cream-100 rounded-lg shadow-fabric-elevated border-2 border-gold-500/30 transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-end p-4">
              <span className="text-xs uppercase font-bold tracking-widest text-navy-900">
                {activeSwatch.name}
              </span>
              <span className="text-[11px] text-slate-600 mt-1">
                {activeSwatch.description}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tactical Swatch Controller */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-20 bg-navy-950/80 backdrop-blur-md border border-gold-500/30 rounded-xl p-3 shadow-fabric-tactile max-w-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
            Interactive Swatch
          </span>
          <span className="text-[10px] text-cream-300/70 font-mono">
            {activeSwatch.name}
          </span>
        </div>

        {/* Swatch Pill Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {SWATCHES.map((swatch) => {
            const isSelected = swatch.id === activeSwatch.id;
            return (
              <button
                key={swatch.id}
                onClick={() => setActiveSwatch(swatch)}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all text-center border ${
                  isSelected
                    ? 'bg-gold-500 text-navy-950 border-gold-400 font-bold shadow-sm'
                    : 'bg-navy-900/60 text-cream-200 border-white/10 hover:border-gold-500/40 hover:text-white'
                }`}
                title={swatch.description}
                aria-pressed={isSelected}
              >
                {swatch.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        <p className="text-[9px] text-cream-300/60 mt-2 italic leading-tight">
          Move cursor to tilt drape. Visual representation of weave structures; custom specifications manufactured to order.
        </p>
      </div>
    </div>
  );
};
