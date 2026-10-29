import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Navigation, Sparkles, Sliders, CheckCircle2, Shield } from 'lucide-react';
import HeroVehicleShowcase from './HeroVehicleShowcase';
import { BRAND_INFO } from '../data/fleetData';

export default function HeroSection({ onOpenBooking, onExploreFleet, onOpenConfigurator }) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Tagline Pill (Porsche Minimalist Badge) */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono uppercase tracking-[0.2em] text-neutral-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>The All-Black Collection // Canada & Global</span>
          </div>
        </div>

        {/* Porsche-Style Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-black leading-[1.05] font-sans">
            Overwhelming Presence.{' '}
            <span className="text-neutral-500 font-normal">
              Engineered Discretion.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-neutral-600 font-normal leading-relaxed max-w-3xl mx-auto font-sans">
            The premier private chauffeur, executive airport tarmac transfer, and diplomatic armored mobility service. Operating an elite 100% all-black fleet.
          </p>

          {/* Dual Porsche Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreFleet}
              className="px-8 py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-3 group shadow-xs active:scale-[0.98]"
            >
              <span>Explore All Models</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200 text-amber-400" />
            </button>

            <a
              href="#configurator"
              className="px-8 py-4 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2.5 active:scale-[0.98]"
            >
              <Sliders className="w-4 h-4 text-neutral-700" />
              <span>Build & Price Configurator</span>
            </a>
          </div>
        </div>

        {/* REAL BLACK CAR INTERACTIVE SHOWCASE */}
        <div className="relative w-full">
          <HeroVehicleShowcase onOpenBooking={onOpenBooking} />
        </div>

        {/* 4 Minimalist Porsche Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-black">
                {BRAND_INFO.stats.avgDispatchTime}
              </div>
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Average Mobilization
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-black">
                {BRAND_INFO.stats.onTimeRate}
              </div>
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                On-Time Rate
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-black">
                {BRAND_INFO.stats.activeFleet}
              </div>
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Obsidian Black Cars
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-black">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-black">
                {BRAND_INFO.stats.securityRating}
              </div>
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Certified Armor Core
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
