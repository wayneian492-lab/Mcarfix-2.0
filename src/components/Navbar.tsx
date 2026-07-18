/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, AlertTriangle, Menu, X, Car } from "lucide-react";

interface NavbarProps {
  onOpenSos: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeBookingsCount: number;
  onOpenBookings: () => void;
}

export default function Navbar({ onOpenSos, onScrollToSection, activeBookingsCount, onOpenBookings }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 bg-asphalt/95 backdrop-blur-md border-b border-steel/60 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => onScrollToSection("hero")}>
            <div className="p-2 bg-steel border border-steel-light rounded-lg">
              <Car className="h-6 w-6 text-signal" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider uppercase text-white">
              m<span className="text-signal">Car</span>Fix
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onScrollToSection("services")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-300 hover:text-signal transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => onScrollToSection("garages")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-300 hover:text-signal transition-colors duration-200"
            >
              Garages
            </button>
            <button
              onClick={() => onScrollToSection("estimator")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-300 hover:text-signal transition-colors duration-200"
            >
              Pricing Estimator
            </button>
            <button
              onClick={() => onScrollToSection("diagnostics-info")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-300 hover:text-signal transition-colors duration-200"
            >
              Diagnostics
            </button>
          </div>

          {/* Contact & SOS */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <Phone className="h-4 w-4 text-signal" />
              <span className="font-mono text-sm tracking-tight font-medium hover:text-white transition-colors cursor-pointer">
                +254 700 000 999
              </span>
            </div>
            {activeBookingsCount > 0 && (
              <button
                onClick={onOpenBookings}
                className="relative bg-steel/80 border border-steel/60 hover:border-signal/50 px-4 py-2 rounded-lg text-xs font-mono tracking-tight transition-all"
              >
                Bookings ({activeBookingsCount})
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-signal rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-signal rounded-full" />
              </button>
            )}
            <button
              onClick={onOpenSos}
              className="pulse-red bg-warning text-white px-5 py-2.5 rounded-lg font-display text-sm font-bold tracking-wider uppercase flex items-center space-x-2 transition-all cursor-pointer"
            >
              <AlertTriangle className="h-4 w-4 animate-bounce" />
              <span>Emergency SOS</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {activeBookingsCount > 0 && (
              <button
                onClick={onOpenBookings}
                className="relative bg-steel/80 p-2 rounded-lg text-xs font-mono"
              >
                <span>📅 {activeBookingsCount}</span>
              </button>
            )}
            <button
              onClick={onOpenSos}
              className="bg-warning text-white p-2 rounded-lg text-xs flex items-center"
            >
              <AlertTriangle className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-asphalt border-t border-steel px-4 pt-2 pb-4 space-y-3">
          <button
            onClick={() => {
              onScrollToSection("services");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-300 py-2 border-b border-steel/40"
          >
            Services
          </button>
          <button
            onClick={() => {
              onScrollToSection("garages");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-300 py-2 border-b border-steel/40"
          >
            Garages
          </button>
          <button
            onClick={() => {
              onScrollToSection("estimator");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-300 py-2 border-b border-steel/40"
          >
            Pricing Estimator
          </button>
          <button
            onClick={() => {
              onScrollToSection("diagnostics-info");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-300 py-2"
          >
            Diagnostics OBD
          </button>
          <div className="pt-2 flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-gray-400 px-1 py-1">
              <Phone className="h-4 w-4 text-signal" />
              <span className="font-mono text-sm tracking-tight">+254 700 000 999</span>
            </div>
            <button
              onClick={() => {
                onOpenSos();
                setIsMenuOpen(false);
              }}
              className="w-full bg-warning text-white py-3 rounded-lg font-display font-bold tracking-wider uppercase flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>EMERGENCY SOS</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
