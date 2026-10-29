import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PorscheModelRange from './components/PorscheModelRange';
import PorscheConfigurator from './components/PorscheConfigurator';
import CoreServices from './components/CoreServices';
import QuoteEstimator from './components/QuoteEstimator';
import PorscheFinder from './components/PorscheFinder';
import LiveTelemetryRadar from './components/LiveTelemetryRadar';
import TrustMetrics from './components/TrustMetrics';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);
  const [configuratorTargetModel, setConfiguratorTargetModel] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingInitialData(null);
  };

  const handleSelectForConfigurator = (model) => {
    setConfiguratorTargetModel(model);
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToModels = () => {
    const el = document.getElementById('models');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white antialiased">
      {/* Porsche Canada Inspired Persistent Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenConfigurator={() => {
          const el = document.getElementById('configurator');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Full-Bleed Cinematic Hero Section */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        onExploreFleet={scrollToModels}
      />

      {/* Porsche Signature "Models." Grid Section */}
      <PorscheModelRange
        onOpenBooking={handleOpenBooking}
        onSelectForConfigurator={handleSelectForConfigurator}
      />

      {/* Porsche Digital "Car Configurator" (Build & Price) */}
      <PorscheConfigurator
        selectedModelFromParent={configuratorTargetModel}
        onOpenBookingWithConfig={handleOpenBooking}
      />

      {/* Bespoke Mobility Services */}
      <CoreServices onOpenBooking={handleOpenBooking} />

      {/* Interactive Corridor & Rate Estimator */}
      <QuoteEstimator onBookWithQuote={handleOpenBooking} />

      {/* Privé Centres & FBO Tarmac Ramp Locator */}
      <PorscheFinder onOpenBooking={handleOpenBooking} />

      {/* Sub-Second Satellite Radar Telematics */}
      <LiveTelemetryRadar />

      {/* Engineering Standards & Operational Rigor */}
      <TrustMetrics />

      {/* Client Discretion Endorsements */}
      <Testimonials />

      {/* Porsche Canada Minimalist Clean Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* VIP Charter Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingInitialData}
      />
    </div>
  );
}
