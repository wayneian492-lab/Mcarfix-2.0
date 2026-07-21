/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, AlertTriangle, Menu, X, Car, Truck } from "lucide-react";

interface NavbarProps {
  onOpenSos: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeBookingsCount: number;
  onOpenBookings: () => void;
}

export default function Navbar({ onOpenSos, onScrollToSection, activeBookingsCount, onOpenBookings }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 text-gray-900 transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => onScrollToSection("hero")}>
            <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
              <Car className="h-6 w-6 text-signal" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider uppercase text-gray-900">
              m<span className="text-signal">Car</span>Fix
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onScrollToSection("services")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-600 hover:text-signal transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => onScrollToSection("garages")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-600 hover:text-signal transition-colors duration-200"
            >
              Garages
            </button>
            <button
              onClick={() => onScrollToSection("estimator")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-600 hover:text-signal transition-colors duration-200"
            >
              Pricing Estimator
            </button>
            <button
              onClick={() => onScrollToSection("diagnostics-info")}
              className="font-display font-medium tracking-wide text-sm uppercase text-gray-600 hover:text-signal transition-colors duration-200"
            >
              Diagnostics
            </button>
          </div>

          {/* Contact & SOS */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="h-4 w-4 text-signal" />
              <span className="font-mono text-sm tracking-tight font-medium hover:text-gray-900 transition-colors cursor-pointer">
                +254 700 000 999
              </span>
            </div>
            {activeBookingsCount > 0 && (
              <button
                onClick={onOpenBookings}
                className="relative bg-gray-100 border border-gray-200 hover:border-signal/50 text-gray-800 px-4 py-2 rounded-lg text-xs font-mono tracking-tight transition-all"
              >
                Bookings ({activeBookingsCount})
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-signal rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-signal rounded-full" />
              </button>
            )}
            <button
              onClick={onOpenSos}
              className="bg-signal text-white px-5 py-2.5 rounded-xl font-display text-sm font-bold tracking-wider uppercase flex items-center space-x-2 hover:bg-signal/90 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg shadow-signal/15"
            >
              <Truck className="h-4 w-4" />
              <span>Roadside Help</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {activeBookingsCount > 0 && (
              <button
                onClick={onOpenBookings}
                className="relative bg-gray-100 border border-gray-200 p-2 rounded-lg text-xs font-mono text-gray-800"
              >
                <span>📅 {activeBookingsCount}</span>
              </button>
            )}
            <button
              onClick={onOpenSos}
              className="bg-signal text-white p-2.5 rounded-xl text-xs flex items-center hover:bg-signal/90 transition-all duration-300 shadow-md"
            >
              <Truck className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3 shadow-md">
          <button
            onClick={() => {
              onScrollToSection("services");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-700 py-2 border-b border-gray-100"
          >
            Services
          </button>
          <button
            onClick={() => {
              onScrollToSection("garages");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-700 py-2 border-b border-gray-100"
          >
            Garages
          </button>
          <button
            onClick={() => {
              onScrollToSection("estimator");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-700 py-2 border-b border-gray-100"
          >
            Pricing Estimator
          </button>
          <button
            onClick={() => {
              onScrollToSection("diagnostics-info");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left font-display text-base font-bold uppercase tracking-wider text-gray-700 py-2"
          >
            Diagnostics OBD
          </button>
          <div className="pt-2 flex flex-col space-y-3">
            <div className="flex items-center space-x-2 text-gray-500 px-1 py-1">
              <Phone className="h-4 w-4 text-signal" />
              <span className="font-mono text-sm tracking-tight">+254 700 000 999</span>
            </div>
            <button
              onClick={() => {
                onOpenSos();
                setIsMenuOpen(false);
              }}
              className="w-full bg-signal text-white py-3.5 rounded-xl font-display font-bold tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md hover:bg-signal/95 transition-all duration-300"
            >
              <Truck className="h-4 w-4" />
              <span>ROADSIDE HELP</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
