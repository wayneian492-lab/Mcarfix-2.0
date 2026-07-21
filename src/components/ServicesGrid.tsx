/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as Icons from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "../types";
import { motion } from "motion/react";

import serviceDiagnosticsImg from "../assets/images/service_diagnostics_new_1784617553637.jpg";
import serviceRoadsideImg from "../assets/images/service_roadside_1784615967497.jpg";
import serviceSparePartsImg from "../assets/images/service_spare_parts_new_1784617522364.jpg";
import serviceTowingImg from "../assets/images/service_towing_1784615981815.jpg";
import serviceMechanicsImg from "../assets/images/service_mechanics_new_1784617568316.jpg";
import serviceTyreBatteryImg from "../assets/images/service_tyre_battery_new_1784617536519.jpg";
import serviceCarwashImg from "../assets/images/service_car_wash_new_1784617495226.jpg";
import serviceInsuranceImg from "../assets/images/service_insurance_new_1784617510250.jpg";

interface ServicesGridProps {
  onSelectServiceFilter: (serviceName: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

// Map service IDs to code tags and imagery
const SERVICE_METADATA: Record<string, { code: string; image?: string; isFeatured: boolean }> = {
  "general-mechanics": { code: "MECH.01", image: serviceMechanicsImg, isFeatured: true },
  "roadside-assistance": { code: "EMER.02", image: serviceRoadsideImg, isFeatured: true },
  "professional-towing": { code: "TOW.03", image: serviceTowingImg, isFeatured: true },
  "computer-diagnostics": { code: "DIAG.04", image: serviceDiagnosticsImg, isFeatured: true },
  "genuine-spare-parts": { code: "OEM.05", image: serviceSparePartsImg, isFeatured: true },
  "tyre-battery-center": { code: "PWR.06", image: serviceTyreBatteryImg, isFeatured: true },
  "premium-car-wash": { code: "DETL.07", image: serviceCarwashImg, isFeatured: true },
  "motor-insurance": { code: "INS.08", image: serviceInsuranceImg, isFeatured: true },
};

export default function ServicesGrid({ onSelectServiceFilter, onScrollToSection }: ServicesGridProps) {
  // Dynamic icon renderer helper
  const renderIcon = (iconName: string, className = "h-6 w-6 text-signal") => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Wrench className={className} />;
  };

  const handleServiceClick = (serviceTitle: string) => {
    onSelectServiceFilter(serviceTitle);
    onScrollToSection("garages");
  };

  return (
    <section id="services" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-triggered Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 overflow-hidden"
        >
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span>SYS.OFFERINGS</span>
          </span>
          <motion.h2 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase text-gray-900"
          >
            Comprehensive Car Services in Nairobi
          </motion.h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <motion.p 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="font-sans text-gray-600 mt-4 leading-relaxed font-light"
          >
            Choose from our highly specialized network of mechanics and auto-care service centers. Click on any category below to immediately discover verified garages offering that service near you.
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service: ServiceItem, index: number) => {
            const meta = SERVICE_METADATA[service.id] || { code: "SYS.00", isFeatured: false };

            if (meta.isFeatured && meta.image) {
              // FEATURED TILE WITH BACKGROUND PHOTO
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => handleServiceClick(service.title)}
                  className="col-span-1 md:col-span-2 lg:col-span-2 h-[340px] md:h-[380px] relative overflow-hidden rounded-2xl group cursor-pointer border border-gray-200/50 hover:border-signal/50 hover:shadow-2xl transition-all duration-500"
                >
                  {/* Photo Background */}
                  <img
                    src={meta.image}
                    alt={
                      service.id === "general-mechanics"
                        ? "A highly experienced diesel and petrol engine mechanic operating heavy machinery and rebuilding car engine components in a modern Nairobi workshop"
                        : service.id === "computer-diagnostics"
                        ? "Professional mechanics executing computerized diagnostic OBD-II fault scan using high-precision digital tablets inside a modern Nairobi garage"
                        : service.id === "genuine-spare-parts"
                        ? "A clean studio showcase of verified OEM car spare parts including high-performance batteries, alternators, brakes, and spark plugs for Nairobi drivers"
                        : service.id === "professional-towing"
                        ? "A heavy-duty flatbed tow truck transporting an off-road 4x4 SUV vehicle securely along a tree-lined highway in Nairobi"
                        : service.id === "tyre-battery-center"
                        ? "Premium Apollo brand tires mounted on elegant alloy rims displayed alongside durable Willard batteries in a modern tire bay center"
                        : service.id === "premium-car-wash"
                        ? "A professional auto detailing studio where a specialist is washing a modern red sports coupe with thick active snow foam inside a clean, high-contrast spotlighted bay"
                        : service.id === "motor-insurance"
                        ? "A sleek red car in a modern presentation hall with a premium leather-bound motor insurance policy folder displaying custom coverage options"
                        : "Immediate roadside assistance towing vehicle and emergency dynamic mechanics dispatching along Waiyaki Way, Nairobi"
                    }
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-black/30 z-10" />

                  {/* Content Overlays */}
                  <motion.div 
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
                    className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white"
                  >
                    {/* Header tags */}
                    <div className="flex justify-between items-center">
                      <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-signal flex items-center space-x-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                        <span>{meta.code}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-teal-400 uppercase bg-teal-400/10 border border-teal-400/25 px-2.5 py-1 rounded-full">
                        FEATURED SYSTEM
                      </span>
                    </div>

                    {/* Footer Details */}
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-signal/20 backdrop-blur-xs border border-signal/40 p-3 rounded-2xl">
                          {renderIcon(service.iconName, "h-7 w-7 text-signal")}
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      {service.id === "motor-insurance" ? (
                        <div className="mt-2 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/15">
                          <div className="bg-black/55 border border-white/10 rounded-lg p-2.5 backdrop-blur-xs">
                            <span className="block text-[10px] font-mono font-bold text-signal tracking-wider uppercase mb-1">
                              🛡️ Comprehensive Cover
                            </span>
                            <span className="block text-[10px] text-gray-300 leading-normal font-light">
                              Full protection against accident damage, vehicle loss, theft, fire, and third-party liabilities.
                            </span>
                          </div>
                          <div className="bg-black/55 border border-white/10 rounded-lg p-2.5 backdrop-blur-xs">
                            <span className="block text-[10px] font-mono font-bold text-gray-300 tracking-wider uppercase mb-1">
                              ⚖️ Third-Party Cover
                            </span>
                            <span className="block text-[10px] text-gray-300 leading-normal font-light">
                              Essential legal coverage safeguarding against injury, death, and property damage to others.
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed font-light max-w-lg mb-4">
                          {service.description}
                        </p>
                      )}
                      
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-signal group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>ACTIVATE DIRECTORY SCAN &rarr;</span>
                        <span className="bg-signal text-white px-3 py-1 rounded-full text-3xs font-bold uppercase tracking-wider">
                          VETTED BAYS ONLINE
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            }

            // STANDARD LIGHT MINI-TILE
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => handleServiceClick(service.title)}
                className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-signal/50 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Header Code and Icon row */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-2xs text-gray-400 border border-gray-100 px-2.5 py-1 rounded-full font-semibold tracking-wider">
                      {meta.code}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Card footer indicator */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-medium text-gray-400 group-hover:text-signal transition-colors"
                >
                  <span>Explore Garages</span>
                  <span>&rarr;</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Diagnostics CTA Bar */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
          className="mt-14 bg-gray-50 text-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shrink-0 shadow-xs">
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
            className="w-full md:w-auto bg-white border border-teal-600 hover:bg-teal-50/50 text-teal-700 font-display font-bold uppercase tracking-wider px-6 py-3 rounded-lg text-sm transition-all shadow-xs cursor-pointer"
          >
            Run Troubleshooting Guide
          </button>
        </motion.div>

      </div>
    </section>
  );
}
