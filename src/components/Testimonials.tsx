/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { MOCK_TESTIMONIALS } from "../types";
import { motion, AnimatePresence } from "motion/react";

const AVATAR_GRADIENTS = [
  "from-orange-500 to-amber-600 shadow-orange-500/30",
  "from-emerald-500 to-teal-600 shadow-emerald-500/30",
  "from-blue-500 to-indigo-600 shadow-blue-500/30",
  "from-purple-500 to-pink-600 shadow-purple-500/30",
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % MOCK_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="relative bg-[#08090b] py-24 text-white border-t border-white/10 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[500px] h-[400px] bg-teal-500/10 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,9,11,0.8)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="font-mono text-xs text-whitegold font-bold uppercase tracking-widest bg-whitegold/10 border border-whitegold/30 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 mb-4 backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-whitegold animate-spin" style={{ animationDuration: '8s' }} />
            <span>DRIVERS.VERIFIED_FEEDBACK</span>
          </span>
          <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-white mt-2">
            What Nairobi Drivers Say
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-gray-300 mt-5 leading-relaxed font-light text-base sm:text-lg">
            From emergency roadside dispatches to complex cylinder misfire fixes, hear from real motorists who saved time and money using mCarFix.
          </p>
        </motion.div>

        {/* Featured Main Spotlight Testimonial with Animated Transition */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/15 rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Ambient Card Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 group-hover:bg-orange-500/20 transition-all duration-700" />

              {/* Glowing Quote Watermark */}
              <div className="absolute right-6 top-6 text-orange-500/15 group-hover:text-orange-500/25 transition-colors duration-500">
                <MessageSquareQuote className="h-24 w-24 stroke-1" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Top Rating & Verified Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                      {Array.from({ length: MOCK_TESTIMONIALS[activeIndex].rating }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                      <span className="font-mono text-xs font-bold text-amber-400 ml-1">5.0</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-whitegold bg-whitegold/10 border border-whitegold/30 px-3 py-1 rounded-full text-xs font-mono">
                      <ShieldCheck className="h-3.5 w-3.5 text-whitegold" />
                      <span>Verified Driver</span>
                    </div>
                  </div>

                  {/* Quote Statement */}
                  <blockquote className="font-serif text-xl sm:text-2xl text-gray-100 leading-relaxed font-normal mb-8 italic">
                    "{MOCK_TESTIMONIALS[activeIndex].quote}"
                  </blockquote>
                </div>

                {/* Author Info Bar (Without Photo Avatars, Using Sleek Initial Badges) */}
                <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    {/* Stylish Gradient Initials Avatar */}
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[activeIndex % AVATAR_GRADIENTS.length]} flex items-center justify-center font-mono font-bold text-white text-lg tracking-wider shadow-lg border border-white/20 shrink-0 transform group-hover:scale-105 transition-transform duration-300`}>
                      {MOCK_TESTIMONIALS[activeIndex].name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">
                        {MOCK_TESTIMONIALS[activeIndex].name}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans mt-0.5">
                        {MOCK_TESTIMONIALS[activeIndex].location}
                      </p>
                    </div>
                  </div>

                  {/* Vehicle Model Tag */}
                  <div className="bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-xl shrink-0">
                    <span className="font-mono text-xs font-bold text-orange-400 tracking-wider">
                      🚗 {MOCK_TESTIMONIALS[activeIndex].vehicle}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Buttons & Indicators */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex space-x-2">
              {MOCK_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-10 bg-orange-500 shadow-[0_0_12px_rgba(255,107,0,0.8)]" : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white/5 border border-white/15 hover:bg-white/15 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white/5 border border-white/15 hover:bg-white/15 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Grid Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TESTIMONIALS.map((t, index) => {
            const isCurrent = activeIndex === index;
            return (
              <motion.div
                key={t.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveIndex(index);
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                  isCurrent
                    ? "bg-gradient-to-b from-orange-500/20 via-white/10 to-transparent border-orange-500/60 shadow-[0_10px_30px_rgba(255,107,0,0.2)]"
                    : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]} flex items-center justify-center font-mono font-bold text-white text-xs`}>
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-mono text-xs text-amber-400 font-bold">{t.rating}.0</span>
                    </div>
                  </div>
                  <blockquote className="font-sans text-xs text-gray-300 line-clamp-3 italic mb-4">
                    "{t.quote}"
                  </blockquote>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-white tracking-wide">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-orange-400 font-mono block mt-0.5">
                    {t.vehicle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partner CTA */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <p className="font-sans text-xs text-gray-400 leading-normal">
            Are you a certified mechanic or own an independent garage in Nairobi? Connect with thousands of car owners.{" "}
            <a href="#partner" className="text-orange-400 hover:text-orange-300 hover:underline font-semibold font-mono">
              Join mCarFix Partner Network &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

