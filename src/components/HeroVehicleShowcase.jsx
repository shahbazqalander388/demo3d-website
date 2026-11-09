import React, { useState, useRef, useEffect } from 'react';
import {
  Sliders,
  ArrowRight,
  RotateCw,
  Maximize2,
  MoveHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Camera
} from 'lucide-react';
import Vehicle360Viewer from './Vehicle360Viewer';

export const HERO_CARS = [
  {
    id: 'maybach-s680',
    name: 'Mercedes-Maybach S680',
    spec: 'Obsidian Black V12 // 621 HP',
    tag: 'FLAGSHIP FIRST-CLASS',
    video: '/videos/maybach-cinematic.mp4',
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
    video: '/videos/ghost-cinematic.mp4',
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
    video: '/videos/escalade-cinematic.mp4',
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
    video: '/videos/gwagon-cinematic.mp4',
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
    video: '/videos/panamera-cinematic.mp4',
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
  const [activeView, setActiveView] = useState('video'); // Default to 3D Cinematic Video View on page load
  const [lightingMood, setLightingMood] = useState('studio'); // 'studio', 'warm', 'noir'
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Video Player State
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00');
  const [durationStr, setDurationStr] = useState('0:00');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Drag-to-Scrub Hand Movement State
  const videoContainerRef = useRef(null);
  const isVideoDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  // 360 Turntable Angle & Physics (for Photo View)
  const [angle, setAngle] = useState(35); // 0 to 359 degrees
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  const containerRef = useRef(null);
  const photoLastXRef = useRef(0);
  const photoLastTimeRef = useRef(0);
  const photoVelocityRef = useRef(0);
  const photoInertiaRafRef = useRef(null);
  const isPhotoDraggingRef = useRef(false);

  const currentCar = HERO_CARS[selectedCarIndex];

  // Auto-play video when car or speed changes
  useEffect(() => {
    if (videoRef.current && activeView === 'video') {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [selectedCarIndex, playbackSpeed, activeView]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const cycleSpeed = () => {
    const speeds = [1, 0.5, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setVideoProgress((curr / dur) * 100);

    const format = (sec) => {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };
    setCurrentTimeStr(format(curr));
    setDurationStr(format(dur));
  };

  // Hand Drag to Scrub Video Movement
  const handleVideoPointerDown = (e) => {
    isVideoDraggingRef.current = true;
    setHasInteracted(true);
    lastXRef.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handleVideoPointerMove = (e) => {
    if (!isVideoDraggingRef.current || !videoRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    lastXRef.current = currentX;

    const dur = videoRef.current.duration || 10;
    // Scrub forward or backward with hand movement
    const scrubAmount = (deltaX / 160) * (dur * 0.12);
    videoRef.current.currentTime = Math.max(0, Math.min(dur, videoRef.current.currentTime - scrubAmount));
  };

  const handleVideoPointerUp = (e) => {
    if (!isVideoDraggingRef.current) return;
    isVideoDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Photo Turntable Hand Drag Handlers
  const handlePhotoPointerDown = (e) => {
    setIsAutoSpinning(false);
    if (photoInertiaRafRef.current) cancelAnimationFrame(photoInertiaRafRef.current);
    isPhotoDraggingRef.current = true;
    photoLastXRef.current = e.clientX;
    photoLastTimeRef.current = performance.now();
    photoVelocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePhotoPointerMove = (e) => {
    if (!isPhotoDraggingRef.current) return;
    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - photoLastXRef.current;
    const deltaTime = Math.max(1, now - photoLastTimeRef.current);

    photoVelocityRef.current = deltaX / deltaTime;

    setAngle((prev) => {
      const next = (prev - deltaX * 0.65) % 360;
      return next < 0 ? next + 360 : next;
    });

    photoLastXRef.current = currentX;
    photoLastTimeRef.current = now;
  };

  const handlePhotoPointerUp = (e) => {
    if (!isPhotoDraggingRef.current) return;
    isPhotoDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    let v = photoVelocityRef.current * 14;
    const applyInertia = () => {
      if (Math.abs(v) > 0.05) {
        setAngle((prev) => {
          const next = (prev - v) % 360;
          return next < 0 ? next + 360 : next;
        });
        v *= 0.92;
        photoInertiaRafRef.current = requestAnimationFrame(applyInertia);
      }
    };
    if (Math.abs(v) > 0.1) {
      photoInertiaRafRef.current = requestAnimationFrame(applyInertia);
    }
  };

  const snapToAngle = (deg) => {
    setAngle(deg % 360);
  };

  // 3D Perspective math for the photo mode
  const rad = (angle * Math.PI) / 180;
  const rotY = Math.sin(rad) * 28;
  const rotX = -Math.cos(rad) * 4.5;
  const transX = Math.sin(rad) * 20;
  const turntableZ = angle;
  const glarePercent = ((angle % 360) / 360) * 100;
  const shadowScaleX = 1 + Math.abs(Math.sin(rad)) * 0.25;

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
          {/* Switch to Video View */}
          <div className="absolute top-12 left-3 sm:top-20 sm:left-6 md:left-8 z-30 pointer-events-auto">
            <button
              onClick={() => setActiveView('video')}
              className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 hover:bg-black backdrop-blur-xl border border-white/20 text-neutral-300 hover:text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg cursor-pointer"
            >
              <Film className="w-3 h-3 text-amber-400" />
              <span>🎥 Switch to 3D Video</span>
            </button>
          </div>
        </div>
      ) : activeView === 'exterior' ? (
        <div
          ref={containerRef}
          onPointerDown={handlePhotoPointerDown}
          onPointerMove={handlePhotoPointerMove}
          onPointerUp={handlePhotoPointerUp}
          onPointerCancel={handlePhotoPointerUp}
          style={{ perspective: '1200px' }}
          className="relative w-full h-[460px] sm:h-[580px] lg:h-[680px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none"
        >
          {/* Glowing Ground Turntable Stage Rings */}
          <div
            className="absolute bottom-8 sm:bottom-12 w-4/5 max-w-4xl h-24 sm:h-32 rounded-full border border-amber-400/35 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent pointer-events-none"
            style={{
              transform: `rotateX(75deg) rotateZ(${turntableZ}deg)`
            }}
          >
            <div className="absolute inset-2 sm:inset-3 rounded-full border border-white/15" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24]" />
          </div>

          {/* Ground Contact Shadow */}
          <div
            className="absolute bottom-10 sm:bottom-14 w-3/4 max-w-3xl h-16 sm:h-20 rounded-full bg-black/95 blur-2xl pointer-events-none"
            style={{ transform: `scaleX(${shadowScaleX})` }}
          />

          {/* REAL CAR IMAGE IN 3D TURNTABLE PERSPECTIVE */}
          <div
            style={{
              transform: `translateX(${transX}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.02)`,
              transformStyle: 'preserve-3d'
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
          </div>

          {/* Switch to Video Pill */}
          <div className="absolute top-12 left-3 sm:top-20 sm:left-6 md:left-8 z-30 pointer-events-auto">
            <button
              onClick={() => setActiveView('video')}
              className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 hover:bg-black border border-amber-400/70 text-amber-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>🎥 Watch 3D Video</span>
            </button>
          </div>
        </div>
      ) : (
        /* PRIMARY 3D CINEMATIC VIDEO VIEWPORT */
        <div
          ref={videoContainerRef}
          onPointerDown={handleVideoPointerDown}
          onPointerMove={handleVideoPointerMove}
          onPointerUp={handleVideoPointerUp}
          onPointerCancel={handleVideoPointerUp}
          className="relative w-full h-[480px] sm:h-[580px] lg:h-[680px] overflow-hidden bg-neutral-950 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none group"
        >
          {/* HD 3D Video Loop */}
          <video
            ref={videoRef}
            src={currentCar.video}
            poster={currentCar.image}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className={`w-full h-full object-cover object-center pointer-events-none transition-all duration-700 ${
              lightingMood === 'warm'
                ? 'sepia-[0.22] contrast-115 brightness-95'
                : lightingMood === 'noir'
                ? 'grayscale contrast-135 brightness-90'
                : 'contrast-105 brightness-100'
            }`}
          />

          {/* Luxury Studio Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/20 to-neutral-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-transparent to-neutral-950/60 pointer-events-none" />

          {/* Top-Left: LIVE 3D CINEMATIC MASTER BADGE & CONTROLS */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 md:left-8 z-30 pointer-events-auto flex flex-col gap-2 max-w-[280px] sm:max-w-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] font-mono uppercase font-black text-white truncate">
                3D Video Reel // {currentCar.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-amber-400" />}
                <span>{isPlaying ? 'Pause' : 'Play 3D'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 sm:p-2 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white transition shadow-lg cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              </button>

              <button
                onClick={cycleSpeed}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-amber-300 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider transition shadow-lg cursor-pointer"
                title="Playback Velocity"
              >
                {playbackSpeed}x Speed
              </button>
            </div>
          </div>

          {/* Hand Drag Gesture Hint */}
          {!hasInteracted && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-bounce">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400 text-white shadow-2xl">
                <span className="text-base sm:text-lg">🖐️</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                  Drag with Hand to Scrub 3D Video Movement
                </span>
                <MoveHorizontal className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          )}

          {/* Interactive Scrub Timeline Bar (Bottom of Video Viewport) */}
          <div className="absolute bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-8 md:inset-x-12 z-30 pointer-events-auto">
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-neutral-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Film className="w-3 h-3 text-amber-400" />
                <span>3D Scrub Timeline (Drag Hand Across Screen)</span>
              </span>
              <span>{currentTimeStr} / {durationStr}</span>
            </div>
            <div
              onClick={(e) => {
                if (!videoRef.current) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
              }}
              className="relative w-full h-1.5 sm:h-2 rounded-full bg-white/20 backdrop-blur-md cursor-pointer overflow-hidden group/bar"
            >
              <div
                style={{ width: `${videoProgress}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-75 relative"
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Tactical Hotspots on 3D Video */}
          {currentCar.hotspots.map((h) => {
            const isOpened = activeHotspot === h.id;
            return (
              <div
                key={h.id}
                style={{ left: h.x, top: h.y }}
                className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => setActiveHotspot(isOpened ? null : h.id)}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 text-black border-2 border-black flex items-center justify-center shadow-lg group-hover:scale-125 transition">
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  </span>
                </div>

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
              onClick={() => setActiveView('video')}
              className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === 'video'
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'text-amber-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>3D Video</span>
            </button>
            <button
              onClick={() => setActiveView('360')}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === '360'
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3 h-3" />
              <span>3D Mesh</span>
            </button>
            <button
              onClick={() => setActiveView('exterior')}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                activeView === 'exterior'
                  ? 'bg-white text-neutral-900 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Photo</span>
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
