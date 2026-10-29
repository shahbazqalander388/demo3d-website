import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
  Car,
  Shield,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESET_ROUTES } from '../data/fleetData';

export default function QuoteEstimator({ onBookWithQuote }) {
  // Form State
  const [pickup, setPickup] = useState(PRESET_ROUTES[0].from);
  const [dropoff, setDropoff] = useState(PRESET_ROUTES[0].to);
  const [distance, setDistance] = useState(PRESET_ROUTES[0].distance);
  const [serviceType, setServiceType] = useState('executive'); // 'executive', 'armored', 'courier'
  const [vehicleChoice, setVehicleChoice] = useState('sedan'); // 'sedan', 'suv', 'grand_tourer'
  const [urgencyTier, setUrgencyTier] = useState('standard'); // 'standard', 'rush', 'tactical'
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Load a preset route
  const handleSelectPreset = (preset) => {
    setPickup(preset.from);
    setDropoff(preset.to);
    setDistance(preset.distance);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Premium Car Rates (NO TRUCKS)
  const rates = {
    sedan: {
      name: 'Mercedes-Maybach / Rolls-Royce Sedan',
      base: 185,
      perMile: 3.8,
      timeMultiplier: 1.1,
      capacity: '3 VIP Guests'
    },
    suv: {
      name: 'Cadillac Escalade-V / G-Wagon SUV',
      base: 210,
      perMile: 4.1,
      timeMultiplier: 1.2,
      capacity: '6 VIP Guests / Escort'
    },
    grand_tourer: {
      name: 'Porsche Panamera / Bentley GT Speed',
      base: 195,
      perMile: 3.9,
      timeMultiplier: 0.95,
      capacity: '2-3 Guests / High-Speed'
    }
  };

  const currentRate = rates[vehicleChoice] || rates.sedan;
  const mileageCost = distance * currentRate.perMile;
  const urgencyMultiplier =
    urgencyTier === 'tactical' ? 1.4 : urgencyTier === 'rush' ? 1.2 : 1.0;

  const totalEstimate = Math.round((currentRate.base + mileageCost) * urgencyMultiplier);
  const estMinutes = Math.round(distance * currentRate.timeMultiplier + 10);

  // Dispatch Action
  const handleLockInQuote = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#09090B', '#D4AF37', '#ffffff']
    });

    onBookWithQuote({
      pickup,
      dropoff,
      distance,
      serviceType,
      vehicleChoice,
      vehicleName: currentRate.name,
      urgencyTier,
      totalEstimate,
      estMinutes
    });
  };

  return (
    <section id="estimator" className="relative py-28 bg-[#F8F9FA] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-200/80 border border-neutral-300 text-neutral-900 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Transparent Charter Rates
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
            Instant Route & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">Charter Estimator</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 font-sans">
            Calculate exact upfront rates for airport FBO tarmac transfers, armed diplomatic convoys, or executive black-car mobility.
          </p>
        </div>

        {/* Preset Routes Carousel */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3 font-semibold">
            Select Executive Corridor:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {PRESET_ROUTES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3.5 rounded-2xl text-left border transition duration-200 ${
                  pickup === preset.from
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <div className={`text-[11px] font-mono font-bold truncate ${pickup === preset.from ? 'text-amber-300' : 'text-neutral-900'}`}>
                  {preset.label.split('→')[0]}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 truncate">
                  → {preset.label.split('→')[1]}
                </div>
                <div className="mt-2 text-[10px] font-mono flex items-center justify-between">
                  <span>{preset.distance} mi</span>
                  <span>{preset.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Estimator Calculator Card */}
        <div className="rounded-3xl bg-white border border-neutral-200 shadow-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left 7 Columns: Form Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pickup & Dropoff Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
                    Pickup Location / Private Aviation FBO
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5 font-semibold">
                    Dropoff Destination
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition"
                    />
                  </div>
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-600 font-semibold">
                    Transit Distance (Miles)
                  </label>
                  <span className="text-sm font-mono font-bold text-neutral-900">
                    {distance} Miles
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="120"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                  <span>3 mi (Airport / Local)</span>
                  <span>50 mi (Regional)</span>
                  <span>120 mi (Interstate)</span>
                </div>
              </div>

              {/* Vehicle Tier Selection (STRICTLY BLACK CARS - NO TRUCKS) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2.5 font-semibold">
                  Vehicle Class (100% Obsidian Fleet)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setVehicleChoice('sedan')}
                    className={`p-4 rounded-2xl border text-left transition duration-200 ${
                      vehicleChoice === 'sedan'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                        : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Car className="w-5 h-5 text-amber-400" />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10">3 Guests</span>
                    </div>
                    <div className="text-xs font-bold">Executive Sedan</div>
                    <div className="text-[11px] opacity-75 mt-0.5">Maybach S680 / Ghost</div>
                    <div className="mt-2 text-xs font-mono font-bold">$185 Base</div>
                  </button>

                  <button
                    onClick={() => setVehicleChoice('suv')}
                    className={`p-4 rounded-2xl border text-left transition duration-200 ${
                      vehicleChoice === 'suv'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                        : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Shield className="w-5 h-5 text-amber-400" />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10">6 Guests</span>
                    </div>
                    <div className="text-xs font-bold">VIP Armored SUV</div>
                    <div className="text-[11px] opacity-75 mt-0.5">Escalade-V / G63 AMG</div>
                    <div className="mt-2 text-xs font-mono font-bold">$210 Base</div>
                  </button>

                  <button
                    onClick={() => setVehicleChoice('grand_tourer')}
                    className={`p-4 rounded-2xl border text-left transition duration-200 ${
                      vehicleChoice === 'grand_tourer'
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                        : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10">Velocity</span>
                    </div>
                    <div className="text-xs font-bold">Grand Tourer</div>
                    <div className="text-[11px] opacity-75 mt-0.5">Panamera Turbo / Bentley</div>
                    <div className="mt-2 text-xs font-mono font-bold">$195 Base</div>
                  </button>
                </div>
              </div>

              {/* Urgency Tier */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2 font-semibold">
                  Dispatch Protocol & Speed
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', label: 'Standard Reserved', sub: 'Scheduled timing' },
                    { id: 'rush', label: 'Rapid Dispatch', sub: '< 15 min mobilization' },
                    { id: 'tactical', label: 'Priority Tactical', sub: '< 10 min + Security detail' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setUrgencyTier(tier.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-mono transition ${
                        urgencyTier === tier.id
                          ? 'bg-neutral-900 text-white border-neutral-900 font-bold'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>{tier.label}</div>
                      <div className="text-[10px] opacity-70 font-normal mt-0.5">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Rate Summary & Lock-In */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Live Rate Breakdown
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-800 text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    GUARANTEED RATE
                  </span>
                </div>

                {/* Estimate Total */}
                <div className="mt-6">
                  <div className="text-xs font-mono uppercase text-neutral-400">Total Charter Estimate</div>
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mt-1">
                    ${totalEstimate}
                    <span className="text-xs text-neutral-400 font-normal ml-2 font-sans">USD</span>
                  </div>
                  <div className="text-xs text-amber-400 mt-1 font-mono">
                    Est. Transit Time: ~{estMinutes} Minutes
                  </div>
                </div>

                {/* Line Item Breakdown */}
                <div className="mt-6 space-y-2.5 font-mono text-xs border-t border-neutral-800 pt-5">
                  <div className="flex justify-between text-neutral-400">
                    <span>Base Vehicle Charter:</span>
                    <span className="text-white">${currentRate.base}.00</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Mileage ({distance} mi @ ${currentRate.perMile}/mi):</span>
                    <span className="text-white">${mileageCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Vehicle Class:</span>
                    <span className="text-white">{currentRate.name.split('/')[0]}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Security & Fuel Surcharge:</span>
                    <span className="text-emerald-400">INCLUDED (0.00)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Liability Insurance:</span>
                    <span className="text-emerald-400">$10,000,000 COVERED</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-neutral-800">
                <button
                  onClick={handleLockInQuote}
                  className="w-full py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-mono text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  <span>Lock In Quote & Reserve</span>
                  <ArrowRight className="w-4 h-4 text-amber-700" />
                </button>
                <p className="text-[11px] text-center text-neutral-400 mt-2 font-mono">
                  No advance cancellation penalty within 2 hours of booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
