import React, { useState } from 'react';
import {
  Sliders,
  Check,
  ArrowRight,
  RotateCw,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLEET_MODELS } from '../data/fleetData';
import Vehicle360Viewer from './Vehicle360Viewer';

export default function PorscheConfigurator({
  selectedModelFromParent = null,
  onOpenBookingWithConfig
}) {
  const [selectedModelId, setSelectedModelId] = useState(
    selectedModelFromParent ? selectedModelFromParent.id : 'maybach-s680'
  );
  const [activeTab, setActiveTab] = useState('exterior'); // 'exterior', 'wheels', 'interior', 'packages'
  const [viewAngle, setViewAngle] = useState('exterior'); // 'exterior', 'interior'

  const currentModel =
    FLEET_MODELS.find((m) => m.id === selectedModelId) || FLEET_MODELS[0];

  // Options state
  const [selectedFinish, setSelectedFinish] = useState('gloss');
  const [selectedWheel, setSelectedWheel] = useState('w1');
  const [selectedInterior, setSelectedInterior] = useState('i1');
  const [selectedPackages, setSelectedPackages] = useState(['p1']);

  // Reset or sync when parent passes model
  React.useEffect(() => {
    if (selectedModelFromParent) {
      setSelectedModelId(selectedModelFromParent.id);
    }
  }, [selectedModelFromParent]);

  // Pricing calculation
  const basePriceNum = parseInt(currentModel.priceStarting.replace(/\D/g, ''), 10) || 195;
  const finishExtra =
    currentModel.configuratorOptions.finishes.find((f) => f.id === selectedFinish)?.extra || 0;
  const wheelExtra =
    currentModel.configuratorOptions.wheels.find((w) => w.id === selectedWheel)?.extra || 0;
  const interiorExtra =
    currentModel.configuratorOptions.interiors.find((i) => i.id === selectedInterior)?.extra || 0;
  const packageTotal = selectedPackages.reduce((acc, pId) => {
    const pkg = currentModel.configuratorOptions.packages.find((p) => p.id === pId);
    return acc + (pkg ? pkg.price : 0);
  }, 0);

  const totalCalculatedRate = basePriceNum + finishExtra + wheelExtra + interiorExtra + packageTotal;

  const togglePackage = (pkgId) => {
    setSelectedPackages((prev) =>
      prev.includes(pkgId) ? prev.filter((id) => id !== pkgId) : [...prev, pkgId]
    );
  };

  const handleOrderConfiguration = () => {
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#000000', '#D4AF37', '#ffffff']
    });

    const chosenFinishObj = currentModel.configuratorOptions.finishes.find(
      (f) => f.id === selectedFinish
    );
    const chosenWheelObj = currentModel.configuratorOptions.wheels.find(
      (w) => w.id === selectedWheel
    );
    const chosenInteriorObj = currentModel.configuratorOptions.interiors.find(
      (i) => i.id === selectedInterior
    );
    const chosenPackagesList = selectedPackages.map(
      (id) => currentModel.configuratorOptions.packages.find((p) => p.id === id)?.name
    );

    onOpenBookingWithConfig({
      id: currentModel.id,
      name: `${currentModel.name} (Custom Configured)`,
      categoryName: currentModel.badge,
      baseRate: `$${totalCalculatedRate} / hr`,
      customSpecs: {
        finish: chosenFinishObj?.name,
        wheels: chosenWheelObj?.name,
        interior: chosenInteriorObj?.name,
        packages: chosenPackagesList
      }
    });
  };

  return (
    <section id="configurator" className="py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">
              Porsche-Grade Digital Customizer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight font-sans">
              Car Configurator.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-xl font-sans">
              Build and customize your bespoke all-black executive asset. Select paint lacquer, wheels, rear lounge suite, and ballistic security packages.
            </p>
          </div>

          {/* Model Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-full bg-white border border-neutral-200">
            {FLEET_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModelId(model.id);
                  setSelectedFinish('gloss');
                  setSelectedWheel('w1');
                  setSelectedInterior('i1');
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition whitespace-nowrap ${
                  selectedModelId === model.id
                    ? 'bg-black text-white font-bold'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {model.name.split(' ')[0]} {model.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Main Configurator Split Stage */}
        <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Columns: Dynamic Car Visualizer Stage */}
          <div className="lg:col-span-7 bg-black relative flex flex-col justify-between overflow-hidden min-h-[360px] sm:min-h-[440px] lg:min-h-[620px]">
            {/* Visualizer Content: 360 Interactive Turntable or Static Studio Photo */}
            {viewAngle === '360' ? (
              <div className="absolute inset-0 w-full h-full">
                <Vehicle360Viewer
                  vehicle={currentModel}
                  inline={true}
                  onOpenBooking={handleOrderConfiguration}
                />
              </div>
            ) : (
              <div
                onClick={() => setViewAngle('360')}
                className="absolute inset-0 cursor-pointer group/cfg flex items-center justify-center"
                title="Click to rotate 360° with hand"
              >
                <img
                  src={viewAngle === 'interior' ? currentModel.interiorImage : currentModel.image}
                  alt={currentModel.name}
                  className="w-full h-full object-contain p-3 sm:p-6 object-center transition-all duration-500 filter brightness-95 contrast-105 group-hover/cfg:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/cfg:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-amber-400 text-white flex items-center gap-2 shadow-2xl">
                    <span className="text-sm sm:text-base">🖐️</span>
                    <span className="font-mono text-[11px] sm:text-xs uppercase font-bold text-amber-300">
                      Click to Rotate 360° with Hand
                    </span>
                    <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-spin" />
                  </div>
                </div>
              </div>
            )}

            {/* Top Bar on Visualizer */}
            <div className="relative z-10 p-3 sm:p-6 flex items-center justify-between pointer-events-none gap-2">
              <div>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-white/90 text-black shadow-xs">
                  {currentModel.tag}
                </span>
                <div className="text-[10px] sm:text-xs font-mono text-neutral-300 mt-1 sm:mt-2 truncate max-w-[140px] sm:max-w-none">
                  {currentModel.porscheSpecs.power.split('/')[0]}
                </div>
              </div>

              {/* View Angle Toggle (Exterior / 360 / Interior) */}
              <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 pointer-events-auto">
                <button
                  onClick={() => setViewAngle('exterior')}
                  className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition ${
                    viewAngle === 'exterior'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Exterior
                </button>
                <button
                  onClick={() => setViewAngle('360')}
                  className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition ${
                    viewAngle === '360'
                      ? 'bg-amber-400 text-black font-bold shadow-xs'
                      : 'text-amber-400 hover:text-white'
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>360°</span>
                </button>
                <button
                  onClick={() => setViewAngle('interior')}
                  className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition ${
                    viewAngle === 'interior'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Suite
                </button>
              </div>
            </div>

            {/* Bottom Visualizer Specs & Name */}
            <div className="relative z-10 p-6 md:p-8">
              <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                {currentModel.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-sans mt-0.5">
                {currentModel.name}
              </h3>

              {/* Spec Bar */}
              <div className="mt-4 flex items-center gap-6 text-xs font-mono text-neutral-300">
                <div>
                  <span className="text-neutral-400 text-[10px] block">0-100 KM/H</span>
                  <span className="text-white font-bold">{currentModel.porscheSpecs.acceleration}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/20" />
                <div>
                  <span className="text-neutral-400 text-[10px] block">POWER</span>
                  <span className="text-white font-bold">{currentModel.porscheSpecs.power.split('/')[0]}</span>
                </div>
                <div className="w-[1px] h-6 bg-white/20" />
                <div>
                  <span className="text-neutral-400 text-[10px] block">TOP SPEED</span>
                  <span className="text-white font-bold">{currentModel.porscheSpecs.topSpeed.split('(')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Porsche Options & Pricing Panel */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-neutral-200">
            <div>
              {/* Category Options Navigation */}
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 overflow-x-auto no-scrollbar">
                {[
                  { id: 'exterior', label: 'Exterior Paint' },
                  { id: 'wheels', label: 'Wheels' },
                  { id: 'interior', label: 'Interior Suite' },
                  { id: 'packages', label: 'Security Packs' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-black text-white font-bold'
                        : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: EXTERIOR PAINT FINISH */}
              {activeTab === 'exterior' && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 font-bold mb-2">
                    Obsidian Paint Lacquer
                  </div>
                  {currentModel.configuratorOptions.finishes.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        selectedFinish === f.id
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full border border-neutral-400 ${
                            f.id === 'matte' ? 'bg-zinc-800' : 'bg-black'
                          }`}
                        />
                        <div>
                          <div className="text-xs font-bold text-neutral-900">{f.name}</div>
                          <div className="text-[10px] font-mono text-neutral-500">
                            {f.extra === 0 ? 'Standard Specification' : `+$${f.extra} / hr`}
                          </div>
                        </div>
                      </div>
                      {selectedFinish === f.id && <Check className="w-4 h-4 text-black shrink-0" />}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: WHEELS */}
              {activeTab === 'wheels' && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 font-bold mb-2">
                    Alloy Rims & Performance Wheels
                  </div>
                  {currentModel.configuratorOptions.wheels.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWheel(w.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        selectedWheel === w.id
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900">{w.name}</div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {w.extra === 0 ? 'Standard Specification' : `+$${w.extra} / hr`}
                        </div>
                      </div>
                      {selectedWheel === w.id && <Check className="w-4 h-4 text-black shrink-0" />}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: INTERIOR SUITE */}
              {activeTab === 'interior' && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 font-bold mb-2">
                    Upholstery & Luxury Appointments
                  </div>
                  {currentModel.configuratorOptions.interiors.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => {
                        setSelectedInterior(i.id);
                        setViewAngle('interior');
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        selectedInterior === i.id
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900">{i.name}</div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {i.extra === 0 ? 'Standard Specification' : `+$${i.extra} / hr`}
                        </div>
                      </div>
                      {selectedInterior === i.id && <Check className="w-4 h-4 text-black shrink-0" />}
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: PACKAGES */}
              {activeTab === 'packages' && (
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 font-bold mb-2">
                    Security, Tarmac & Technology Packs
                  </div>
                  {currentModel.configuratorOptions.packages.map((pkg) => {
                    const isChecked = selectedPackages.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                          isChecked
                            ? 'border-black bg-neutral-50 shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900">{pkg.name}</div>
                          <div className="text-[10px] font-mono text-emerald-600 font-medium">
                            +${pkg.price} / hr
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                            isChecked ? 'bg-black border-black text-white' : 'border-neutral-300'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dynamic Price Summary & Action */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-400">
                    Bespoke Configured Rate
                  </div>
                  <div className="text-3xl font-black font-mono text-black">
                    ${totalCalculatedRate}
                    <span className="text-xs text-neutral-500 font-normal ml-1">/ hour</span>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-emerald-600 font-semibold">
                  ✓ Instant Mobilization Ready
                </div>
              </div>

              <button
                onClick={handleOrderConfiguration}
                className="w-full py-4 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
              >
                <span>Reserve This Configuration</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
