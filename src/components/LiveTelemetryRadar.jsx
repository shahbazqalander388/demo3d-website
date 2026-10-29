import React, { useState, useEffect } from 'react';
import { Radio, Shield, Navigation, Activity, Thermometer, Lock, Wifi, Compass, Sparkles } from 'lucide-react';

export default function LiveTelemetryRadar() {
  const [activeUnitId, setActiveUnitId] = useState('UNIT-01');
  const [pulse, setPulse] = useState(0);

  // Simulated live fleet telemetry units (100% BLACK CARS - ZERO TRUCKS)
  const fleetUnits = [
    {
      id: 'UNIT-01',
      model: 'Mercedes-Maybach S680 Noir',
      driver: 'Operative #402 (Vetted Chauffeur)',
      status: 'EN ROUTE — VIP ONBOARD',
      speed: 58,
      speedUnit: 'MPH',
      location: 'FDR Drive / Wall St Corridor, NY',
      coords: '40.7061° N, 74.0092° W',
      heading: '284° WNW',
      temp: '68.5°F (CLIMATE STABLE)',
      securityStatus: 'B4 KEVLAR MONOCOQUE',
      satelliteSignal: '100% [STARLINK ENCRYPTED]',
      x: 34,
      y: 42
    },
    {
      id: 'UNIT-02',
      model: 'Cadillac Escalade-V Noir Platinum',
      driver: 'Operative #304 (Security Detail Lead)',
      status: 'TARMAC CONVOY ESCORT',
      speed: 32,
      speedUnit: 'MPH',
      location: 'Atlantic Aviation FBO, LAX Airport',
      coords: '33.9425° N, 118.4081° W',
      heading: '315° NW',
      temp: '69.0°F (REAR SUITE)',
      securityStatus: 'B6 BALLISTIC ACTIVE',
      satelliteSignal: '100% [STARLINK]',
      x: 68,
      y: 35
    },
    {
      id: 'UNIT-03',
      model: 'Mercedes-AMG G63 Black Night',
      driver: 'Operative #118 (Tactical Escort)',
      status: 'VIP PERIMETER PATROL',
      speed: 46,
      speedUnit: 'MPH',
      location: 'Sand Hill Rd, Menlo Park, CA',
      coords: '37.4241° N, 122.1697° W',
      heading: '112° ESE',
      temp: '70.2°F (INTERIOR)',
      securityStatus: 'TACTICAL ESCORT ENGAGED',
      satelliteSignal: '99% [DUAL-SAT]',
      x: 52,
      y: 65
    },
    {
      id: 'UNIT-04',
      model: 'Porsche Panamera Turbo E-Hybrid',
      driver: 'Operative #209 (Priority Courier)',
      status: 'RAPID COURIER CORRIDOR',
      speed: 64,
      speedUnit: 'MPH',
      location: 'Berkeley Square, Mayfair, London',
      coords: '51.5090° N, 0.1465° W',
      heading: '045° NE',
      temp: '67.0°F (VAULT SAFE)',
      securityStatus: 'BIOMETRIC LOCK ENGAGED',
      satelliteSignal: '100% [GEO-BEACON]',
      x: 25,
      y: 68
    }
  ];

  const selectedUnit = fleetUnits.find((u) => u.id === activeUnitId) || fleetUnits[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="telemetry" className="relative py-28 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Sub-Second GPS Telematics
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
              Live Fleet <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-amber-800">Telemetry Radar</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl font-sans">
              Encrypted satellite oversight for clients, security officers, and enterprise mobility managers.
            </p>
          </div>

          {/* Operational Status Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-50 border border-neutral-200 font-mono text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-neutral-600">SATELLITE SYNC:</span>
            <span className="font-bold text-neutral-900">500 MS LATENCY</span>
          </div>
        </div>

        {/* Telemetry Console Container */}
        <div className="rounded-3xl bg-neutral-50 border border-neutral-200 overflow-hidden shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns: Architectural White Radar HUD Map */}
            <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[450px] rounded-2xl bg-white border border-neutral-200 overflow-hidden flex items-center justify-center shadow-inner">
              {/* Radar Concentric Rings */}
              <div className="absolute w-[120px] h-[120px] rounded-full border border-neutral-200" />
              <div className="absolute w-[240px] h-[240px] rounded-full border border-neutral-200" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-neutral-200/60" />
              <div className="absolute w-full h-[1px] bg-neutral-200" />
              <div className="absolute h-full w-[1px] bg-neutral-200" />

              {/* Sweeping Radar Beam */}
              <div
                className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.15) 0deg, transparent 60deg, transparent 360deg)',
                  transform: `rotate(${pulse * 3.6}deg)`
                }}
              />

              {/* Units Positioned on Radar */}
              {fleetUnits.map((u) => {
                const isActive = u.id === selectedUnit.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => setActiveUnitId(u.id)}
                    style={{ left: `${u.x}%`, top: `${u.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-7 h-7 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-neutral-900/15 animate-ping'
                            : 'group-hover:bg-neutral-200'
                        }`}
                      />
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isActive
                            ? 'bg-neutral-900 border-white shadow-md scale-125'
                            : 'bg-neutral-400 border-white group-hover:bg-neutral-700'
                        }`}
                      />
                    </div>
                    {/* Tooltip on Hover / Active */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap transition-all ${
                        isActive
                          ? 'bg-neutral-900 text-white font-bold opacity-100 shadow-sm'
                          : 'bg-white text-neutral-700 border border-neutral-200 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {u.id}
                    </div>
                  </div>
                );
              })}

              {/* Bottom Radar Metrics */}
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-neutral-400">
                ACTIVE GRID: METRO AIR-RAMP SECTOR 04 // 4 UNITS TRACKED
              </div>
            </div>

            {/* Right 5 Columns: Active Vehicle Telemetry Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Unit Designation
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 font-mono">
                      {selectedUnit.id} — {selectedUnit.model.split(' ')[0]}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-900 text-white">
                    {selectedUnit.speed} {selectedUnit.speedUnit}
                  </span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Full Model:</span>
                    <span className="font-semibold text-neutral-900">{selectedUnit.model}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Chauffeur Detail:</span>
                    <span className="font-semibold text-neutral-900">{selectedUnit.driver}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Location:</span>
                    <span className="font-semibold text-neutral-900 truncate max-w-[200px]">{selectedUnit.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Coordinates:</span>
                    <span className="font-semibold text-neutral-900">{selectedUnit.coords}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Heading & Compass:</span>
                    <span className="font-semibold text-neutral-900">{selectedUnit.heading}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Armor Level:</span>
                    <span className="font-semibold text-amber-700">{selectedUnit.securityStatus}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">Telemetry Uplink:</span>
                    <span className="font-semibold text-emerald-600">{selectedUnit.satelliteSignal}</span>
                  </div>
                </div>
              </div>

              {/* Selector Buttons for Units */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {fleetUnits.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setActiveUnitId(u.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      u.id === selectedUnit.id
                        ? 'bg-neutral-900 text-white border-neutral-900 font-bold shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div>{u.id}</div>
                    <div className="text-[10px] opacity-75 truncate">{u.model.split(' ')[0]} {u.model.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
