import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Navigation, Sparkles, ChevronDown, CheckCircle2, Shield } from 'lucide-react';
import HeroVehicleShowcase from './HeroVehicleShowcase';
import { BRAND_INFO } from '../data/fleetData';

export default function HeroSection({ onOpenBooking, onExploreFleet }) {
  return (
    <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center bg-white">
      {/* Subtle architectural ambient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-neutral-100 via-amber-50/40 to-transparent blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-neutral-50 border border-neutral-200/90 hover:border-neutral-900 transition shadow-sm group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-neutral-700 uppercase font-medium">
              2026 Executive Obsidian Fleet Mobilized
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-xs font-mono text-[#B8860B] font-semibold group-hover:translate-x-0.5 transition flex items-center gap-1">
              Priority Booking <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 leading-[1.08] font-sans">
            Executive Black-Car Transit &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-amber-700">
              VIP Chauffeur Mobility
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-600 font-normal leading-relaxed max-w-3xl mx-auto">
            {BRAND_INFO.subheadline}
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {/* Primary Action Button */}
            <button
              onClick={onExploreFleet}
              className="px-8 py-4 rounded-2xl bg-neutral-900 text-white font-mono font-bold text-xs tracking-wider uppercase shadow-lg shadow-neutral-900/10 hover:bg-black hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-3 group"
            >
              <span>Explore All-Black Fleet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200 text-amber-400" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-2xl bg-white border border-neutral-300 text-neutral-800 font-mono font-semibold text-xs tracking-wider uppercase shadow-sm hover:border-neutral-900 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Instant Rate Quote</span>
            </button>
          </div>
        </div>

        {/* REAL BLACK CAR INTERACTIVE VEHICLE SHOWCASE */}
        <div className="relative w-full">
          <HeroVehicleShowcase onOpenBooking={onOpenBooking} />
        </div>

        {/* Verified Fleet Metrics Beneath Viewport */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-neutral-900 tracking-tight">
                {BRAND_INFO.stats.avgDispatchTime}
              </div>
              <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                Average Mobilization
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-neutral-900 tracking-tight">
                {BRAND_INFO.stats.onTimeRate}
              </div>
              <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                Punctuality Rate
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-neutral-900 tracking-tight">
                {BRAND_INFO.stats.activeFleet}
              </div>
              <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                Obsidian Black Cars
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-neutral-900 tracking-tight">
                {BRAND_INFO.stats.securityRating}
              </div>
              <div className="text-[11px] font-mono uppercase text-neutral-500 tracking-wider">
                Ballistic Armor Rating
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#services"
            className="flex flex-col items-center gap-1.5 text-neutral-400 hover:text-neutral-900 transition group font-mono text-[10px] uppercase tracking-widest"
          >
            <span>Explore Services</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-neutral-700" />
          </a>
        </div>
      </div>
    </section>
  );
}
