/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Handshake, ShieldAlert, Award } from "lucide-react";

export default function PartnerBand() {
  const partners = [
    { name: "AA KENYA", subtitle: "Emergency Towing & Safety" },
    { name: "TOTALENERGIES KENYA", subtitle: "Certified Lube Partners" },
    { name: "KCB BANK GROUP", subtitle: "Instant Asset Financing" },
    { name: "JUBILEE INSURANCE", subtitle: "Instant Motor Covers" },
  ];

  return (
    <section id="partner" className="bg-gray-50 py-10 text-gray-900 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header line */}
        <div className="flex items-center justify-center space-x-2 text-center mb-8">
          <Award className="h-4 w-4 text-teal-600" />
          <span className="font-mono text-3xs text-gray-500 uppercase tracking-widest">
            TRUSTED BY KENYA'S LEADING AUTOMOTIVE INFRASTRUCTURE
          </span>
        </div>

        {/* Corporate Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {partners.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 hover:border-signal/20 px-5 py-4 rounded-2xl text-center transition-all duration-300 hover:shadow-xs"
            >
              {/* Partner Logo Representation */}
              <div className="font-display font-extrabold text-base tracking-wider text-gray-800">
                {p.name}
              </div>
              
              {/* Partner Subtitle */}
              <div className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                {p.subtitle}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
