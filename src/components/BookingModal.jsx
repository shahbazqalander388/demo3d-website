import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calendar,
  User,
  Phone,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BRAND_INFO, FLEET_VEHICLES } from '../data/fleetData';

export default function BookingModal({ isOpen, onClose, initialData = null }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: 'Executive Chauffeur Transit',
    vehicleId: 'sedan-maybach-noir',
    pickup: 'JFK International Airport (Private Aviation FBO), Queens, NY',
    dropoff: 'Wall Street Financial Center, Manhattan, NY',
    date: '2026-10-30',
    time: '14:30',
    name: 'Executive Passenger',
    email: 'client@enterprise.com',
    phone: '+1 (555) 019-2834',
    specialRequests: ['Tarmac FBO Ramp Access', 'Strict NDA Protocol', 'Encrypted Wi-Fi'],
    estimatedRate: '$380'
  });

  const [copiedTracking, setCopiedTracking] = useState(false);
  const [dispatchTicketId, setDispatchTicketId] = useState('');

  // Sync initialData if passed
  useEffect(() => {
    if (initialData) {
      if (initialData.name) {
        setFormData((prev) => ({
          ...prev,
          vehicleId: initialData.id,
          serviceType: initialData.categoryName,
          estimatedRate: initialData.baseRate
        }));
      } else if (initialData.totalEstimate) {
        setFormData((prev) => ({
          ...prev,
          pickup: initialData.pickup || prev.pickup,
          dropoff: initialData.dropoff || prev.dropoff,
          estimatedRate: `$${initialData.totalEstimate}`
        }));
      }
    }
  }, [initialData]);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const randomTicket = `VNT-${Math.floor(100000 + Math.random() * 900000)}`;
    setDispatchTicketId(randomTicket);
    setStep(3);

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#09090B', '#D4AF37', '#ffffff']
    });
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(dispatchTicketId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const toggleSpecialRequest = (req) => {
    setFormData((prev) => {
      const exists = prev.specialRequests.includes(req);
      return {
        ...prev,
        specialRequests: exists
          ? prev.specialRequests.filter((r) => r !== req)
          : [...prev.specialRequests, req]
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-neutral-200 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 text-neutral-900">
        {/* Top Header Bar */}
        <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                Bespoke Charter Desk
              </div>
              <h3 className="text-lg font-bold text-neutral-900 font-sans">
                {step === 3 ? 'Dispatch Confirmation Voucher' : 'Reserve All-Black Executive Fleet'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-500 hover:text-neutral-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-6 py-3 bg-neutral-100/60 border-b border-neutral-200 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}>
                Route & Obsidian Asset
              </span>
            </div>

            <div className="w-12 h-[1px] bg-neutral-300" />

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-neutral-900 font-semibold' : 'text-neutral-500'}>
                VIP Passenger Manifest
              </span>
            </div>
          </div>
        )}

        {/* STEP 1: ROUTE & VEHICLE CONFIGURATION */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-2 font-semibold">
                Select Assigned Black Car
              </label>
              <select
                value={formData.vehicleId}
                onChange={(e) => {
                  const sel = FLEET_VEHICLES.find((v) => v.id === e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    vehicleId: e.target.value,
                    serviceType: sel?.categoryName || prev.serviceType,
                    estimatedRate: sel?.baseRate || prev.estimatedRate
                  }));
                }}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs font-mono focus:border-neutral-900 focus:outline-none"
              >
                {FLEET_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.categoryName} ({v.baseRate.split('(')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-neutral-900" /> Pickup Point / FBO
                </label>
                <input
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  placeholder="Street Address, Terminal, or FBO Ramp"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" /> Destination
                </label>
                <input
                  type="text"
                  value={formData.dropoff}
                  onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  placeholder="Drop-off Address or Hotel"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" /> Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" /> Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none font-mono"
                  required
                />
              </div>
            </div>

            {/* Protocols */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 mb-2 font-semibold">
                Specialized Security & Chauffeur Protocols
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  'Tarmac FBO Ramp Access',
                  'Strict NDA Protocol',
                  'Armed Escort Qualified',
                  'Starlink Encrypted Wi-Fi',
                  'Acoustic Privacy Partition',
                  'White-Glove Valuables Custody'
                ].map((protocol) => {
                  const checked = formData.specialRequests.includes(protocol);
                  return (
                    <div
                      key={protocol}
                      onClick={() => toggleSpecialRequest(protocol)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        checked
                          ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <span className="truncate">{protocol}</span>
                      {checked && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-neutral-200">
              <div>
                <div className="text-[10px] font-mono uppercase text-neutral-500">Estimated Rate</div>
                <div className="text-xl font-bold font-mono text-neutral-900">
                  {formData.estimatedRate}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md"
              >
                <span>Continue to Passenger Manifest</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CLIENT MANIFEST & CONTACT */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                  <User className="w-3.5 h-3.5 text-neutral-900" /> Lead Passenger / Officer Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-amber-700" /> Encrypted Email Confirmation
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 mb-1.5 flex items-center gap-1.5 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" /> Direct Mobile (SMS Telemetry)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 font-mono text-xs">
                <div className="text-[11px] font-bold uppercase text-neutral-900 pb-1 border-b border-neutral-200">
                  Mission Dispatch Summary
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Assigned Vehicle:</span>
                  <span className="text-neutral-900 font-semibold">
                    {FLEET_VEHICLES.find((v) => v.id === formData.vehicleId)?.name || 'Executive Black Car'}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Transit Route:</span>
                  <span className="text-neutral-900 truncate max-w-[260px]">
                    {formData.pickup.split(',')[0]} → {formData.dropoff.split(',')[0]}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Date & Departure:</span>
                  <span className="text-neutral-900">
                    {formData.date} at {formData.time}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700 pt-1">
                  <span>Primary Liability:</span>
                  <span>$10,000,000 Comprehensive Included</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-700 hover:text-neutral-900"
              >
                Back
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Confirm & Dispatch Chauffeur</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: DIGITAL CONFIRMATION PASS */}
        {step === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">
                Mobilization Confirmed
              </div>
              <h3 className="text-2xl font-black text-neutral-900 font-sans mt-1">
                Executive Black Car Dispatched
              </h3>
              <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto font-sans">
                Our operations command has assigned your vetted chauffeur and obsidian vehicle. An encrypted live telemetry voucher has been sent to{' '}
                <span className="text-neutral-900 font-mono font-bold">{formData.email}</span>.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left max-w-md mx-auto space-y-3 font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <span className="text-neutral-500 uppercase text-[10px] font-bold">Dispatch Voucher Token</span>
                <button
                  onClick={handleCopyTicket}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-neutral-200 text-[10px] text-neutral-700 hover:text-neutral-900 shadow-xs"
                >
                  {copiedTracking ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTracking ? 'Copied' : 'Copy Voucher'}</span>
                </button>
              </div>

              <div className="text-center py-2">
                <div className="text-2xl font-bold tracking-widest text-neutral-900">{dispatchTicketId}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">AES-256 SATELLITE TELEMATICS ACTIVE</div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 text-[11px]">
                <div>
                  <span className="text-neutral-500 block">Lead Passenger:</span>
                  <span className="text-neutral-900 font-semibold">{formData.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Mobilization Status:</span>
                  <span className="text-emerald-600 font-semibold">STANDBY (&lt; 10 MIN)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white font-mono text-xs uppercase tracking-wider transition font-semibold"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
