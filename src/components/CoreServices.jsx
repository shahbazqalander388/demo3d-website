import React, { useState, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { CORE_SERVICES } from '../data/fleetData';

// Interactive 3D Tilt Card Component for White Theme
function TiltCard({ service, onBook }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: '1200px' }} className="w-full h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className="relative h-full rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-400 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group"
      >
        {/* Dynamic Glare */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Top Vehicle Showcase Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
          <img
            src={service.image}
            onError={(e) => {
              if (service.fallbackImage && e.target.src !== service.fallbackImage) {
                e.target.src = service.fallbackImage;
              }
            }}
            alt={service.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
            loading="lazy"
          />
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-white/90 backdrop-blur-md text-neutral-900 border border-neutral-200 shadow-sm">
              {service.tag}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-md text-white border border-white/20">
              100% BLACK FLEET
            </span>
          </div>

          {/* Vehicle Overlay */}
          <div className="absolute bottom-3 left-4 right-4 z-20 text-white">
            <div className="text-[10px] font-mono uppercase text-amber-300 tracking-wider">
              {service.category}
            </div>
            <div className="text-sm font-semibold truncate text-white">
              {service.vehicleType}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between z-20">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 font-sans group-hover:text-amber-800 transition">
              {service.title}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              {service.description}
            </p>

            {/* Technical Specs Grid */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 font-mono text-[11px]">
              {Object.entries(service.specs).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-neutral-400 uppercase text-[9px] tracking-wider">{key}</span>
                  <span className="text-neutral-900 font-semibold truncate">{val}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="mt-4 space-y-2">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                  <CheckCircle className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={() => onBook(service)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 group-hover:shadow-md"
            >
              <span>Reserve This Service</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoreServices({ onOpenBooking }) {
  return (
    <section id="services" className="relative py-28 bg-[#F8F9FA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-900 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              Bespoke Executive Transportation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
              Precision VIP Mobility & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">
                Discreet Transportation
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
              Tailored for high-net-worth individuals, family offices, visiting dignitaries, and corporate executive boards requiring absolute security and punctuality.
            </p>
          </div>

          {/* Concierge Assurance Badge */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-neutral-900 uppercase">
                100% Confidential
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                Non-Disclosure Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CORE_SERVICES.map((service) => (
            <TiltCard
              key={service.id}
              service={service}
              onBook={onOpenBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
