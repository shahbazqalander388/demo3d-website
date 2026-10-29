import React, { useState, useEffect } from 'react';
import {
  Phone,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Sliders,
  Shield,
  Search,
  Bookmark
} from 'lucide-react';
import { BRAND_INFO, FLEET_MODELS } from '../data/fleetData';

export default function Navbar({ onOpenBooking, onOpenConfigurator }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelsFlyoutOpen, setModelsFlyoutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Utility Regional Bar (Porsche-Style) */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] font-mono py-1.5 px-4 sm:px-8 border-b border-neutral-800 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-neutral-300 hover:text-white cursor-pointer transition">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>Canada / English</span>
          </div>
          <span className="text-neutral-700">|</span>
          <a href="#finder" className="text-neutral-400 hover:text-white transition">
            Find a Privé Centre / FBO Hub
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>24/7 Concierge Hotline: {BRAND_INFO.phone}</span>
          </a>
          <span className="text-neutral-700">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Hubs Operational
          </span>
        </div>
      </div>

      {/* Main Persistent Sticky Header */}
      <nav
        className={`fixed top-0 md:top-[29px] left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 ${
          scrolled ? 'py-3.5 shadow-sm' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Crest Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Porsche-Style Geometric Emblem */}
            <div className="w-9 h-9 rounded-sm bg-black border border-black flex items-center justify-center transition duration-200 group-hover:scale-105">
              <div className="relative w-4 h-4 flex items-center justify-center">
                <span className="absolute inset-0 border border-neutral-300 rotate-45 rounded-[1px]" />
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-[0.25em] font-sans text-black">
                  VANTABLACK
                </span>
                <span className="text-[10px] tracking-[0.2em] font-mono text-neutral-500 font-semibold hidden sm:inline">
                  PRIVÉ
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links (Porsche Hierarchy) */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Models Dropdown Trigger */}
            <button
              onClick={() => setModelsFlyoutOpen(!modelsFlyoutOpen)}
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-800 hover:text-black transition flex items-center gap-1.5 py-1 font-semibold group"
            >
              <span>Models</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  modelsFlyoutOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'
                }`}
              />
            </button>

            <a
              href="#configurator"
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-700 hover:text-black transition py-1 font-semibold"
            >
              Configurator
            </a>

            <a
              href="#models"
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-700 hover:text-black transition py-1 font-semibold"
            >
              Collection
            </a>

            <a
              href="#estimator"
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-700 hover:text-black transition py-1 font-semibold"
            >
              Rate Estimator
            </a>

            <a
              href="#services"
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-700 hover:text-black transition py-1 font-semibold"
            >
              Services
            </a>

            <a
              href="#finder"
              className="text-xs uppercase tracking-[0.18em] font-mono text-neutral-700 hover:text-black transition py-1 font-semibold"
            >
              Privé Centres
            </a>
          </div>

          {/* Action Controls & Porsche CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#configurator"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider transition font-medium"
            >
              <Sliders className="w-3.5 h-3.5 text-neutral-600" />
              <span>Build & Price</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition shadow-sm active:scale-[0.98]"
            >
              <span>Reserve Asset</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-full text-xs font-mono bg-black text-white font-semibold"
            >
              Reserve
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-100 text-neutral-800 hover:text-black"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Porsche Models Mega-Menu Flyout (Desktop) */}
        {modelsFlyoutOpen && (
          <div className="hidden lg:block border-t border-neutral-200 bg-white/98 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-8 py-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
                  The All-Black Obsidian Lineup
                </div>
                <button
                  onClick={() => setModelsFlyoutOpen(false)}
                  className="text-xs font-mono text-neutral-400 hover:text-black flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Close Overview
                </button>
              </div>

              {/* 6 Car Model Cards Grid */}
              <div className="grid grid-cols-6 gap-4">
                {FLEET_MODELS.map((model) => (
                  <div
                    key={model.id}
                    onClick={() => {
                      setModelsFlyoutOpen(false);
                      const el = document.getElementById('models');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 cursor-pointer transition group flex flex-col justify-between"
                  >
                    <div className="w-full h-24 rounded-xl overflow-hidden bg-black mb-3">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-neutral-500 font-semibold truncate">
                        {model.badge}
                      </div>
                      <div className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                        {model.name}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-800 font-medium mt-1">
                        {model.priceStarting}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-600 group-hover:text-black">
                      <span>0-100: {model.porscheSpecs.acceleration}</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-4 pb-6 bg-white border-b border-neutral-200 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
              <a
                href="#models"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Models Overview</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
              <a
                href="#configurator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Build & Price Configurator</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
              <a
                href="#estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Route & Rate Estimator</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Mobility Services</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
              <a
                href="#finder"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-neutral-800 hover:bg-neutral-100 flex items-center justify-between"
              >
                <span>Find Privé Centre / FBO</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold"
              >
                Reserve Asset
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
