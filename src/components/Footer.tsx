/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Mail, Phone, MapPin, Car, HelpCircle, ExternalLink, Truck } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenBookings: () => void;
  onOpenSos: () => void;
}

export default function Footer({ onScrollToSection, onOpenBookings, onOpenSos }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-250 text-gray-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-200">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-2xs">
                <Car className="h-5 w-5 text-signal" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider uppercase text-gray-900">
                m<span className="text-signal">Car</span>Fix
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm font-light">
              Bridging the physical and digital automotive repair worlds in Kenya. Bringing data accuracy, transparent pricing, and trusted mechanics to Nairobi drivers.
            </p>
            <button
              onClick={onOpenSos}
              className="mt-2 bg-orange-50 border border-orange-200 text-signal hover:bg-signal hover:text-white px-4 py-2.5 rounded-xl font-display text-2xs font-bold tracking-widest uppercase w-fit transition-all duration-300 flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Truck className="h-3 w-3" />
              <span>Request Roadside Help</span>
            </button>
          </div>

          {/* Column 2: Directory Links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-500 mb-4 border-l-2 border-signal pl-2">
              Directory Directory
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection("garages")}
                  className="text-gray-600 hover:text-signal transition-colors text-left cursor-pointer"
                >
                  Find Certified Garages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("estimator")}
                  className="text-gray-600 hover:text-signal transition-colors text-left cursor-pointer"
                >
                  Cost Estimator Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("diagnostics-info")}
                  className="text-gray-600 hover:text-signal transition-colors text-left cursor-pointer"
                >
                  OBD-II Troubleshooter
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookings}
                  className="text-gray-600 hover:text-signal transition-colors text-left font-mono font-medium flex items-center space-x-1 cursor-pointer"
                >
                  <span>📅 Active Service Reminders</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    alert("mCarFix URL Shortener is active. Shared receipts generated at mcf.co/ref-booking.");
                  }}
                  className="text-gray-600 hover:text-signal transition-colors text-left flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Link Shortener Receipt</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: General Enquiries */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-500 mb-4 border-l-2 border-signal pl-2">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex flex-col space-y-0.5 text-gray-600">
                <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest">General Enquiries</span>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-signal shrink-0" />
                  <span className="font-mono text-2xs tracking-tight">+254 704 804578</span>
                </div>
                <div className="flex items-center space-x-2 pl-5.5">
                  <span className="font-mono text-2xs tracking-tight">enquiries@mcarfix.com</span>
                </div>
              </li>
              <li className="flex flex-col space-y-0.5 text-gray-600">
                <span className="text-[9px] text-gray-400 font-mono uppercase tracking-widest">Technical Support</span>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span className="font-mono text-2xs tracking-tight">+254 704 804932</span>
                </div>
                <div className="flex items-center space-x-2 pl-5.5">
                  <span className="font-mono text-2xs tracking-tight">support@mcarfix.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-2 text-gray-600 pt-1">
                <MapPin className="h-3.5 w-3.5 text-signal shrink-0 mt-0.5" />
                <span className="leading-tight">Global Trade Center, Waiyaki Way-Westlands Road, Nairobi</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner CTA */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gray-500 mb-4 border-l-2 border-signal pl-2">
                Garage Network
              </h4>
              <p className="text-2xs text-gray-600 leading-relaxed font-light mb-4">
                Are you a garage owner in Nairobi looking to receive mCarFix diagnosed vehicle bookings? Partner with us.
              </p>
            </div>
            <button
              onClick={() => {
                alert("mCarFix Partner Portal registration is opening soon. Contact partner-ops@mcarfix.co.ke to register interest.");
              }}
              className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-signal text-gray-700 font-display text-2xs font-bold tracking-wider uppercase py-2.5 px-4 rounded-lg text-center transition-colors cursor-pointer"
            >
              Are you a garage owner?
            </button>
          </div>

        </div>

        {/* Lower row: Copyright, location coordinate, and compliance info */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-2xs text-gray-500 gap-4">
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <p>&copy; {new Date().getFullYear()} mCarFix Kenya Ltd. All rights reserved.</p>
              <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase inline-block">
                Alpha Preview
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-1.5">
              <p className="text-3xs text-gray-500 font-mono uppercase tracking-wider">
                Nairobi Central Node • GPS Ref: 1.2921° S, 36.8219° E
              </p>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <p className="text-3xs text-teal-600 font-mono uppercase tracking-wider font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>450+ garages online</span>
              </p>
            </div>
          </div>

          <div className="flex space-x-4 font-mono uppercase tracking-wider text-3xs">
            <span className="hover:text-signal cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-signal cursor-pointer">Privacy Charter</span>
            <span>•</span>
            <span className="hover:text-signal cursor-pointer">Verified OEM database v2.8</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
