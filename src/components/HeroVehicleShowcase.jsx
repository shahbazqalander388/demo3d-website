import React, { useState, useRef, useEffect } from 'react';
import {
  Sliders,
  ArrowRight,
  RotateCw,
  Maximize2,
  MoveHorizontal,
  Play,
  Pause
} from 'lucide-react';
import Vehicle360Viewer from './Vehicle360Viewer';

export const HERO_CARS = [
  {
    id: 'maybach-s680',
    name: 'Mercedes-Maybach S680',
    spec: 'Obsidian Black V12 // 621 HP',
    tag: 'FLAGSHIP FIRST-CLASS',
    image: '/maybach.jpg',
    interiorImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=85',
    profileImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=85',
    headline: 'The Ultimate Standard of Acoustic Solitude & Executive Comfort',
    stats: {
      acceleration: '0-60 in 4.4s',
      power: '621 hp Biturbo V12',
      soundIsolation: '38 dB Silence Rating',
      dispatch: '< 9.4 Min Mobilization'
    },
    hotspots: [
      {
        id: 'engine',
        title: '6.0L V12 Biturbo',
        desc: '621 hp handcrafted powerplant with seamless liquid acceleration.',
        x: '24%',
        y: '62%'
      },
      {
        id: 'interior',
        title: 'Executive Rear Suite',
        desc: 'Reclining zero-gravity calf-rest ottomans with active acupressure massage.',
        x: '52%',
        y: '45%'
      },
      {
        id: 'glass',
        title: 'Acoustic Limousine Tint',
        desc: 'Dual-pane laminated privacy glass blocking 99.8% of ultraviolet and optical glare.',
        x: '68%',
        y: '42%'
      }
    ]
  },
  {
    id: 'rolls-ghost',
    name: 'Rolls-Royce Ghost Black Badge',
    spec: 'Bespoke Obsidian // 591 HP',
    tag: 'ULTRA-BESPOKE MONOLITH',
    image: '/ghost.jpg',
    interiorImage: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1920&q=85',
    profileImage: '/ghost.jpg',
    headline: 'Pure Understated Grandeur with Fiber-Optic Starlight Sanctuary',
    stats: {
      acceleration: '0-60 in 4.6s',
      power: '6.75L Twin-Turbo V12',
      soundIsolation: 'Over 100 kg Acoustic Damping',
      dispatch: 'Available on Standby'
    },
    hotspots: [
      {
        id: 'mascot',
        title: 'Spirit of Ecstasy Black Badge',
        desc: 'Mirror-polished high-gloss darkened chrome mascot.',
        x: '18%',
        y: '58%'
      },
      {
        id: 'chassis',
        title: 'Planar Suspension',
        desc: 'Scans road contours ahead to deliver the legendary Magic Carpet Ride.',
        x: '45%',
        y: '68%'
      },
      {
        id: 'doors',
        title: 'Power-Assisted Coach Doors',
        desc: 'Effortless touch-to-close rear passenger doors.',
        x: '64%',
        y: '50%'
      }
    ]
  },
  {
    id: 'escalade-v',
    name: 'Cadillac Escalade-V Noir',
    spec: 'Supercharged V8 // B6 Ballistic',
    tag: 'COMMANDING ROAD AUTHORITY',
    image: '/escalade.jpg',
    interiorImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=85',
    profileImage: '/escalade.jpg',
    headline: 'Maximum Passenger Space & Certified B6 Ballistic Armor Core',
    stats: {
      acceleration: '0-60 in 4.3s',
      power: '682 hp Supercharged V8',
      security: 'CEN B6 Armored Certified',
      dispatch: '< 10 Min Mobilization'
    },
    hotspots: [
      {
        id: 'armor',
        title: 'Ballistic Armor Monocoque',
        desc: 'Certified CEN B6 multi-layer composite ballistic steel & bullet-resistant glass.',
        x: '48%',
        y: '48%'
      },
      {
        id: 'wheels',
        title: 'Reinforced Run-Flat Tires',
        desc: 'Military-grade internal beadlocks allowing 50 miles of mobility when deflated.',
        x: '28%',
        y: '72%'
      },
      {
        id: 'audio',
        title: 'AKG Studio 36-Speaker Suite',
        desc: 'Studio reference acoustic isolation and 3D sound immersion.',
        x: '62%',
        y: '46%'
      }
    ]
  },
  {
    id: 'gwagon-amg',
    name: 'Mercedes-AMG G63 Black Night',
    spec: 'Biturbo V8 // Tactical Escort',
    tag: 'TACTICAL VIP MOTORCADE',
    image: '/gwagon.jpg',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1920&q=85',
    profileImage: '/gwagon.jpg',
    headline: 'All-Terrain Dominance with Iconic Monolithic Obsidian Stance',
    stats: {
      acceleration: '0-60 in 3.9s',
      power: '577 hp Biturbo V8',
      drivetrain: 'Permanent AWD + 3 Diff Locks',
      dispatch: '< 12 Min Standby'
    },
    hotspots: [
      {
        id: 'magno',
        title: 'Matte Night Black Magno Paint',
        desc: 'Handcrafted satin non-reflective finish with carbon-fiber aero trims.',
        x: '38%',
        y: '52%'
      },
      {
        id: 'diffs',
        title: 'Triple Differential Locks',
        desc: 'Unmatched emergency bypass and all-terrain traction.',
        x: '72%',
        y: '68%'
      }
    ]
  },
  {
    id: 'panamera-turbo',
    name: 'Porsche Panamera Turbo E-Hybrid',
    spec: 'Jet Black // 670 HP',
    tag: 'HIGH-VELOCITY COURIER',
    image: '/panamera.jpg',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85',
    profileImage: '/panamera.jpg',
    headline: 'Sports Car Agility & High-Speed Urgent Executive Transportation',
    stats: {
      acceleration: '0-60 in 3.0s',
      power: '670 hp Twin-Turbo V8 + E-Motor',
      topSpeed: '196 mph Velocity',
      dispatch: 'Immediate Hot Standby'
    },
    hotspots: [
      {
        id: 'hybrid',
        title: 'E-Hybrid Propulsion',
        desc: 'Silent zero-emission urban crawling with instantaneous 670 hp burst capability.',
        x: '32%',
        y: '64%'
      },
      {
        id: 'aero',
        title: 'Active 4-Way Spoiler',
        desc: 'High-speed downforce stabilizer with automatic multi-stage deployment.',
        x: '78%',
        y: '56%'
      }
    ]
  }
];

