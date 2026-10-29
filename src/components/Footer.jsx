import React from 'react';
import { Shield, Phone, Mail, MapPin, ArrowUpRight, Compass, Radio } from 'lucide-react';
import { BRAND_INFO } from '../data/fleetData';

export default function Footer({ onOpenBooking }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-50 text-neutral-600 border-t border-neutral-200 pt-20 pb-12 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-200">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-md">
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute inset-0 border border-neutral-400 rotate-45 rounded-[2px]" />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black tracking-[0.2em] font-sans text-neutral-900">
                  VANTABLACK
                </span>
                <div className="text-[10px] font-mono tracking-widest text-amber-800 uppercase font-semibold">
                  Executive Black-Car Mobility Privé
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm font-sans">
              Bespoke private chauffeur services, airport FBO tarmac transfers, and diplomatic security convoys. Operating an elite 100% all-black modern fleet with real-time encrypted telemetry.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 font-mono text-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-600">DISPATCH CONCIERGE:</span>
              <span className="text-neutral-900 font-bold">ACTIVE 24/7/365</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 mb-4 font-bold">
              Mobility Services
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#services" className="hover:text-neutral-900 transition">VIP Chauffeur</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-neutral-900 transition">All-Black Fleet</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-neutral-900 transition">Rate Estimator</a>
              </li>
              <li>
                <a href="#telemetry" className="hover:text-neutral-900 transition">Satellite Radar</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-neutral-900 transition">Safety Standards</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-neutral-900 transition">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Global Operations Hubs */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 mb-4 font-bold">
              Metropolitan Hubs
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-600">
              {BRAND_INFO.globalHubs.map((hub, idx) => (
                <li key={typeof hub === 'object' ? hub.city : idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>{typeof hub === 'object' ? `${hub.city} — ${hub.code}` : `${hub} Private Terminal`}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-900 mb-4 font-bold">
              Concierge Desk
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="flex items-center gap-2 text-neutral-900 hover:text-amber-800 transition font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{BRAND_INFO.phone}</span>
              </a>

              <a
                href={`mailto:${BRAND_INFO.dispatchEmail}`}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition truncate"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{BRAND_INFO.dispatchEmail}</span>
              </a>

              <div className="flex items-start gap-2 text-neutral-500 text-[11px] leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.hq}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-semibold uppercase tracking-wider transition shadow-sm"
                >
                  Book Priority Fleet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {currentYear} {BRAND_INFO.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-900 cursor-pointer transition">Confidentiality Protocol</span>
            <span className="hover:text-neutral-900 cursor-pointer transition">Terms of Carriage</span>
            <span className="hover:text-neutral-900 cursor-pointer transition">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
