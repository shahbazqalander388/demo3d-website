import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/fleetData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            Executive & Family Office Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
            Client Discretion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">Verified Trust</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
            Due to strict confidentiality covenants, client identities are published with explicit consent. Read how global enterprises rely on our all-black precision fleet.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex flex-col justify-between"
            >
              <div>
                {/* Top Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-amber-600 shadow-sm">
                    <Quote className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-neutral-700 font-sans leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Organization */}
              <div className="mt-8 pt-5 border-t border-neutral-200">
                <div className="text-sm font-bold text-neutral-900 font-sans">{item.author}</div>
                <div className="text-xs font-mono text-amber-800 mt-0.5">{item.role}</div>
                <div className="text-xs font-mono text-neutral-500 mt-0.5">{item.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Non-Disclosure Guarantee Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold">
                100% Non-Disclosure Protocol Guarantee
              </div>
              <div className="text-xs sm:text-sm text-neutral-300 mt-1 font-sans max-w-2xl">
                All chauffeurs and dispatch commanders are bonded under strict confidentiality covenants. No passenger, route, or manifest information is ever recorded on public networks.
              </div>
            </div>
          </div>
          <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-neutral-200 shrink-0">
            NDA COVENANT STANDBY
          </span>
        </div>
      </div>
    </section>
  );
}
