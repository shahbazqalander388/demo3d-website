import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Shield, ArrowRight, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/fleetData';

export default function PorscheFinder({ onOpenBooking }) {
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);

  const currentHub = BRAND_INFO.globalHubs[selectedHubIndex];

  return (
    <section id="finder" className="py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Porsche Minimalist Layout) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
              Privé Centre & FBO Network
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans">
              Privé Locator.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl font-sans">
              Locate staged all-black executive assets across Canadian and international private aviation corridors. Immediate tarmac ramp mobilization.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-500">CANADIAN NETWORK:</span>
            <span className="font-bold text-black">100% OPERATIONAL</span>
          </div>
        </div>

        {/* Finder Interactive Hub Grid */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Hub Directory & Active Staging */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold mb-1">
                Select Staging Terminal:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BRAND_INFO.globalHubs.map((hub, idx) => {
                  const isSelected = idx === selectedHubIndex;
                  return (
                    <div
                      key={hub.city}
                      onClick={() => setSelectedHubIndex(idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                          <span className="text-xs font-bold">{hub.city}</span>
                        </div>
                        <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {hub.code} • {hub.country}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-emerald-300' : 'bg-neutral-100 text-emerald-700'
                        }`}>
                          {hub.units} Assets
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Active Terminal Dispatch Status Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Terminal Dispatch</div>
                  <h3 className="text-xl font-bold text-black font-sans mt-0.5">
                    {currentHub.city} — {currentHub.code}
                  </h3>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-2.5 font-mono text-xs text-neutral-600">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-400">FBO Tarmac Access:</span>
                  <span className="font-semibold text-black">Authorized (Signature / Atlantic)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-400">Ready Units on Standby:</span>
                  <span className="font-semibold text-emerald-600">{currentHub.units} Black Sedans & SUVs</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-400">Average Wheels-Up:</span>
                  <span className="font-semibold text-black">&lt; 9.4 Minutes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-400">Security Escort Detail:</span>
                  <span className="font-semibold text-amber-700">CEN B6 Armored Available</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Direct Concierge:</span>
                  <span className="font-semibold text-black">{BRAND_INFO.phone}</span>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenBooking({
                    pickup: `${currentHub.city} Terminal (${currentHub.code})`
                  })
                }
                className="w-full py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2"
              >
                <span>Dispatch From {currentHub.city}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
