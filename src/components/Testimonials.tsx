/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "../types";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-paper py-20 text-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-asphalt px-3 py-1 rounded">
            Success Stories
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-asphalt">
            What Nairobi Drivers Say
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed">
            From emergency roadside dispatches to complex cylinder misfire fixes, hear from real drivers who saved time and money using mCarFix.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_TESTIMONIALS.map((t) => {
            return (
              <div
                key={t.id}
                className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all duration-300 relative"
              >
                {/* Quote Icon Overlay */}
                <div className="absolute right-6 top-6 text-gray-100/70">
                  <MessageSquareQuote className="h-14 w-14 shrink-0" />
                </div>

                <div className="relative z-10">
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4.5 w-4.5 fill-signal text-signal" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="border-t border-gray-100 pt-5 flex justify-between items-end">
                  <div>
                    <h4 className="font-display font-bold text-base uppercase tracking-wide text-asphalt">
                      {t.name}
                    </h4>
                    <span className="block text-2xs text-gray-400 font-sans mt-0.5">
                      Verified Client • {t.location}
                    </span>
                  </div>

                  {/* Vehicle Tag */}
                  <div className="bg-asphalt px-3 py-1.5 rounded-lg border border-steel/20 shrink-0">
                    <span className="font-mono text-2xs font-semibold text-signal uppercase tracking-wider">
                      {t.vehicle}
                    </span>
                  </div>
                </div>

              </div>
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
