/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, Scale, CalendarCheck, History, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    tag: "SYS.DISCOVERY",
    title: "Search & Describe",
    description: "Filter by neighborhood, service type, or run our smart OBD-II troubleshooter to describe your vehicle's engine or electrical fault.",
    icon: Search,
  },
  {
    number: "02",
    tag: "SYS.EVALUATION",
    title: "Compare Garages",
    description: "Review authorized local mechanics. Check real-time ratings, specific diagnostic capabilities, and upfront labor price brackets side-by-side.",
    icon: Scale,
  },
  {
    number: "03",
    tag: "SYS.ENGAGEMENT",
    title: "Book & Secure",
    description: "Instantly lock in an appointment with a verified vetted partner. Receive real-time SMS/digital progress and fair-pricing guarantee.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    tag: "SYS.LOGISTICS",
    title: "Get Digital History",
    description: "Track your active bookings on the fly and compile a secure digital repository of receipts, diagnostics sheets, and service milestones.",
    icon: History,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 text-gray-900 border-t border-gray-100 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#12151b 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span>SYS.WORKFLOW</span>
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase text-gray-900">
            How mCarFix Works
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed font-light">
            An advanced digital platform designed to bring perfect transparency, verified accountability, and lightning-fast speed to Nairobi's automotive repair ecosystem.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gray-100 -translate-y-12 z-0" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50/50 hover:bg-white border border-gray-200/60 hover:border-signal/35 rounded-2xl p-6 sm:p-7 relative z-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Step Header with Numbers and Badging */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-gray-200 group-hover:text-signal/20 transition-colors">
                      {step.number}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-gray-400 bg-gray-100 border border-gray-200/50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon Frame */}
                  <div className="h-12 w-12 rounded-2xl bg-signal/5 border border-signal/15 flex items-center justify-center mb-5 group-hover:bg-signal group-hover:border-signal transition-all duration-300">
                    <Icon className="h-5 w-5 text-signal group-hover:text-white transition-colors" />
                  </div>

                  {/* Title and Description */}
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-gray-900 mb-3 group-hover:text-signal transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator (only for first 3 in desktop) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-12 z-20 text-gray-300 group-hover:text-signal group-hover:translate-x-1 transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Trust CTA at the bottom */}
        <div className="mt-14 bg-slate-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 text-left">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-wide text-gray-900">
                Guaranteed Parts Integrity
              </h4>
              <p className="font-sans text-xs text-gray-500 font-light mt-0.5">
                Every booking made through mCarFix is covered by our partner labor pricing and authentic OEM spare parts guarantee.
              </p>
            </div>
          </div>
          <a
            href="#garages"
            className="bg-signal hover:bg-signal/95 text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg transition-all shadow-md shadow-signal/10 whitespace-nowrap"
          >
            Find a Garage Now
          </a>
        </div>

      </div>
    </section>
  );
}
