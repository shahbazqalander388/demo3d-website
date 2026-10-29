import React from 'react';
import {
  ShieldAlert,
  Navigation,
  Clock,
  Award,
  Lock,
  FileCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { TRUST_METRICS, WHY_CHOOSE_US } from '../data/fleetData';

export default function TrustMetrics() {
  const iconMap = {
    ShieldAlert: ShieldAlert,
    Navigation: Navigation,
    Clock: Clock,
    Award: Award,
    Lock: Lock,
    FileCheck: FileCheck
  };

  return (
    <section id="why-us" className="relative py-28 bg-[#F8F9FA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] flex flex-col justify-between group"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-neutral-900 group-hover:text-amber-800 transition">
                  {metric.value}
                </div>
                <div className="mt-3 text-base font-bold text-neutral-900 font-sans">
                  {metric.label}
                </div>
                <p className="mt-2 text-xs text-neutral-500 font-sans leading-relaxed">
                  {metric.sub}
                </p>
              </div>

              {/* Indicator Bar */}
              <div className="mt-6 w-full h-[2px] bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-900 rounded-full w-2/3 group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-900 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Operational Rigor & Standards
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
            Why High-Consequence Clients <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">
              Trust Vantablack Privé
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
            From Fortune 50 executive boards and diplomatic delegations to private family offices, our operations are engineered for flawless execution.
          </p>
        </div>

        {/* 6 Key Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || ShieldAlert;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 mb-6">
                    <IconComponent className="w-6 h-6 text-neutral-900" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 font-sans">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
