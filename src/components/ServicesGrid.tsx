/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as Icons from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "../types";

interface ServicesGridProps {
  onSelectServiceFilter: (serviceName: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function ServicesGrid({ onSelectServiceFilter, onScrollToSection }: ServicesGridProps) {
  // Dynamic icon renderer helper
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="h-6 w-6 text-signal" />;
    }
    return <Icons.Wrench className="h-6 w-6 text-signal" />;
  };

  const handleServiceClick = (serviceTitle: string) => {
    onSelectServiceFilter(serviceTitle);
    onScrollToSection("garages");
  };

  return (
    <section id="services" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full">
            Our Offerings
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-gray-900">
            Comprehensive Car Services in Nairobi
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed">
            Choose from our highly specialized network of mechanics and auto-care service centers. Click on any category below to immediately discover verified garages offering that service near you.
          </p>
        </div>

        {/* 8-Card Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => {
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.title)}
                className="bg-white border border-gray-200/80 rounded-xl p-6 transition-all duration-300 hover:border-signal/50 hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Icon Box */}
                  <div className="bg-gray-50 border border-gray-100 p-3.5 rounded-lg w-fit mb-5 transition-transform duration-300 group-hover:scale-110">
                    {renderIcon(service.iconName)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-gray-900 mb-2.5">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Card footer indicator */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-medium text-gray-400 group-hover:text-signal transition-colors">
                  <span>Explore Garages</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Diagnostics CTA Bar */}
        <div className="mt-14 bg-gray-50 text-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-lg border border-gray-200 shrink-0 shadow-xs">
              <Icons.Activity className="h-6 w-6 text-teal-600 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold tracking-wider uppercase text-gray-900">
                Unsure why your vehicle is acting up?
              </h4>
              <p className="font-sans text-xs text-gray-600 mt-1 max-w-xl">
                Run our interactive OBD-II troubleshoot simulator. Enter your dashboard signs or symptoms to decode error logs and find localized fixes.
              </p>
            </div>
          </div>
          <button
            onClick={() => onScrollToSection("diagnostics-info")}
            className="w-full md:w-auto bg-white border border-teal-600 hover:bg-teal-50/50 text-teal-700 font-display font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm transition-all shadow-xs"
          >
            Run Troubleshooting Guide
          </button>
        </div>

      </div>
    </section>
  );
}
