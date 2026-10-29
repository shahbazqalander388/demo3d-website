import React, { useState } from 'react';
import { ArrowRight, Sliders, ChevronRight, Check } from 'lucide-react';
import { FLEET_CATEGORIES, FLEET_MODELS } from '../data/fleetData';

export default function PorscheModelRange({ onOpenBooking, onSelectForConfigurator }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredModels =
    activeCategory === 'all'
      ? FLEET_MODELS
      : FLEET_MODELS.filter((m) => m.categoryId === activeCategory);

  return (
    <section id="models" className="py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Porsche Minimalist Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
              Model Lineup // 100% Obsidian Fleet
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans">
              Models.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-neutral-100 border border-neutral-200">
            {FLEET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-black text-white font-bold shadow-xs'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model Range Grid (Clean Porsche Style Horizontal Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Vehicle Studio Photography */}
                <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-white/90 text-black shadow-xs">
                      {model.tag}
                    </span>
                  </div>
                </div>

                {/* Model Header */}
                <div className="p-6 pb-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    {model.badge}
                  </div>
                  <h3 className="text-xl font-bold text-black font-sans mt-0.5">
                    {model.name}
                  </h3>
                  <div className="text-sm font-mono font-bold text-black mt-2">
                    {model.priceStarting}
                    <span className="text-xs text-neutral-500 font-normal ml-1">or {model.priceMileage}</span>
                  </div>

                  <p className="mt-3 text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                {/* Porsche Signature 3-Column Technical Spec Bar */}
                <div className="px-6 py-4 mx-6 mb-2 rounded-xl bg-neutral-50 border border-neutral-200/80 grid grid-cols-3 gap-2 text-center font-mono">
                  <div>
                    <div className="text-sm font-bold text-black">
                      {model.porscheSpecs.acceleration}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 mt-0.5">
                      0-100 km/h
                    </div>
                  </div>
                  <div className="border-x border-neutral-200">
                    <div className="text-sm font-bold text-black truncate px-1">
                      {model.porscheSpecs.power.split('/')[0]}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 mt-0.5">
                      Power
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black truncate">
                      {model.porscheSpecs.topSpeed.split('(')[0]}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 mt-0.5">
                      Top Speed
                    </div>
                  </div>
                </div>
              </div>

              {/* Porsche Dual Action Buttons */}
              <div className="p-6 pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectForConfigurator(model)}
                  className="flex-1 py-2.5 rounded-full border border-neutral-300 hover:border-black text-black font-mono text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure</span>
                </button>

                <button
                  onClick={() => onOpenBooking(model)}
                  className="flex-1 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
