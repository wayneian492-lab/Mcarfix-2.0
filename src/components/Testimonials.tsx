/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "../types";
import { motion } from "motion/react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            <span>DRIVERS.VOICE</span>
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-gray-900">
            What Nairobi Drivers Say
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed font-light">
            From emergency roadside dispatches to complex cylinder misfire fixes, hear from real drivers who saved time and money using mCarFix.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid with Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_TESTIMONIALS.map((t, index) => {
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl hover:border-gray-300 transition-all duration-300 relative shadow-lg"
              >
                {/* Quote Icon Overlay */}
                <div className="absolute right-6 top-6 text-gray-150 opacity-10">
                  <MessageSquareQuote className="h-16 w-16 shrink-0" />
                </div>

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Author Info Section with Circular Avatar */}
                <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-11 w-11 rounded-full object-cover border border-gray-100 shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-display font-bold text-gray-400 shrink-0 uppercase text-xs">
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-bold text-base uppercase tracking-wide text-gray-900 leading-none">
                        {t.name}
                      </h4>
                      <span className="block text-[10px] text-gray-500 font-sans mt-1">
                        Verified Client • {t.location}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Tag */}
                  <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 shrink-0">
                    <span className="font-mono text-[10px] font-semibold text-signal uppercase tracking-wider">
                      {t.vehicle}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Partner CTA inside Testimonial block */}
        <div className="mt-14 text-center max-w-xl mx-auto">
          <p className="font-sans text-xs text-gray-500 leading-normal">
            Are you a certified mechanic or own an independent garage in Nairobi? Connect with thousands of car owners.{" "}
            <a href="#partner" className="text-signal hover:underline font-semibold font-mono">
              Join mCarFix Partner Network &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
