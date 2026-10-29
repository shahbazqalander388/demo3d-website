import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreServices from './components/CoreServices';
import FleetShowcase from './components/FleetShowcase';
import QuoteEstimator from './components/QuoteEstimator';
import LiveTelemetryRadar from './components/LiveTelemetryRadar';
import TrustMetrics from './components/TrustMetrics';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingInitialData(null);
  };

  const scrollToFleet = () => {
    const el = document.getElementById('fleet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Sticky Glassmorphic Navbar (White Luxury Theme) */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section with Architectural 3D WebGL Black Car Studio */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        onExploreFleet={scrollToFleet}
      />

      {/* Core Bespoke VIP Mobility Services */}
      <CoreServices onOpenBooking={handleOpenBooking} />

      {/* The All-Black Fleet Interactive Showcase (100% Black Cars - No Trucks) */}
      <FleetShowcase onOpenBooking={handleOpenBooking} />

      {/* Interactive Charter Route & Quote Estimator */}
      <QuoteEstimator onBookWithQuote={handleOpenBooking} />

      {/* Live GPS Fleet Telemetry Radar Console */}
      <LiveTelemetryRadar />

      {/* Verified Safety Standards & Why Choose Us */}
      <TrustMetrics />

      {/* Client Endorsements & Strict Confidentiality Covenant */}
      <Testimonials />

      {/* Luxury White Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Booking & VIP Dispatch Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingInitialData}
      />
    </div>
  );
}
