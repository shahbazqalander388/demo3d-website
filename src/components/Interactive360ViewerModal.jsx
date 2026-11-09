import React, { useEffect } from 'react';
import { X, Sliders, ArrowRight } from 'lucide-react';
import Vehicle360Viewer from './Vehicle360Viewer';

export default function Interactive360ViewerModal({
  isOpen,
  vehicle,
  onClose,
  onOpenBooking,
  onOpenConfigurator
}) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Stage */}
      <div className="relative z-10 w-full max-w-6xl h-[96vh] sm:h-[94vh] max-h-[880px] rounded-2xl sm:rounded-3xl bg-neutral-950 border border-neutral-800 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="p-3 sm:p-6 border-b border-neutral-800/80 bg-neutral-950 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase font-bold tracking-wider bg-amber-400 text-black">
                {vehicle.badge || 'Obsidian Flagship'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline">
                Interactive 360° Studio
              </span>
            </div>
            <h2 className="text-base sm:text-2xl lg:text-3xl font-black text-white font-sans tracking-tight truncate max-w-[220px] sm:max-w-none">
              {vehicle.name}
            </h2>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {onOpenConfigurator && (
              <button
                onClick={() => {
                  onClose();
                  onOpenConfigurator(vehicle);
                }}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Configure</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition"
              title="Close 360 Studio (ESC)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 360 Viewport Stage */}
        <div className="flex-1 relative overflow-hidden bg-black">
          <Vehicle360Viewer
            vehicle={vehicle}
            inline={true}
            showModeSwitch={true}
            onOpenBooking={onOpenBooking}
            onOpenConfigurator={onOpenConfigurator}
          />
        </div>

        {/* Modal Footer Specs & Booking Bar */}
        <div className="p-2.5 sm:p-5 border-t border-neutral-800/80 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shrink-0">
          {/* Quick Technical Specs */}
          <div className="flex items-center gap-3 sm:gap-8 text-[10px] sm:text-xs font-mono text-neutral-400 overflow-x-auto no-scrollbar w-full sm:w-auto justify-between sm:justify-start">
            {vehicle.porscheSpecs ? (
              <>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase block">0-100</span>
                  <span className="text-white font-bold">{vehicle.porscheSpecs.acceleration}</span>
                </div>
                <div className="w-[1px] h-5 sm:h-6 bg-neutral-800" />
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase block">Power</span>
                  <span className="text-white font-bold">{vehicle.porscheSpecs.power.split('/')[0]}</span>
                </div>
                <div className="w-[1px] h-5 sm:h-6 bg-neutral-800" />
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase block">Top Speed</span>
                  <span className="text-white font-bold">{vehicle.porscheSpecs.topSpeed.split('(')[0]}</span>
                </div>
              </>
            ) : vehicle.stats ? (
              <>
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase block">Sprint</span>
                  <span className="text-white font-bold">{vehicle.stats.acceleration}</span>
                </div>
                <div className="w-[1px] h-5 sm:h-6 bg-neutral-800" />
                <div>
                  <span className="text-[9px] sm:text-[10px] text-neutral-500 uppercase block">Power</span>
                  <span className="text-white font-bold">{vehicle.stats.power}</span>
                </div>
              </>
            ) : null}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking(vehicle);
              }}
              className="flex-1 sm:flex-initial px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>Reserve & Charter</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
