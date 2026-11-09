import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Sliders,
  MoveHorizontal,
  Box,
  Camera
} from 'lucide-react';
import ThreeCarStage from './ThreeCarStage';

export default function Vehicle360Viewer({
  vehicle,
  initialAngle = 35,
  showModeSwitch = true,
  inline = false,
  onOpenBooking = null,
  onOpenConfigurator = null
}) {
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'webgl'
  const [angle, setAngle] = useState(initialAngle); // 0 to 359
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [lightingMood, setLightingMood] = useState('studio'); // 'studio', 'warm', 'noir'
  const [hasInteracted, setHasInteracted] = useState(false);

  // Drag physics tracking
  const containerRef = useRef(null);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaAnimRef = useRef(null);
  const autoSpinAnimRef = useRef(null);

  // Determine current viewing perspective label based on 360 angle
  const getPerspectiveInfo = (deg) => {
    const normalized = ((deg % 360) + 360) % 360;
    if (normalized >= 338 || normalized < 22) {
      return { label: 'Front Direct Stance', badge: '0° Front' };
    } else if (normalized >= 22 && normalized < 68) {
      return { label: 'Front-Three-Quarter Right', badge: '45° Dynamic' };
    } else if (normalized >= 68 && normalized < 112) {
      return { label: 'Starboard Side Profile', badge: '90° Profile' };
    } else if (normalized >= 112 && normalized < 158) {
      return { label: 'Rear-Three-Quarter Right', badge: '135° Quarter' };
    } else if (normalized >= 158 && normalized < 202) {
      return { label: 'Rear Lightbar Monolith', badge: '180° Rear' };
    } else if (normalized >= 202 && normalized < 248) {
      return { label: 'Rear-Three-Quarter Left', badge: '225° Quarter' };
    } else if (normalized >= 248 && normalized < 292) {
      return { label: 'Portside Executive Profile', badge: '270° Profile' };
    } else {
      return { label: 'Front-Three-Quarter Left', badge: '315° Dynamic' };
    }
  };

  const perspectiveInfo = getPerspectiveInfo(angle);

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning) {
      if (autoSpinAnimRef.current) cancelAnimationFrame(autoSpinAnimRef.current);
      return;
    }

    const spinStep = () => {
      setAngle((prev) => (prev + 0.5) % 360);
      autoSpinAnimRef.current = requestAnimationFrame(spinStep);
    };

    autoSpinAnimRef.current = requestAnimationFrame(spinStep);
    return () => {
      if (autoSpinAnimRef.current) cancelAnimationFrame(autoSpinAnimRef.current);
    };
  }, [isAutoSpinning]);

  // Pointer / Touch Hand-Drag Handlers
  const handlePointerDown = (e) => {
    // Stop any ongoing inertia or auto-spin
    if (inertiaAnimRef.current) cancelAnimationFrame(inertiaAnimRef.current);
    setIsAutoSpinning(false);
    setIsDragging(true);
    setHasInteracted(true);

    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - lastXRef.current;
    const deltaTime = Math.max(1, now - lastTimeRef.current);

    // Calculate instantaneous velocity for inertia
    velocityRef.current = deltaX / deltaTime;

    // Adjust sensitivity based on zoom level
    const sensitivity = 0.55 / Math.sqrt(zoomLevel);
    setAngle((prev) => {
      const next = (prev - deltaX * sensitivity) % 360;
      return next < 0 ? next + 360 : next;
    });

    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (e.currentTarget.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture was already released
      }
    }

    // Apply smooth inertia coasting
    let v = velocityRef.current * 14;
    const applyInertia = () => {
      if (Math.abs(v) > 0.05) {
        setAngle((prev) => {
          const next = (prev - v) % 360;
          return next < 0 ? next + 360 : next;
        });
        v *= 0.92; // Friction damping
        inertiaAnimRef.current = requestAnimationFrame(applyInertia);
      }
    };

    if (Math.abs(v) > 0.1) {
      inertiaAnimRef.current = requestAnimationFrame(applyInertia);
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.0, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.85, Number((z - 0.25).toFixed(2))));
  const handleResetZoom = () => setZoomLevel(1);

  // Wheel zoom handler
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) return;
    if (e.deltaY < 0) {
      setZoomLevel((z) => Math.min(2.0, Number((z + 0.1).toFixed(2))));
    } else {
      setZoomLevel((z) => Math.max(0.85, Number((z - 0.1).toFixed(2))));
    }
  };

  // Quick snap to cardinal angles
  const snapToAngle = (targetDeg) => {
    setIsAutoSpinning(false);
    setAngle(targetDeg % 360);
  };

  // Calculate 3D simulated perspective variables for photo mode
  // The angle ranges from 0 to 360
  const rad = (angle * Math.PI) / 180;
  // Simulated horizontal perspective tilt
  const tiltY = Math.sin(rad) * 18;
  const tiltX = Math.cos(rad) * 4;
  // Specular sheen highlight coordinate follows the rotation
  const glarePercentX = ((angle % 360) / 360) * 100;

  // Pick active image (seamlessly switches if profile/interior angle requested)
  const currentImage =
    (angle >= 65 && angle <= 115) || (angle >= 245 && angle <= 295)
      ? vehicle?.profileImage || vehicle?.image
      : vehicle?.image;

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden bg-neutral-950 select-none ${inline ? '' : 'rounded-3xl'}`}>
      {/* TOP HUD BAR */}
      <div className="relative z-30 p-2.5 sm:p-4 md:p-6 flex items-center justify-between pointer-events-none gap-2">
        {/* Left: 360 Mode Status & Angle Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/20 text-white shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase font-bold tracking-wider">
              360° Turntable
            </span>
            <span className="text-neutral-500 font-mono">|</span>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-400">
              {Math.round(angle)}°
            </span>
          </div>

          <span className="hidden md:inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-mono uppercase font-semibold text-neutral-300 border border-white/10">
            {perspectiveInfo.label}
          </span>
        </div>

        {/* Right: Switch Mode & Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {showModeSwitch && (
            <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-full bg-black/75 backdrop-blur-xl border border-white/20 shadow-xl">
              <button
                onClick={() => setViewMode('photo')}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-mono transition ${
                  viewMode === 'photo'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="360 Studio Photography View"
              >
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Photo</span>
              </button>
              <button
                onClick={() => setViewMode('webgl')}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 rounded-full text-[10px] sm:text-xs font-mono transition ${
                  viewMode === 'webgl'
                    ? 'bg-amber-400 text-black font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="3D WebGL Obsidian Mesh"
              >
                <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>3D Mesh</span>
              </button>
            </div>
          )}

          {/* Lighting Mood Switcher */}
          <button
            onClick={() =>
              setLightingMood((m) =>
                m === 'studio' ? 'warm' : m === 'warm' ? 'noir' : 'studio'
              )
            }
            className="p-1.5 sm:p-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/20 text-neutral-300 hover:text-white transition shadow-xl"
            title="Cycle Studio Lighting Mood"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* MAIN 360 INTERACTIVE STAGE */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className={`relative w-full flex-1 flex items-center justify-center overflow-hidden touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1400px' }}
      >
        {viewMode === 'webgl' ? (
          // 3D Three.js WebGL Stage
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            <ThreeCarStage
              paintColor="#070709"
              paintFinish="gloss"
              autoRotate={isAutoSpinning}
              headlightsOn={true}
              onRotateChange={(deg) => setAngle(deg)}
            />
          </div>
        ) : (
          // 360 Studio Photography Turntable
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoomLevel})`,
              transition: isDragging ? 'none' : 'transform 0.25s ease-out'
            }}
          >
            {/* The Vehicle Wrapper with 3D Perspective Rotation */}
            <div
              className="relative w-full max-w-5xl h-[80%] max-h-[540px] flex items-center justify-center"
              style={{
                transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1)'
              }}
            >
              {/* Dynamic Ground Turntable Stage Rings */}
              <div
                className="absolute bottom-4 w-4/5 h-24 rounded-full border border-amber-400/30 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent pointer-events-none"
                style={{
                  transform: `rotateX(75deg) rotateZ(${angle}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
              >
                <div className="absolute inset-2 rounded-full border border-white/10" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
              </div>

              {/* Ground Contact Shadow */}
              <div
                className="absolute bottom-6 w-3/4 h-16 rounded-full bg-black/90 blur-xl pointer-events-none"
                style={{
                  transform: `scaleX(${1 + Math.abs(Math.sin(rad)) * 0.25})`
                }}
              />

              {/* Real High-Resolution Vehicle Image (Responsive Contain) */}
              <img
                src={currentImage}
                alt={vehicle?.name || 'Vantablack 360 Asset'}
                draggable={false}
                className={`max-w-[96%] max-h-[90%] w-auto h-auto object-contain filter select-none pointer-events-none transition-all duration-300 ${
                  lightingMood === 'warm'
                    ? 'sepia-[0.18] contrast-110 brightness-95'
                    : lightingMood === 'noir'
                    ? 'grayscale contrast-130 brightness-90'
                    : 'contrast-105 brightness-100'
                }`}
              />

              {/* Dynamic Specular Sheen (Glides Across Paint as Dragged) */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
                style={{
                  background: `linear-gradient(${angle}deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%)`
                }}
              />

              {/* Dynamic Glare Reflection */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at ${glarePercentX}% 40%, rgba(255, 255, 255, 0.22) 0%, transparent 55%)`
                }}
              />
            </div>
          </div>
        )}

        {/* INTERACTIVE HAND GESTURE HINT (Fades after first interaction) */}
        {!hasInteracted && (
          <div className="absolute z-20 pointer-events-none flex flex-col items-center gap-1.5 animate-pulse px-3">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400/70 text-white shadow-2xl">
              <span className="text-sm sm:text-base">🖐️</span>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                Drag to Rotate 360°
              </span>
              <MoveHorizontal className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            </div>
            <div className="text-[9px] sm:text-[11px] font-mono text-neutral-400 tracking-wider bg-black/60 px-2.5 py-0.5 rounded-full">
              (Images per click & drag karein)
            </div>
          </div>
        )}

        {/* FLOATING 360° COMPASS DIAL HUD */}
        <div className="absolute top-6 left-6 z-20 hidden md:flex items-center gap-3 p-2.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/15 pointer-events-none shadow-xl">
          <div className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <div
              className="absolute w-full h-[1px] bg-amber-400"
              style={{ transform: `rotate(${angle}deg)` }}
            />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="absolute -top-3 text-[8px] font-mono text-neutral-400">N</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Azimuth Angle</div>
            <div className="text-xs font-mono font-bold text-white">{Math.round(angle)}° / 360°</div>
          </div>
        </div>

        {/* ZOOM CONTROLS (FLOAT RIGHT) */}
        <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-xl pointer-events-auto">
          <button
            onClick={handleZoomIn}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold text-amber-400 hover:bg-white/10 transition text-center"
            title="Reset Zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* BOTTOM CONTROL DOCK & CARDINAL SNAP BUTTONS */}
      <div className="relative z-30 p-2 sm:p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          {/* Cardinal Angle Quick-Snap Buttons */}
          <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/15 overflow-x-auto no-scrollbar max-w-full">
            {[
              { label: 'Front', deg: 0 },
              { label: '3/4', deg: 45 },
              { label: 'Side', deg: 90 },
              { label: 'Rear', deg: 180 },
              { label: 'Port', deg: 270 }
            ].map((snap) => {
              const isCurrent = Math.abs(angle - snap.deg) < 15;
              return (
                <button
                  key={snap.label}
                  onClick={() => snapToAngle(snap.deg)}
                  className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition whitespace-nowrap ${
                    isCurrent
                      ? 'bg-amber-400 text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {snap.label}
                </button>
              );
            })}
          </div>

          {/* Central Play/Pause Turntable Auto-Spin */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10px] sm:text-xs uppercase tracking-wider font-bold transition shadow-lg ${
                isAutoSpinning
                  ? 'bg-amber-400 text-black'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {isAutoSpinning ? (
                <>
                  <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black" />
                  <span>Auto 360°</span>
                </>
              )}
            </button>

            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking(vehicle)}
                className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold border border-white/15 transition shadow-lg"
              >
                Reserve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
