/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Truck } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveTicker from "./components/LiveTicker";
import ServicesGrid from "./components/ServicesGrid";
import GarageFinder from "./components/GarageFinder";
import CostEstimator from "./components/CostEstimator";
import DiagnosticsHUD from "./components/DiagnosticsHUD";
import Testimonials from "./components/Testimonials";
import PartnerBand from "./components/PartnerBand";
import FaqAccordion from "./components/FaqAccordion";
import Footer from "./components/Footer";

// Modals and panels
import BookingModal, { BookingRecord } from "./components/BookingModal";
import SosModal from "./components/SosModal";
import ActiveBookingsPanel from "./components/ActiveBookingsPanel";
import FloatingDock from "./components/FloatingDock";
import { Garage, MOCK_GARAGES } from "./types";

export default function App() {
  // Global Modals State
  const [selectedGarage, setSelectedGarage] = React.useState<Garage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [isSosOpen, setIsSosOpen] = React.useState(false);
  const [isBookingsListOpen, setIsBookingsListOpen] = React.useState(false);

  // Filter State (links services grid selection to garage finder directory)
  const [selectedServiceFilter, setSelectedServiceFilter] = React.useState("");

  // Preselected booking details (from cost estimator or diagnostic simulator)
  const [preselectedService, setPreselectedService] = React.useState("");
  const [preselectedCost, setPreselectedCost] = React.useState("");

  // Bookings list state, persistent via localStorage
  const [bookings, setBookings] = React.useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem("mcarfix_bookings");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookings to local storage on change
  React.useEffect(() => {
    localStorage.setItem("mcarfix_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Add booking handler
  const handleAddBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Clear specific service filter
  const handleClearServiceFilter = () => {
    setSelectedServiceFilter("");
  };

  // Garage book trigger
  const handleBookGarage = (garage: Garage) => {
    setSelectedGarage(garage);
    setPreselectedService("");
    setPreselectedCost("");
    setIsBookingOpen(true);
  };

  // Direct estimate booking trigger
  const handleBookDirect = (serviceTitle: string, estimatedCost: string) => {
    // Determine a fitting default garage depending on service or select the first partner
    const recommendedGarage = MOCK_GARAGES.find(g => g.services.includes(serviceTitle)) || MOCK_GARAGES[0];
    setSelectedGarage(recommendedGarage);
    setPreselectedService(serviceTitle);
    setPreselectedCost(estimatedCost);
    setIsBookingOpen(true);
  };

  // Diagnostic code book trigger
  const handleBookDiagnosticFix = (serviceName: string, notes: string) => {
    // Find garage offering diagnostics
    const recommendedGarage = MOCK_GARAGES.find(g => g.services.includes(serviceName)) || MOCK_GARAGES[0];
    setSelectedGarage(recommendedGarage);
    setPreselectedService(serviceName);
    setPreselectedCost("");
    setIsBookingOpen(true);
    // Note: We can expand booking modal to receive notes or handle notes in preselected state
  };

  return (
    <div className="min-h-screen bg-asphalt text-white font-sans flex flex-col justify-between selection:bg-signal selection:text-asphalt">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenSos={() => setIsSosOpen(true)}
        onScrollToSection={handleScrollToSection}
        activeBookingsCount={bookings.length}
        onOpenBookings={() => setIsBookingsListOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* 2. Interactive Hero Section */}
        <Hero
          onOpenSos={() => setIsSosOpen(true)}
          onOpenDiagnostics={() => handleScrollToSection("diagnostics-info")}
          onScrollToSection={handleScrollToSection}
        />

        {/* 3. Infinite Scrolling Live Ticker strip */}
        <LiveTicker />

        {/* 4. Service Grid (Light Section) */}
        <ServicesGrid
          onSelectServiceFilter={setSelectedServiceFilter}
          onScrollToSection={handleScrollToSection}
        />

        {/* 5. Garage Finder directory (Dark Section) */}
        <GarageFinder
          onBookGarage={handleBookGarage}
          selectedServiceFilter={selectedServiceFilter}
          onClearServiceFilter={handleClearServiceFilter}
        />

        {/* 6. Price Estimator Engine (Light Section) */}
        <CostEstimator onBookDirect={handleBookDirect} />

        {/* 7. OBD-II Troubleshooter console (Dark Section) */}
        <DiagnosticsHUD onBookService={handleBookDiagnosticFix} />

        {/* 8. Drivers Testimonials (Light Section) */}
        <Testimonials />

        {/* 9. Minimalist Trust Partner band */}
        <PartnerBand />

        {/* 10. Frequently Asked Questions Accordion (Light Section) */}
        <FaqAccordion />

        {/* 11. Final Urgency SOS Call-to-Action Bar (Dark) */}
        <section className="bg-asphalt py-16 text-center border-t border-steel/60 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(#eceef2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wider uppercase">
              Get back on the road <span className="text-signal">immediately</span>
            </h2>
            <p className="font-sans text-gray-300 text-sm max-w-xl mx-auto leading-relaxed font-light">
              Don't compromise on automotive safety. Secure a pre-diagnosed certified mechanic slot or trigger immediate roadside flatbed towing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={() => handleScrollToSection("garages")}
                className="w-full sm:w-auto bg-signal text-asphalt hover:bg-signal/90 font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition-all cursor-pointer"
              >
                Book a Mechanic
              </button>
              <button
                onClick={() => setIsSosOpen(true)}
                className="w-full sm:w-auto border-2 border-signal bg-signal text-white hover:bg-transparent hover:text-signal px-8 py-4 rounded-lg font-display text-sm font-bold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg shadow-signal/20"
              >
                <Truck className="h-4.5 w-4.5" />
                <span>Request Roadside Help</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 12. Complete Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenBookings={() => setIsBookingsListOpen(true)}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* ================= MODALS & ACTIVE STATE PANELS ================= */}

      {/* Booking Scheduler Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        garage={selectedGarage}
        preselectedService={preselectedService}
        preselectedCost={preselectedCost}
        onAddBooking={handleAddBooking}
      />

      {/* Emergency SOS Dispatch Tracker */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
      />

      {/* Active Service Reminders Panel */}
      <ActiveBookingsPanel
        isOpen={isBookingsListOpen}
        onClose={() => setIsBookingsListOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      {/* Floating Action Quick Dock */}
      <FloatingDock
        onOpenSos={() => setIsSosOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

    </div>
  );
}
