import React, { useState, useEffect } from 'react';
import { Phone, ChevronRight, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { BRAND_INFO } from '../data/fleetData';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'All-Black Fleet', href: '#fleet' },
    { label: 'Instant Estimator', href: '#estimator' },
    { label: 'Live Telemetry', href: '#telemetry' },
    { label: 'Standards', href: '#why-us' },
    { label: 'Endorsements', href: '#testimonials' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 shadow-sm'
          : 'py-5 bg-white/60 backdrop-blur-md border-b border-neutral-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center transition duration-300 shadow-md group-hover:scale-105">
            {/* Geometric Emblem */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute inset-0 border border-neutral-400 rotate-45 rounded-[2px]" />
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-[0_0_6px_#D4AF37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-[0.2em] font-sans text-neutral-900">
                VANTABLACK
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-100 text-neutral-900 border border-neutral-200">
                PRIVÉ
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] tracking-widest text-neutral-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>DISPATCH ACTIVE</span>
              <span className="text-neutral-300">|</span>
              <span className="hidden sm:inline text-neutral-500">180+ BLACK CARS</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono text-neutral-600 hover:text-neutral-900 transition duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neutral-900 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Action Controls & Concierge Hotline */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 transition"
            title="Call 24/7 Priority Concierge"
          >
            <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="text-neutral-400">24/7:</span>
            <span className="font-semibold text-neutral-900">{BRAND_INFO.phone}</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 group active:scale-[0.98]"
          >
            <span>Book Chauffeur</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 text-white font-semibold"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-900"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-4 pt-4 pb-6 bg-white/98 backdrop-blur-2xl border-b border-neutral-200 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-mono uppercase tracking-wider text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex flex-col gap-3">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-700"
            >
              <Phone className="w-4 h-4 text-[#B8860B]" />
              <span>Priority Concierge: {BRAND_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md"
            >
              Request Chauffeur / Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
