/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Scale, CalendarCheck, History, ArrowRight, ShieldCheck, CheckCircle2, Wrench, Cpu, FileText, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const [activeFault, setActiveFault] = useState("P0300");

  return (
    <section id="how-it-works" className="relative bg-white py-24 text-slate-900 border-t border-b border-gray-200 overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-amber-800 font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 mb-4 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span>SYS.WORKFLOW_ENGINE</span>
          </span>
          <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-slate-900 mt-2">
            How mCarFix Works
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-slate-600 mt-5 leading-relaxed font-light text-base sm:text-lg">
            An advanced digital operating system bringing transparency, verified accountability, and instant roadside response to Nairobi's automotive ecosystem.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* STEP 01 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-5 relative z-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden"
          >
            <div>
              {/* Step Image Thumbnail with Badge Overlay */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-200 group-hover:border-amber-500/40 transition-all duration-500 bg-gray-950">
                <img
                  src="https://raw.githubusercontent.com/wayneian492-lab/Mcarfix-2.0/11b7dae/src/assets/images/service_diagnostics_new_1784617553637.jpg"
                  alt="Mechanic performing computerized engine fault scan in workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                
                {/* Badge over image */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="font-mono text-[9px] font-bold text-whitegold bg-gray-950/90 border border-whitegold/40 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                    SYS.DISCOVERY
                  </span>
                </div>

                {/* Step Number over image */}
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-xl font-black text-white bg-gray-950/90 border border-white/20 px-3 py-1 rounded-xl shadow-lg backdrop-blur-md group-hover:border-amber-400 group-hover:text-amber-400 transition-all">
                    01
                  </span>
                </div>
              </div>

              {/* Icon & Title Row */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all">
                  <Search className="h-4 w-4 text-amber-600 group-hover:text-white" />
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wide text-slate-900 group-hover:text-amber-600 transition-colors">
                  Search & Describe
                </h3>
              </div>
              <p className="font-sans text-slate-600 text-xs leading-relaxed font-light">
                Filter by neighborhood, service type, or run our smart OBD-II troubleshooter to describe your vehicle's engine fault.
              </p>
            </div>
          </motion.div>

          {/* STEP 02 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-5 relative z-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden"
          >
            <div>
              {/* Step Image Thumbnail with Badge Overlay */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-200 group-hover:border-amber-500/40 transition-all duration-500 bg-gray-950">
                <img
                  src="https://raw.githubusercontent.com/wayneian492-lab/Mcarfix-2.0/11b7dae/src/assets/images/garage_westlands_1784615895344.jpg"
                  alt="Organized auto repair garage workshop in Westlands Nairobi"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                
                {/* Badge over image */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="font-mono text-[9px] font-bold text-whitegold bg-gray-950/90 border border-whitegold/40 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                    SYS.EVALUATION
                  </span>
                </div>

                {/* Step Number over image */}
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-xl font-black text-white bg-gray-950/90 border border-white/20 px-3 py-1 rounded-xl shadow-lg backdrop-blur-md group-hover:border-amber-400 group-hover:text-amber-400 transition-all">
                    02
                  </span>
                </div>
              </div>

              {/* Icon & Title Row */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all">
                  <Scale className="h-4 w-4 text-amber-600 group-hover:text-white" />
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wide text-slate-900 group-hover:text-amber-600 transition-colors">
                  Compare Garages
                </h3>
              </div>
              <p className="font-sans text-slate-600 text-xs leading-relaxed font-light">
                Review authorized local mechanics. Check real-time ratings, specific diagnostic capabilities, and upfront labor price brackets side-by-side.
              </p>
            </div>
          </motion.div>

          {/* STEP 03 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-5 relative z-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden"
          >
            <div>
              {/* Step Image Thumbnail with Badge Overlay */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-200 group-hover:border-amber-500/40 transition-all duration-500 bg-gray-950">
                <img
                  src="https://raw.githubusercontent.com/wayneian492-lab/Mcarfix-2.0/11b7dae/src/assets/images/car_service_lift_1784614889346.jpg"
                  alt="Mechanic working on car suspension under hydraulic lift"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                
                {/* Badge over image */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="font-mono text-[9px] font-bold text-whitegold bg-gray-950/90 border border-whitegold/40 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                    SYS.ENGAGEMENT
                  </span>
                </div>

                {/* Step Number over image */}
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-xl font-black text-white bg-gray-950/90 border border-white/20 px-3 py-1 rounded-xl shadow-lg backdrop-blur-md group-hover:border-amber-400 group-hover:text-amber-400 transition-all">
                    03
                  </span>
                </div>
              </div>

              {/* Icon & Title Row */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all">
                  <CalendarCheck className="h-4 w-4 text-amber-600 group-hover:text-white" />
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wide text-slate-900 group-hover:text-amber-600 transition-colors">
                  Book & Secure
                </h3>
              </div>
              <p className="font-sans text-slate-600 text-xs leading-relaxed font-light">
                Instantly lock in an appointment with a verified vetted partner. Receive real-time SMS progress and fair-pricing guarantee.
              </p>
            </div>
          </motion.div>

          {/* STEP 04 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-500/50 rounded-2xl p-5 relative z-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden"
          >
            <div>
              {/* Step Image Thumbnail with Badge Overlay */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 border border-slate-200 group-hover:border-amber-500/40 transition-all duration-500 bg-gray-950">
                <img
                  src="https://raw.githubusercontent.com/wayneian492-lab/Mcarfix-2.0/11b7dae/src/assets/images/garage_experts_1784615923238.jpg"
                  alt="Auto repair workshop interior with mechanic team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                
                {/* Badge over image */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="font-mono text-[9px] font-bold text-whitegold bg-gray-950/90 border border-whitegold/40 px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md shadow-md">
                    SYS.LOGISTICS
                  </span>
                </div>

                {/* Step Number over image */}
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-xl font-black text-white bg-gray-950/90 border border-white/20 px-3 py-1 rounded-xl shadow-lg backdrop-blur-md group-hover:border-amber-400 group-hover:text-amber-400 transition-all">
                    04
                  </span>
                </div>
              </div>

              {/* Icon & Title Row */}
              <div className="flex items-center space-x-3 mb-2">
                <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all">
                  <History className="h-4 w-4 text-amber-600 group-hover:text-white" />
                </div>
                <h3 className="font-display font-bold text-base uppercase tracking-wide text-slate-900 group-hover:text-amber-600 transition-colors">
                  Get Digital History
                </h3>
              </div>
              <p className="font-sans text-slate-600 text-xs leading-relaxed font-light">
                Track your active bookings on the fly and compile a secure digital repository of receipts, diagnostics sheets, and service milestones.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Deep Dive Interactive Showcase Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Interactive OBD-II Fault Simulator */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-amber-700 font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-amber-600" />
                  <span>DIAGNOSTIC TELEMETRY SIMULATOR</span>
                </span>
                <span className="font-mono text-3xs text-teal-700 font-semibold">mCarFix OS v4.2</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-slate-900 tracking-wide">
                Interactive Fault Code Diagnostic
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-light">
                Select a diagnostic error code below to test how our platform matches your car's issue directly to specialist garages with certified equipment:
              </p>

              {/* Fault Selector Buttons */}
              <div className="grid grid-cols-3 gap-2.5 mt-6">
                {[
                  { code: "P0300", label: "Random Misfire", severity: "HIGH" },
                  { code: "P0420", label: "Catalytic Converter", severity: "MED" },
                  { code: "P0171", label: "System Too Lean", severity: "LOW" },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setActiveFault(item.code)}
                    className={`p-3 rounded-xl border font-mono text-left transition-all cursor-pointer ${
                      activeFault === item.code
                        ? "bg-amber-500/10 border-amber-500 text-slate-900 shadow-md shadow-amber-500/5 font-semibold"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    <span className="block font-bold text-xs text-amber-600">{item.code}</span>
                    <span className="block text-[10px] text-slate-500 truncate mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Fault Output Display */}
              <div className="mt-6 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2 text-white">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-gray-400">ANALYSIS FOR CODE:</span>
                  <span className="text-amber-400 font-bold">{activeFault}</span>
                </div>
                {activeFault === "P0300" && (
                  <div className="space-y-1 text-gray-300">
                    <p className="text-teal-400 font-semibold">✓ Recommendation: Spark Plug & Ignition Coil Test</p>
                    <p className="text-[11px] text-gray-400">Matched 18 Authorized Garages in Westlands & Kilimani with engine scope analyzers.</p>
                  </div>
                )}
                {activeFault === "P0420" && (
                  <div className="space-y-1 text-gray-300">
                    <p className="text-amber-400 font-semibold">✓ Recommendation: O2 Sensor & Exhaust Emissions Scan</p>
                    <p className="text-[11px] text-gray-400">Matched 12 Certified Garages with gas analyzer telemetry equipment.</p>
                  </div>
                )}
                {activeFault === "P0171" && (
                  <div className="space-y-1 text-gray-300">
                    <p className="text-blue-400 font-semibold">✓ Recommendation: MAF Sensor Cleaning & Fuel Pressure Audit</p>
                    <p className="text-[11px] text-gray-400">Matched 24 Service Centers offering same-day intake cleaning.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Vetted Partner Standards Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-teal-700 font-bold uppercase tracking-wider bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  <span>MCARFIX QUALITY GUARANTEE</span>
                </span>
                <span className="font-mono text-3xs text-slate-500 font-semibold">100% VETTED</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-slate-900 tracking-wide">
                4-Pillar Workshop Accreditation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-light">
                Every repair garage on our network undergoes strict background verification and mystery audits before receiving digital authorization.
              </p>

              {/* 4 Pillars Grid */}
              <div className="space-y-3 mt-6">
                {[
                  { title: "Genuine OEM Spare Parts Only", desc: "No counterfeit components. Serial numbers logged digitally." },
                  { title: "Upfront Labor Rate Caps", desc: "Fixed pricing structure preventing unexpected bill inflation." },
                  { title: "Certified Diagnostic Scanners", desc: "Equipped with OBD-II, Bosch, and Launch professional tools." },
                  { title: "Escrow Payment Protection", desc: "Funds released to the mechanic only upon customer sign-off." },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-start space-x-3 shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-xs uppercase text-slate-900 tracking-wider">{item.title}</h4>
                      <p className="font-sans text-[11px] text-slate-600 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Trust CTA at the bottom */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xl">
          <div className="flex items-center space-x-4 text-left">
            <span className="text-3xl">🛡️</span>
            <div>
              <h4 className="font-display font-bold text-base uppercase tracking-wider text-slate-900">
                Guaranteed Parts Integrity
              </h4>
              <p className="font-sans text-xs text-slate-600 font-light mt-1">
                Every booking made through mCarFix is covered by our partner labor pricing and authentic OEM spare parts guarantee.
              </p>
            </div>
          </div>
          <a
            href="#garages"
            className="bg-amber-500 hover:bg-amber-400 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-xl hover:shadow-amber-500/25 active:scale-95 whitespace-nowrap flex items-center space-x-2"
          >
            <span>Find a Garage Now</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

