/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Truck } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveTicker from "./components/LiveTicker";
import HowItWorks from "./components/HowItWorks";
import ServicesGrid from "./components/ServicesGrid";
import GarageFinder from "./components/GarageFinder";
import CostEstimator from "./components/CostEstimator";
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

const DiagnosticsHUD = React.lazy(() => import("./components/DiagnosticsHUD"));

export default function App() {
  // Toast notifications state
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
  };

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
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
    showToast("Request sent — a verified mechanic will contact you shortly!");
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

        {/* 3b. How It Works Workflow Step Section */}
        <HowItWorks />

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
        <React.Suspense fallback={
          <div className="bg-slate-950 py-16 border-t border-slate-900 flex flex-col items-center justify-center min-h-[300px]">
            <div className="h-8 w-8 border-4 border-signal border-t-transparent rounded-full animate-spin mb-4" />
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">LOADING DIAGNOSTIC CONSOLE...</span>
          </div>
        }>
          <DiagnosticsHUD onBookService={handleBookDiagnosticFix} />
        </React.Suspense>

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
        onSosRequested={(msg) => showToast(msg)}
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

      {/* Floating WhatsApp Click-To-Chat widget */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        href="https://wa.me/254704804578?text=Hi%20mCarFix,%20I%20need%20assistance%20with%20my%20vehicle."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA56] text-white p-3 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group border border-white/10"
        title="Chat on WhatsApp"
      >
        <svg
          className="h-5.5 w-5.5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.706 1.457h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out font-display font-bold text-[9px] uppercase tracking-widest pl-0 group-hover:pl-2 whitespace-nowrap">
          Chat Support
        </span>
      </motion.a>

      {/* Floating Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 bg-slate-950 border border-signal/20 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3.5 max-w-sm"
        >
          <div className="h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <span className="text-emerald-500 font-bold select-none text-xs">✓</span>
          </div>
          <p className="font-sans text-3xs font-light leading-relaxed text-gray-200">
            {toast}
          </p>
        </motion.div>
      )}

    </div>
  );
}
