import React, { useState, useRef } from 'react';
import {
  Shield,
  Sparkles,
  Zap,
  Gauge,
  Sliders,
  Check,
  ChevronRight,
  Eye,
  Camera,
  ArrowRight,
  Compass,
  Layers
} from 'lucide-react';

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

export default function HeroVehicleShowcase({ onOpenBooking }) {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const [activeView, setActiveView] = useState('exterior'); // 'exterior', 'interior', 'profile'
  const [lightingMood, setLightingMood] = useState('studio'); // 'studio', 'warm', 'noir'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const currentCar = HERO_CARS[selectedCarIndex];

  // Mouse Parallax & Dynamic Specular Sheen on Real Image
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;

    setTilt({
      rotateX: rotX,
      rotateY: rotY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Get current active image based on angle/view
  const getCurrentImage = () => {
    if (activeView === 'interior') return currentCar.interiorImage;
    if (activeView === 'profile') return currentCar.profileImage;
    return currentCar.image;
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      {/* 3D TILT PHOTO VIEWPORT */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1400px' }}
        className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-crosshair select-none"
      >
        {/* Real Vehicle Image with Parallax Tilt & Filter Mood */}
        <div
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d'
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center"
        >
          <img
            src={getCurrentImage()}
            alt={currentCar.name}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              lightingMood === 'warm'
                ? 'sepia-[0.15] contrast-110 brightness-95'
                : lightingMood === 'noir'
                ? 'grayscale contrast-135 brightness-90'
                : 'contrast-105'
            }`}
          />

          {/* Dynamic Light Specular Reflection Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.12) 0%, transparent 65%)`
            }}
          />

          {/* Luxury Studio Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60 pointer-events-none" />
        </div>

        {/* Top Left Studio Identity Badge */}
        <div className="absolute top-6 left-6 md:left-8 z-30 pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] tracking-[0.25em] font-mono uppercase font-bold text-white">
              Studio Photography // 100% Real Asset
            </span>
          </div>
          <div className="text-xs font-mono text-neutral-300 tracking-wider">
            {currentCar.spec}
          </div>
        </div>

        {/* Top Right Quick Stats HUD */}
        <div className="absolute top-6 right-6 md:right-8 z-30 flex flex-col items-end gap-2 pointer-events-auto">
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
                  <span className="absolute w-8 h-8 rounded-full bg-white/20 animate-ping pointer-events-none" />
                  <span className="w-5 h-5 rounded-full bg-white border-2 border-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-125 transition">
                    <span className="w-2 h-2 rounded-full bg-neutral-900" />
                  </span>
                </div>

                {/* Hotspot Popup Card */}
                {isOpened && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-64 p-4 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-in fade-in zoom-in-95 pointer-events-auto">
                    <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/10">
                      <span className="text-[11px] font-mono uppercase font-bold text-amber-400">
                        {h.title}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

        {/* Center Bottom Car Headline & Reserve Overlay */}
        <div className="absolute bottom-24 sm:bottom-28 left-6 md:left-8 z-30 max-w-xl pointer-events-none">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold bg-white/90 text-neutral-950 mb-2 shadow-sm">
            {currentCar.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-sans tracking-tight leading-tight">
            {currentCar.name}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            "{currentCar.headline}"
          </p>
        </div>

        {/* View Mode & Lighting Controls Dock (Top/Middle Right) */}
        <div className="absolute bottom-24 sm:bottom-28 right-6 md:right-8 z-30 flex items-center gap-2 pointer-events-auto">
          {/* Angle / View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 shadow-xl">
            <button
              onClick={() => setActiveView('exterior')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                activeView === 'exterior'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Exterior
            </button>
            <button
              onClick={() => setActiveView('interior')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                activeView === 'interior'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              First-Class Suite
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                activeView === 'profile'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Side Profile
            </button>
          </div>

          {/* Lighting Filter */}
          <button
            onClick={() =>
              setLightingMood(
                lightingMood === 'studio' ? 'warm' : lightingMood === 'warm' ? 'noir' : 'studio'
              )
            }
            className="p-2.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 text-white hover:bg-black/90 transition shadow-xl"
            title="Cycle Lighting Mood"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* BOTTOM REAL CAR DOCK (THUMBNAIL STRIP) */}
        <div className="absolute bottom-4 inset-x-4 md:inset-x-8 z-30 flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-2xl pointer-events-auto">
          {/* Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {HERO_CARS.map((car, index) => {
              const isSelected = index === selectedCarIndex;
              return (
                <button
                  key={car.id}
                  onClick={() => {
                    setSelectedCarIndex(index);
                    setActiveHotspot(null);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-left shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-neutral-100 text-neutral-800 border-neutral-200 hover:bg-neutral-200/70 hover:border-neutral-300'
                  }`}
                >
                  <div className="w-9 h-7 rounded-lg overflow-hidden bg-black shrink-0">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold font-sans truncate max-w-[130px]">
                      {car.name}
                    </div>
                    <div className="text-[9px] font-mono opacity-70 truncate max-w-[120px]">
                      {car.stats.power.split(' ')[0]} {car.stats.power.split(' ')[1]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Reserve CTA */}
          <button
            onClick={() => onOpenBooking(currentCar)}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider shrink-0 transition flex items-center gap-2 shadow-md active:scale-[0.98]"
          >
            <span>Charter {currentCar.name.split(' ')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
