import React, { useState } from 'react';
import { Shield, Sparkles, Check, ArrowRight, Gauge, Lock, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';
import { FLEET_CATEGORIES, FLEET_VEHICLES } from '../data/fleetData';

export default function FleetShowcase({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('flagship_sedans');
  const [selectedVehicleId, setSelectedVehicleId] = useState('sedan-maybach-noir');
  const [filterMode, setFilterMode] = useState('studio'); // 'studio', 'editorial', 'noir'

  // Filtered vehicles
  const currentCategoryVehicles = FLEET_VEHICLES.filter(
    (v) => v.categoryId === activeCategory
  );

  // Active selected vehicle
  const selectedVehicle =
    FLEET_VEHICLES.find((v) => v.id === selectedVehicleId) ||
    currentCategoryVehicles[0] ||
    FLEET_VEHICLES[0];

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const firstInCat = FLEET_VEHICLES.find((v) => v.categoryId === catId);
    if (firstInCat) setSelectedVehicleId(firstInCat.id);
  };

  return (
    <section id="fleet" className="relative py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              100% Obsidian Specification
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
              The All-Black <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">Fleet Showcase</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl font-sans">
              Every unit is finished in high-gloss or satin matte obsidian black. Handcrafted interiors, dark privacy tint, and showroom sterile maintenance.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200">
            {FLEET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-neutral-900 text-white font-bold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Showcase Container */}
        <div className="rounded-3xl bg-neutral-50 border border-neutral-200 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Columns: Dramatic Studio Photography & Filters */}
            <div className="lg:col-span-7 relative bg-neutral-950 flex flex-col justify-between overflow-hidden min-h-[420px] lg:min-h-[560px]">
              {/* Studio Photograph */}
              <div className="absolute inset-0">
                <img
                  src={selectedVehicle.image}
                  onError={(e) => {
                    if (selectedVehicle.fallbackImage && e.target.src !== selectedVehicle.fallbackImage) {
                      e.target.src = selectedVehicle.fallbackImage;
                    }
                  }}
                  alt={selectedVehicle.name}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    filterMode === 'editorial'
                      ? 'contrast-125 saturate-90 brightness-95'
                      : filterMode === 'noir'
                      ? 'contrast-140 grayscale brightness-90'
                      : 'contrast-105'
                  }`}
                />
                {/* Clean Studio Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 p-6 flex items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider bg-white/90 backdrop-blur-md text-neutral-900 border border-neutral-200 shadow-sm">
                  {selectedVehicle.tag}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-black/70 border border-white/20 text-emerald-400 backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {selectedVehicle.status}
                  </span>
                </div>
              </div>

              {/* Bottom Identity & Filter Buttons */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    {selectedVehicle.categoryName}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-sans">
                    {selectedVehicle.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 italic font-sans max-w-md">
                    "{selectedVehicle.headline}"
                  </p>
                </div>

                {/* Tone Controls */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shrink-0">
                  <button
                    onClick={() => setFilterMode('studio')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                      filterMode === 'studio'
                        ? 'bg-white text-neutral-900 font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Studio
                  </button>
                  <button
                    onClick={() => setFilterMode('editorial')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                      filterMode === 'editorial'
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Editorial
                  </button>
                  <button
                    onClick={() => setFilterMode('noir')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                      filterMode === 'noir'
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Monochrome
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Technical Specifications & Reserve Action */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-neutral-200">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                    Technical Specifications
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {selectedVehicle.badge}
                  </span>
                </div>

                {/* Specs List */}
                <div className="mt-5 space-y-3 font-mono text-xs">
                  {Object.entries(selectedVehicle.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2 border-b border-neutral-100"
                    >
                      <span className="text-neutral-500 uppercase tracking-wider text-[11px] capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold text-neutral-900 text-right max-w-[60%] truncate">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Key Highlights */}
                <div className="mt-6">
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2.5">
                    Executive Amenities & Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {selectedVehicle.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-neutral-900 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing & Reservation CTA */}
              <div className="mt-8 pt-5 border-t border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Charter Standard Rate</div>
                    <div className="text-sm font-bold font-mono text-neutral-900">
                      {selectedVehicle.baseRate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Ideal For</div>
                    <div className="text-xs font-medium text-neutral-700 truncate max-w-[200px]">
                      {selectedVehicle.idealFor.split(',')[0]}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(selectedVehicle)}
                  className="w-full py-3.5 rounded-2xl bg-neutral-900 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Charter {selectedVehicle.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip for Category Vehicles */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategoryVehicles.map((veh) => {
            const isSelected = veh.id === selectedVehicle.id;
            return (
              <div
                key={veh.id}
                onClick={() => setSelectedVehicleId(veh.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                  isSelected
                    ? 'bg-white border-2 border-neutral-900 shadow-md'
                    : 'bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div className="w-16 h-12 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                  <img
                    src={veh.image}
                    onError={(e) => {
                      if (veh.fallbackImage && e.target.src !== veh.fallbackImage) {
                        e.target.src = veh.fallbackImage;
                      }
                    }}
                    alt={veh.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase text-neutral-500 truncate">
                    {veh.categoryName}
                  </div>
                  <div className="text-xs font-bold text-neutral-900 truncate">
                    {veh.name}
                  </div>
                  <div className="text-[11px] font-mono text-amber-700 font-semibold mt-0.5">
                    {veh.baseRate.split('(')[0]}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-neutral-900' : 'text-neutral-400'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