export default function HeroVehicleShowcase({ onOpenBooking, onOpen360View }) {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [activeView, setActiveView] = useState('exterior'); // Default to Real Vehicle Photo Turntable View
  const [lightingMood, setLightingMood] = useState('studio'); // 'studio', 'warm', 'noir'
  const [activeHotspot, setActiveHotspot] = useState(null);

  // 360 Turntable Angle & Physics on the Real Picture
  const [angle, setAngle] = useState(35); // 0 to 359 degrees
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef(null);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaRafRef = useRef(null);
  const isDraggingRef = useRef(false);

  const currentCar = HERO_CARS[selectedCarIndex];

  // Auto-Spin on Page Load / Car Switch (Spins for 7.5 seconds then smoothly pauses)
  useEffect(() => {
    setIsAutoSpinning(true);
    const timer = setTimeout(() => {
      setIsAutoSpinning(false);
    }, 7500);
    return () => clearTimeout(timer);
  }, [selectedCarIndex]);

  // Smooth Turntable Continuous Spin Loop
  useEffect(() => {
    if (!isAutoSpinning) return;
    let rafId;
    const spin = () => {
      setAngle((prev) => (prev + 0.55) % 360);
      rafId = requestAnimationFrame(spin);
    };
    rafId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoSpinning]);

  // Hand / Touch / Mouse Drag Handlers
  const handlePointerDown = (e) => {
    setIsAutoSpinning(false);
    if (inertiaRafRef.current) cancelAnimationFrame(inertiaRafRef.current);
    isDraggingRef.current = true;
    setHasInteracted(true);
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - lastXRef.current;
    const deltaTime = Math.max(1, now - lastTimeRef.current);

    // Track instant velocity for inertia release
    velocityRef.current = deltaX / deltaTime;

    // Direct 1-to-1 hand movement: drag right turns right, drag left turns left
    setAngle((prev) => {
      const next = (prev - deltaX * 0.65) % 360;
      return next < 0 ? next + 360 : next;
    });

    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    // Smooth inertia gliding after hand release
    let v = velocityRef.current * 14;
    const applyInertia = () => {
      if (Math.abs(v) > 0.05) {
        setAngle((prev) => {
          const next = (prev - v) % 360;
          return next < 0 ? next + 360 : next;
        });
        v *= 0.92; // Friction decay
        inertiaRafRef.current = requestAnimationFrame(applyInertia);
      }
    };
    if (Math.abs(v) > 0.1) {
      inertiaRafRef.current = requestAnimationFrame(applyInertia);
    }
  };

  const snapToAngle = (deg) => {
    setIsAutoSpinning(false);
    setHasInteracted(true);
    setAngle(deg % 360);
  };

  // 3D Perspective math for the real car photo
  const rad = (angle * Math.PI) / 180;
  // Strong, visible 3D yaw: ±28° turning as turntable rotates
  const rotY = Math.sin(rad) * 28;
  const rotX = -Math.cos(rad) * 4.5;
  const transX = Math.sin(rad) * 20;
  const turntableZ = angle;
  const glarePercent = ((angle % 360) / 360) * 100;
  const shadowScaleX = 1 + Math.abs(Math.sin(rad)) * 0.25;

  // Active image based on view and angle
  const getDisplayImage = () => {
    if (activeView === 'interior') return currentCar.interiorImage;
    if (activeView === 'profile') return currentCar.profileImage;
    const normAngle = ((angle % 360) + 360) % 360;
    if ((normAngle >= 65 && normAngle <= 115) || (normAngle >= 245 && normAngle <= 295)) {
      return currentCar.profileImage || currentCar.image;
    }
    return currentCar.image;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      {/* 3D TILT PHOTO VIEWPORT */}
      {activeView === '360' ? (
        <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[680px] overflow-hidden bg-neutral-950 pb-20 sm:pb-24">
          <Vehicle360Viewer
            vehicle={currentCar}
            inline={true}
            onOpenBooking={onOpenBooking}
            onOpenConfigurator={() => {
              const el = document.getElementById('configurator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          {/* Switch to Photo View */}
          <div className="absolute top-12 left-3 sm:top-20 sm:left-6 md:left-8 z-30 pointer-events-auto">
            <button
              onClick={() => setActiveView('exterior')}
              className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 hover:bg-black backdrop-blur-xl border border-white/20 text-neutral-300 hover:text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg cursor-pointer"
            >
              <span>📷 Switch to Still Photo</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ perspective: '1200px' }}
          className="relative w-full h-[460px] sm:h-[580px] lg:h-[680px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* Glowing Ground Turntable Stage Rings */}
          <div
            className="absolute bottom-8 sm:bottom-12 w-4/5 max-w-4xl h-24 sm:h-32 rounded-full border border-amber-400/35 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent pointer-events-none"
            style={{
              transform: `rotateX(75deg) rotateZ(${turntableZ}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <div className="absolute inset-2 sm:inset-3 rounded-full border border-white/15" />
            <div className="absolute inset-5 sm:inset-7 rounded-full border border-dashed border-amber-400/40" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/70" />
          </div>

          {/* Ground Contact Shadow */}
          <div
            className="absolute bottom-10 sm:bottom-14 w-3/4 max-w-3xl h-16 sm:h-20 rounded-full bg-black/95 blur-2xl pointer-events-none"
            style={{
              transform: `scaleX(${shadowScaleX})`
            }}
          />

          {/* REAL CAR IMAGE IN 3D TURNTABLE PERSPECTIVE */}
          <div
            style={{
              transform: `translateX(${transX}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.02)`,
              transformStyle: 'preserve-3d',
              transition: isDraggingRef.current ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1)'
            }}
            className="relative w-full max-w-5xl h-[80%] max-h-[520px] flex items-center justify-center pointer-events-none"
          >
            <img
              src={getDisplayImage()}
              alt={currentCar.name}
              draggable={false}
              className={`max-w-[94%] max-h-[88%] w-auto h-auto object-contain filter select-none transition-all duration-300 pointer-events-auto ${
                lightingMood === 'warm'
                  ? 'sepia-[0.15] contrast-110 brightness-95'
                  : lightingMood === 'noir'
                  ? 'grayscale contrast-135 brightness-90'
                  : 'contrast-105'
              }`}
            />

            {/* Specular Sheen (Sweeps Across Obsidian Clearcoat with angle) */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${angle}deg, transparent 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%)`
              }}
            />

            {/* Glare Reflection Light */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at ${glarePercent}% 40%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`
              }}
            />

            {/* Luxury Studio Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60 pointer-events-none" />
          </div>

          {/* Top Left Studio Identity Badge with Live Angle & Auto-Spin Toggle */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 md:left-8 z-30 pointer-events-auto flex flex-col gap-2 max-w-[240px] sm:max-w-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[11px] tracking-[0.2em] font-mono uppercase font-bold text-white truncate">
                360° Real Turntable // {Math.round(angle)}°
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Play / Pause Auto-Spin */}
              <button
                onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg ${
                  isAutoSpinning
                    ? 'bg-amber-400 text-black border-amber-400 font-bold'
                    : 'bg-black/80 hover:bg-black text-amber-300 border-amber-400/60'
                }`}
              >
                {isAutoSpinning ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause Movement</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Auto 360° Movement</span>
                  </>
                )}
              </button>

              {/* 360 3D Model Switch */}
              <button
                onClick={() => setActiveView('360')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-neutral-300 hover:text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg"
              >
                <RotateCw className="w-3 h-3 text-amber-400" />
                <span>3D Mesh</span>
              </button>
            </div>
          </div>

          {/* Hand Drag Gesture Hint (Fades after interaction) */}
          {!hasInteracted && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-bounce">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400 text-white shadow-2xl">
                <span className="text-base sm:text-lg">🖐️</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                  Click & Drag with Hand to Rotate
                </span>
                <MoveHorizontal className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          )}

          {/* Quick Snap Angles (Bottom Left of Stage) */}
          <div className="absolute bottom-16 sm:bottom-20 left-3 sm:left-6 md:left-8 z-30 flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 pointer-events-auto shadow-xl">
            {[
              { label: 'Front', deg: 0 },
              { label: '3/4', deg: 45 },
              { label: 'Side', deg: 90 },
              { label: 'Rear', deg: 180 }
            ].map((snap) => (
              <button
                key={snap.label}
                onClick={() => snapToAngle(snap.deg)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono transition ${
                  Math.abs(angle - snap.deg) < 15
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {snap.label}
              </button>
            ))}
          </div>

          {/* Top Right Quick Stats HUD (Visible on Tablets & Desktops) */}
          <div className="absolute top-6 right-6 md:right-8 z-30 hidden md:flex flex-col items-end gap-2 pointer-events-auto">
            <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-right shadow-lg">
              <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Velocity Sprint</div>
              <div className="text-xs font-bold text-white font-mono">{currentCar.stats.acceleration}</div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-right shadow-lg">
              <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Sound Dampening</div>
              <div className="text-xs font-bold text-amber-400 font-mono">{currentCar.stats.soundIsolation}</div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-right shadow-lg">
              <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Response Window</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">{currentCar.stats.dispatch}</div>
            </div>
          </div>

          {/* Interactive Tactical Hotspots on the Real Car */}
          {activeView === 'exterior' &&
            currentCar.hotspots.map((h) => {
              const isOpened = activeHotspot === h.id;
              return (
                <div
                  key={h.id}
                  style={{ left: h.x, top: h.y }}
                  className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => setActiveHotspot(isOpened ? null : h.id)}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 animate-ping pointer-events-none" />
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-2 border-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-125 transition">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neutral-900" />
                    </span>
                  </div>

                  {/* Hotspot Popup Card */}
                  {isOpened && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-56 sm:w-64 p-3 sm:p-4 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-in fade-in zoom-in-95 pointer-events-auto">
                      <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/10">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase font-bold text-amber-400">
                          {h.title}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-neutral-300 font-sans leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

          {/* Center Bottom Car Headline & Reserve Overlay */}
          <div className="absolute bottom-28 sm:bottom-32 left-3 sm:left-6 md:left-8 z-20 max-w-[200px] sm:max-w-xl pointer-events-none">
            <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-bold bg-white/90 text-neutral-950 mb-1 sm:mb-2 shadow-sm">
              {currentCar.tag}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-black text-white font-sans tracking-tight leading-tight truncate">
              {currentCar.name}
            </h2>
            <p className="mt-1 text-[11px] sm:text-sm text-neutral-300 font-sans leading-relaxed hidden sm:block">
              "{currentCar.headline}"
            </p>
          </div>
        </div>
      )}

        {/* View Mode & Lighting Controls Dock */}
        <div className="absolute bottom-16 sm:bottom-24 right-2 sm:right-6 md:right-8 z-30 flex items-center gap-1 sm:gap-2 pointer-events-auto max-w-[calc(100%-16px)]">
          {/* Angle / View Toggle */}
          <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-xl overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveView('exterior')}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === 'exterior'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Photo
            </button>
            <button
              onClick={() => setActiveView('360')}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === '360'
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3 h-3" />
              <span>360° 3D</span>
            </button>
            <button
              onClick={() => setActiveView('interior')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === 'interior'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Suite
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === 'profile'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Profile
            </button>
          </div>

          {/* Fullscreen 360 Modal Trigger */}
          {onOpen360View && (
            <button
              onClick={() => onOpen360View(currentCar)}
              className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 text-white hover:bg-black/90 transition shadow-xl shrink-0"
              title="Open Fullscreen 360° Studio"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            </button>
          )}

          {/* Lighting Filter */}
          <button
            onClick={() =>
              setLightingMood(
                lightingMood === 'studio' ? 'warm' : lightingMood === 'warm' ? 'noir' : 'studio'
              )
            }
            className="p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 text-white hover:bg-black/90 transition shadow-xl shrink-0"
            title="Cycle Lighting Mood"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          </button>
        </div>

        {/* BOTTOM REAL CAR DOCK (THUMBNAIL STRIP) */}
        <div className="absolute bottom-2 sm:bottom-4 inset-x-2 sm:inset-x-4 md:inset-x-8 z-30 flex items-center justify-between gap-1.5 sm:gap-3 p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-2xl pointer-events-auto">
          {/* Thumbnails */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
            {HERO_CARS.map((car, index) => {
              const isSelected = index === selectedCarIndex;
              return (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCarIndex(index);
                    setActiveHotspot(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl border text-left shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200/70 hover:border-neutral-300'
                  }`}
                >
                  <div className="w-7 h-5 sm:w-9 sm:h-7 rounded-md sm:rounded-lg overflow-hidden bg-black shrink-0">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="hidden min-[480px]:block">
                    <div className="text-[10px] sm:text-[11px] font-bold font-sans truncate max-w-[100px] sm:max-w-[130px]">
                      {car.name}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-mono opacity-70 truncate max-w-[90px] sm:max-w-[120px]">
                      {car.stats.power.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Reserve CTA */}
          <button
            onClick={() => onOpenBooking(currentCar)}
            className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-neutral-900 hover:bg-black text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition flex items-center gap-1.5 sm:gap-2 shadow-md active:scale-[0.98]"
          >
            <span className="hidden sm:inline">Charter {currentCar.name.split(' ')[0]}</span>
            <span className="sm:hidden">Charter</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
  );
}
